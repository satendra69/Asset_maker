var express = require("express");
const {
  addListings,
  getListItem,
  getListingbyType,
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

/* get listing */
router.get("/", getListItem);

/* get listing by type */
router.get("/listing/:type", getListingbyType);

/* post listing */
router.post("/", addListings);

// get all images
router.get("/images", getAllImages);

// get All img by listing id
router.get("/singlePageImg/:listingID", getsinglePageImg);

/* delete images by RowID */
router.delete("/images/:RowID", deleteImagesByRowID);

/* delete files by RowID */
router.delete("/files/:RowID", deleteBrochureFile);

/* get listItem */
router.get("/:listingID", getListItemId);
router.get('/property/:id', getPropertyItemId);
router.get("/:listingID/:type", getListItemId);

/* update listItem */
router.patch("/:listingID", updateListItem);

/* delete listItem */
router.delete("/delete/:listingID", verifyToken, deleteListItem);

/* upload images and files */
router.post('/upload/:listingID', upload.array('attachments'), addWatermark, (req, res) => {
  if (req.files && req.files.length > 0) {
    return uploadListItem(req, res);
  } else {
    return res.status(400).json({ status: 'FAILURE', message: 'No files uploaded or watermarking failed.' });
  }
});

module.exports = router;

