const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage: storage });

const addWatermark = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const watermarkPath = path.resolve(__dirname, '../public/images/watermark.png');
  let watermark;

  try {
    // Load watermark once to avoid repeated loading
    watermark = await Jimp.read(watermarkPath);
  } catch (error) {
    console.error('Error loading watermark:', error);
    return res.status(500).send('Internal Server Error');
  }

  await Promise.all(req.files.map(async (file) => {
    const originalFilePath = path.join(__dirname, '../public/images', file.originalname);
    const watermarkedFilePath = path.join(__dirname, '../public/images', `watermarked-${file.originalname}`);

    if (fs.existsSync(watermarkedFilePath)) {
      console.log(`Watermarked file already exists: ${file.originalname}`);
      return;
    }

    console.log(`Processing file: ${file.originalname} (Type: ${file.mimetype})`);

    if (file.mimetype.startsWith('image')) {
      try {
        const inputImage = await Jimp.read(file.path);

        // Resize watermark proportionally only if necessary
        const watermarkResized = watermark.clone().resize(inputImage.bitmap.width / 3, Jimp.AUTO);

        // Apply watermark
        inputImage.composite(watermarkResized, 10, 10, {
          mode: Jimp.BLEND_MULTIPLY,
          opacitySource: 0.8,
        });

        await inputImage.writeAsync(watermarkedFilePath);

        file.path = watermarkedFilePath;
        file.filename = `watermarked-${file.originalname}`;

        console.log(`Watermark applied successfully to: ${file.originalname}`);
      } catch (error) {
        console.error(`Error processing image ${file.originalname}:`, error);
      }
    } else if (file.mimetype === 'application/pdf') {
      console.log(`Skipping PDF file: ${file.originalname}`);
    } else {
      console.log(`Skipping unsupported file type: ${file.originalname}`);
    }
  }));

  next();
};

module.exports = { upload, addWatermark };
