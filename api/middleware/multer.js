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

  const watermarkDarkPath = path.resolve(__dirname, '../public/images/watermark_dark.png');
  const watermarkBrightPath = path.resolve(__dirname, '../public/images/watermark_bright.png');

  let watermarkDark, watermarkBright;

  try {
    watermarkDark = await Jimp.read(watermarkDarkPath);
    watermarkBright = await Jimp.read(watermarkBrightPath);
  } catch (error) {
    console.error('Error loading watermark:', error);
    return res.status(500).send('Internal Server Error');
  }

  const supportedImageFormats = ['image/png', 'image/jpeg', 'image/jpg'];
  const filesToProcess = req.files.filter(file => supportedImageFormats.includes(file.mimetype));

  await Promise.all(filesToProcess.map(async (file) => {
    const originalFilePath = path.join(__dirname, '../public/images', file.originalname);
    const watermarkedFilePath = path.join(__dirname, '../public/images', `watermarked-${file.originalname}`);

    if (fs.existsSync(watermarkedFilePath)) {
      console.log(`Watermarked file already exists, skipping: ${file.originalname}`);
      fs.unlinkSync(originalFilePath);
      file.path = watermarkedFilePath;
      file.filename = `watermarked-${file.originalname}`;
      return;
    }

    console.log(`Processing file: ${file.originalname} (Type: ${file.mimetype})`);

    try {
      const inputImage = await Jimp.read(file.path);

      // Resize watermark according to image dimensions
      const watermarkWidth = inputImage.bitmap.width / 3;
      const watermarkHeight = inputImage.bitmap.height / 8;
      const watermarkResizedDark = watermarkDark.clone().resize(watermarkWidth, watermarkHeight);
      const watermarkResizedBright = watermarkBright.clone().resize(watermarkWidth, watermarkHeight);

      const margin = Math.floor(inputImage.bitmap.width * 0.05);

      // Function to calculate average brightness of a specific area
      const getAverageBrightness = (x, y, width, height) => {
        let totalBrightness = 0;
        inputImage.scan(x, y, width, height, function (px, py, idx) {
          const red = this.bitmap.data[idx];
          const green = this.bitmap.data[idx + 1];
          const blue = this.bitmap.data[idx + 2];
          const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          totalBrightness += brightness;
        });
        return totalBrightness / (width * height);
      };

      // Check brightness at top-left corner (10x10 area)
      const topLeftBrightness = getAverageBrightness(0, 0, 10, 10);
      const topLeftWatermark = topLeftBrightness < 0.3 ? watermarkResizedBright : watermarkResizedDark;

      // Check brightness at bottom-right corner (10x10 area)
      const bottomRightBrightness = getAverageBrightness(inputImage.bitmap.width - 10, inputImage.bitmap.height - 10, 10, 10);
      const bottomRightWatermark = bottomRightBrightness < 0.3 ? watermarkResizedBright : watermarkResizedDark;

      // Apply watermarks based on brightness calculations
      const positions = [
        { x: margin, y: margin, watermark: topLeftWatermark },
        {
          x: inputImage.bitmap.width - watermarkResizedBright.bitmap.width - margin,
          y: inputImage.bitmap.height - watermarkResizedBright.bitmap.height - margin,
          watermark: bottomRightWatermark
        }
      ];

      positions.forEach(pos => {
        inputImage.composite(pos.watermark, pos.x, pos.y, {
          mode: Jimp.BLEND_SOURCE_OVER,
          opacitySource: 0.7,
        });
      });

      await inputImage.writeAsync(watermarkedFilePath);
      fs.unlinkSync(originalFilePath);
      file.path = watermarkedFilePath;
      file.filename = `watermarked-${file.originalname}`;

      console.log(`Watermark applied successfully to: ${file.originalname}`);
    } catch (error) {
      console.error(`Error processing image ${file.originalname}:`, error);
    }
  }));

  req.files = req.files.filter(file => file.filename.startsWith('watermarked-') || !supportedImageFormats.includes(file.mimetype));

  next();
};

module.exports = { upload, addWatermark };
