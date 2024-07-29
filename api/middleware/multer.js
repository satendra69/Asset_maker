const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const poppler = require('pdf-poppler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // Directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Original file name
  },
});

const upload = multer({ storage: storage });

const addWatermark = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      const watermarkPath = path.resolve(__dirname, '../public/images/watermark.png');

      for (const file of req.files) {
        console.log(`Processing file: ${file.path} (Type: ${file.mimetype})`);

        const inputPath = file.path;
        const outputPath = path.join(path.dirname(inputPath), `watermarked-${path.basename(inputPath)}`);

        console.log("Starting watermark processing for:", file.originalname);

        try {
          if (file.mimetype.startsWith('image')) {
            const inputImage = sharp(inputPath);
            console.log("processing");
            const { width, height } = await inputImage.metadata();

            const watermarkBuffer = await sharp(watermarkPath)
              .resize({
                width: Math.floor(width / 4),
                height: Math.floor(height / 4),
                fit: 'inside',
              })
              .toBuffer();

            await inputImage
              .composite([{ input: watermarkBuffer, top: 10, left: 10 }])
              .toFile(outputPath);

            file.path = outputPath;
            file.filename = `watermarked-${file.originalname}`;

            console.log("Watermark processing completed successfully.");
            console.log(file.path);
            console.log(file.filename);

          } else if (file.mimetype === 'application/pdf') {
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
          // Continue to the next file, or handle the error as needed
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
