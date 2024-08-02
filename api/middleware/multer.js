const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const poppler = require('pdf-poppler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const addWatermark = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      const watermarkPath = path.resolve(__dirname, '../public/images/watermark.png');

      for (const file of req.files) {
        const originalFilePath = path.join(__dirname, '../public/images', file.originalname);
        const watermarkedFilePath = path.join(__dirname, '../public/images', `watermarked-${file.originalname}`);

        if (fs.existsSync(originalFilePath) && fs.existsSync(watermarkedFilePath)) {
          console.log(`Files already exist: ${file.originalname}`);
          continue;
        }

        console.log(`Processing file: ${file.path} (Type: ${file.mimetype})`);

        const inputPath = file.path;
        const outputPath = path.join(path.dirname(inputPath), `watermarked-${path.basename(inputPath)}`);

        try {
          if (file.mimetype.startsWith('image')) {
            console.log("Starting watermark processing for:", file.originalname);
            const inputImage = await Jimp.read(inputPath);
            const watermark = await Jimp.read(watermarkPath);

            const width = inputImage.bitmap.width;
            const height = inputImage.bitmap.height;

            watermark.resize(width / 4, Jimp.AUTO);

            inputImage.composite(watermark, 10, 10, {
              mode: Jimp.BLEND_SOURCE_OVER,
              opacitySource: 0.5
            });

            await inputImage.writeAsync(outputPath);

            file.path = outputPath;
            file.filename = `watermarked-${file.originalname}`;

            console.log("Watermark processing completed successfully.");
            console.log(file.path);
            console.log(file.filename);
          } else if (file.mimetype === 'application/pdf') {
            console.log("No watermark processing for:", file.originalname);
            const baseFileName = path.basename(file.originalname, path.extname(file.originalname));
            const pdfOutputPath = path.join(path.dirname(inputPath), `processed-${file.originalname}`);
            const thumbnailPath = path.join(path.dirname(pdfOutputPath), `${baseFileName}-thumbnail.png`);

            fs.renameSync(inputPath, pdfOutputPath);

            const opts = {
              format: 'png',
              out_dir: path.dirname(pdfOutputPath),
              out_prefix: baseFileName,
              page: 1,
            };
            await poppler.convert(pdfOutputPath, opts);

            const generatedThumbnailPath1 = path.join(path.dirname(pdfOutputPath), `${baseFileName}-1.png`);
            const generatedThumbnailPath2 = path.join(path.dirname(pdfOutputPath), `${baseFileName}-01.png`);

            let actualThumbnailPath;
            if (fs.existsSync(generatedThumbnailPath1)) {
              actualThumbnailPath = generatedThumbnailPath1;
            } else if (fs.existsSync(generatedThumbnailPath2)) {
              actualThumbnailPath = generatedThumbnailPath2;
            }

            if (actualThumbnailPath) {
              fs.renameSync(actualThumbnailPath, thumbnailPath);
              file.thumbnail = `/images/${path.basename(thumbnailPath)}`;
            } else {
              console.error(`Thumbnail file not found: ${generatedThumbnailPath1} or ${generatedThumbnailPath2}`);
            }

            file.path = pdfOutputPath;
            file.filename = `processed-${file.originalname}`;
          } else {
            console.log(`Skipping unsupported file type: ${file.originalname}`);
          }
        } catch (fileProcessingError) {
          console.error(`Error processing file ${file.originalname}:`, fileProcessingError);
        }
      }
    }
    next();
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { upload, addWatermark };
