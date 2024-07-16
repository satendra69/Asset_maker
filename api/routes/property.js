var express = require("express");
const {
  addProperty,
  getPropertyItem,
  getPropertybyType,
  updatePropertyItem,
  deletePropertyItem,
  uploadPropertyItem,
  getPropertyItemId,
  getsinglePageImg,
} = require("../controller/property.js");
const verifyToken = require("../middleware/jwt.js");

const { upload, addWatermark } = require("../middleware/multer.js");
var router = express.Router();

/* get lsiting */
router.get("/", getPropertyItem);

/* get lsiting */
router.get("/Property/:type", getPropertybyType);

/* post lsiting */
router.post("/", addProperty);

// get All img
router.get("/singlePageImg/:id", getsinglePageImg);

/* get lsitItem */
router.get("/:id", getPropertyItemId);
router.get("/:id/:type", getPropertyItemId);//

/* update lsitItem */
router.patch("/:id", updatePropertyItem);
/* delete lsitItem */
router.delete("/:id", verifyToken, deletePropertyItem);

// Posting property Images
// router.post(
//   "/upload/:id",
//   verifyToken,
//   upload.array("images", 12),
//   uploadPropertyItem
// );

// router.post(
//   "/upload/:id",
//   upload.array("images", 12),
//   addWatermark, uploadPropertyItem
// );

router.post('/upload/:propertyID', upload.array('attachments'), addWatermark, uploadPropertyItem, async (req, res) => {
  try {
    const { propertyID } = req.params;
    const { type, auditUser } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ status: 'FAILURE', message: 'No files uploaded' });
    }

    const attachments = files.map(file => ({
      prty_mstRowID: propertyID,
      file_name: file.originalname,
      attachment: `/uploads/images/${file.filename}`,
      type: type,
      audit_user: auditUser,
      audit_date: new Date(),
    }));

    await Property.insertMany(attachments);

    res.status(200).json({ status: 'SUCCESS', message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ status: 'FAILURE', message: 'Error uploading files' });
  }
});

module.exports = router;
