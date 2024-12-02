var express = require("express");
const {
  addListings,
  getListItem,
  checkPropertyExists,
  getListItemByPropertyUrl,
  updateListItem,
  deleteListItem,
  uploadListItem,
  getListItemId,
  getPropertyItemId,
  getAllImages,
  getsinglePageImg,
  deleteImagesByRowID,
  deleteBrochureFile,
} = require("../controller/listings");

const verifyToken = require("../middleware/jwt");
const { upload, addWatermark } = require("../middleware/multer.js");

var router = express.Router();

/* Listings Routes */
router.get("/", getListItem);
router.post("/", addListings);
router.get("/listItem/:listingID", getListItemId);
router.patch("/listItem/:listingID", updateListItem);
router.delete("/delete/:listingID", verifyToken, deleteListItem);

/* Property Routes */
router.get("/checkProperty", checkPropertyExists);
router.get('/property/:id', getPropertyItemId);
router.get("/singleProperty/:propertyUrl", getListItemByPropertyUrl);

/* Image Routes */
router.get("/images", getAllImages);
router.get("/singlePageImg/:propertyUrl", getsinglePageImg);
router.delete("/images/:RowID", deleteImagesByRowID);

/* File Routes */
router.delete("/files/:RowID", deleteBrochureFile);

/* upload images and files */
router.post('/upload/:listingID', upload.array('attachments'), addWatermark, (req, res) => {
  if (req.files && req.files.length > 0) {
    return uploadListItem(req, res);
  } else {
    return res.status(400).json({ status: 'FAILURE', message: 'No files uploaded or watermarking failed.' });
  }
});

module.exports = router;

