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
    // Load both watermarks
    watermarkDark = await Jimp.read(watermarkDarkPath);
    watermarkBright = await Jimp.read(watermarkBrightPath);
  } catch (error) {
    console.error('Error loading watermark:', error);
    return res.status(500).send('Internal Server Error');
  }

  const supportedImageFormats = ['image/png', 'image/jpeg', 'image/jpg'];

  // Filter out files that are not images or are not supported formats
  const filesToProcess = req.files.filter(file => supportedImageFormats.includes(file.mimetype));

  await Promise.all(filesToProcess.map(async (file) => {
    const originalFilePath = path.join(__dirname, '../public/images', file.originalname);
    const watermarkedFilePath = path.join(__dirname, '../public/images', `watermarked-${file.originalname}`);

    // Check if the watermarked file already exists
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

      // Calculate the brightness of the image by averaging pixel values
      let totalBrightness = 0;
      inputImage.scan(0, 0, inputImage.bitmap.width, inputImage.bitmap.height, function (x, y, idx) {
        const red = this.bitmap.data[idx];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];

        const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
        totalBrightness += brightness;
      });

      const averageBrightness = totalBrightness / (inputImage.bitmap.width * inputImage.bitmap.height);
      console.log(`Average brightness: ${averageBrightness}`);

      const selectedWatermark = averageBrightness > 0.3 ? watermarkDark : watermarkBright;
      const watermarkResized = selectedWatermark.clone().resize(inputImage.bitmap.width / 6, Jimp.AUTO);

      // Define the positions for watermark placement
      const positions = [
        { x: 0, y: 0 },
        { x: (inputImage.bitmap.width - watermarkResized.bitmap.width) / 2, y: (inputImage.bitmap.height - watermarkResized.bitmap.height) / 2 },
        { x: inputImage.bitmap.width - watermarkResized.bitmap.width, y: inputImage.bitmap.height - watermarkResized.bitmap.height },
      ];

      // Apply the watermark at each position
      positions.forEach(pos => {
        inputImage.composite(watermarkResized, pos.x, pos.y, {
          mode: Jimp.BLEND_SOURCE_OVER,
          opacitySource: 0.7,
        });
      });

      await inputImage.writeAsync(watermarkedFilePath);

      // Remove the original file after watermarking
      fs.unlinkSync(originalFilePath);

      // Update file properties
      file.path = watermarkedFilePath;
      file.filename = `watermarked-${file.originalname}`;

      console.log(`Watermark applied successfully to: ${file.originalname}`);
    } catch (error) {
      console.error(`Error processing image ${file.originalname}:`, error);
    }
  }));

  // Filter the req.files array to include only files that have been successfully watermarked
  req.files = req.files.filter(file => file.filename.startsWith('watermarked-') || !supportedImageFormats.includes(file.mimetype));

  next();
};

module.exports = { upload, addWatermark };
