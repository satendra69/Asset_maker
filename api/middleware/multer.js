const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

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
    console.error('Error loading watermark images:', error);
    return res.status(500).json({ status: 'FAILURE', message: 'Error loading watermark images', error: error.message });
  }

  const supportedImageFormats = ['image/png', 'image/jpeg', 'image/jpg'];
  const supportedPdfFormats = ['application/pdf'];

  try {
    await Promise.all(req.files.map(async (file) => {
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

      if (supportedImageFormats.includes(file.mimetype)) {
        const inputImage = await Jimp.read(file.path);
        await applyImageWatermark(inputImage, file, watermarkDark, watermarkBright);
      } else if (supportedPdfFormats.includes(file.mimetype)) {
        await applyPdfWatermark(file, watermarkDarkPath);
      } else {
        console.log('Unsupported file type:', file.mimetype);
        throw new Error(`Unsupported file type: ${file.mimetype}`);
      }
    }));

    next();
  } catch (error) {
    console.error('Error processing watermark:', error);
    return res.status(500).json({ status: 'FAILURE', message: 'Error processing watermark', error: error.message });
  }
};

// Helper functions for watermarking
const applyImageWatermark = async (inputImage, file, watermarkDark, watermarkBright) => {
  const watermarkWidth = inputImage.bitmap.width / 3;
  const watermarkHeight = inputImage.bitmap.height / 8;
  const watermarkResizedDark = watermarkDark.clone().resize(watermarkWidth, watermarkHeight);
  const watermarkResizedBright = watermarkBright.clone().resize(watermarkWidth, watermarkHeight);

  const margin = Math.floor(inputImage.bitmap.width * 0.05);
  const topLeftBrightness = getAverageBrightness(inputImage, 0, 0, 10, 10);

  const applyWatermark = topLeftBrightness < 0.3 ? watermarkResizedBright : watermarkResizedDark;
  const positions = [
    { x: margin, y: margin, watermark: applyWatermark },
    { x: inputImage.bitmap.width - watermarkWidth - margin, y: inputImage.bitmap.height - watermarkHeight - margin, watermark: applyWatermark }
  ];

  positions.forEach(pos => {
    inputImage.composite(pos.watermark, pos.x, pos.y, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 0.7 });
  });

  await inputImage.writeAsync(file.path);
  console.log(`Watermark applied to image: ${file.originalname}`);
};

const applyPdfWatermark = async (file, watermarkDarkPath) => {
  const pdfBytes = fs.readFileSync(file.path);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Load watermark image
  const watermarkImageBytes = fs.readFileSync(watermarkDarkPath);
  const watermarkImage = await pdfDoc.embedPng(watermarkImageBytes);

  const pages = pdfDoc.getPages();
  const watermarkWidth = watermarkImage.width / 2;
  const watermarkHeight = watermarkImage.height / 2;

  pages.forEach(page => {
    const { width, height } = page.getSize();

    // Positions for the watermark: top-left and bottom-right
    const positions = [
      { x: 20, y: height - watermarkHeight - 40 },
      { x: width - watermarkWidth - 20, y: 20 }
    ];

    // Apply watermark at both positions
    positions.forEach(pos => {
      page.drawImage(watermarkImage, {
        x: pos.x,
        y: pos.y,
        width: watermarkWidth,
        height: watermarkHeight,
        opacity: 0.7,
      });
    });
  });

  // Save the watermarked PDF
  const watermarkedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(file.path, watermarkedPdfBytes);
  console.log(`Watermark applied to PDF: ${file.originalname}`);
};


const getAverageBrightness = (image, x, y, width, height) => {
  let totalBrightness = 0;
  image.scan(x, y, width, height, function (px, py, idx) {
    const red = this.bitmap.data[idx];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
    totalBrightness += brightness;
  });
  return totalBrightness / (width * height);
};


module.exports = { upload, addWatermark };
