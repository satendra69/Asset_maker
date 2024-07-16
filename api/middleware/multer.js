const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    //console.log("file on multer", file);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const addWatermark = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {

      const watermarkPath = path.resolve(__dirname, "../public/images/watermark.png");
      console.log("watermarkPath____satya",watermarkPath);
     for (const file of req.files) {
      const inputPath = file.path;
      const outputPath = path.join(
        path.dirname(inputPath),
        `watermarked-${path.basename(inputPath)}`
      );

      const inputImage = sharp(inputPath);
      const { width, height } = await inputImage.metadata();

      // Resize the watermark to a reasonable size while keeping aspect ratio
      const watermarkBuffer = await sharp(watermarkPath)
        .resize({
          width: Math.floor(width / 4),
          height: Math.floor(height / 4),
          fit: 'inside'
        })
        
        .png() // Ensure the format is PNG to keep transparency
        .toBuffer();

      // Composite the watermark onto the original image
      await inputImage
        .composite([{ input: watermarkBuffer, top: 10, left: 10 }]) // Adjust top and left for padding
        .toFile(outputPath);

      // Update file path to point to the watermarked image
      file.path = outputPath;
      file.filename = `watermarked-${file.originalname}`;
    }
  }
  next();
  } catch (error) {
    console.error("Error adding watermark:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { upload, addWatermark };
