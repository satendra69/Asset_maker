var express = require("express");
const {
  addListings,
  getListItem,
  getTableData,
  getTableById,
  getListingbyType,
  updateListItem,
  deleteListItem,
  uploadListItem,
  getListItemId,
  getsinglePageImg,
} = require("../controller/listings");
const verifyToken = require("../middleware/jwt");

const { upload, addWatermark } = require("../middleware/multer.js");
var router = express.Router();

/* get listing */
router.get("/", getListItem);

/* get listing table data*/
router.get("/table", getTableData);
router.get("/table/:listingID", getTableById);

/* get lsiting */
router.get("/listing/:type", getListingbyType);

/* post lsiting */
router.post("/", addListings);

// get All img
router.get("/singlePageImg/:listingID", getsinglePageImg);

/* get lsitItem */
router.get("/:listingID", getListItemId);
router.get("/:listingID/:type", getListItemId);

/* update lsitItem */
router.patch("/:listingID", updateListItem);
/* delete lsitItem */
router.delete("/delete/:listingID", verifyToken, deleteListItem);

// Posting listing Images
// router.post(
//   "/upload/:listingID",
//   verifyToken,
//   upload.array("images", 12),
//   uploadListItem
// );

// router.post(
//   "/upload/:listingID",
//   upload.array("images", 12),
//   addWatermark, uploadListItem
// );

router.post('/upload/:listingID', upload.array('attachments'), addWatermark, uploadListItem, async (req, res) => {
  try {
    const { listingID } = req.params;
    const { type, auditUser } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ status: 'FAILURE', message: 'No files uploaded' });
    }

    const attachments = files.map(file => ({
      prty_mstRowID: listingID,
      file_name: file.originalname,
      attachment: `/uploads/images/${file.filename}`,
      type: type,
      audit_user: auditUser,
      audit_date: new Date(),
    }));

    await Listing.insertMany(attachments);

    res.status(200).json({ status: 'SUCCESS', message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ status: 'FAILURE', message: 'Error uploading files' });
  }
});

module.exports = router;

