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

/* get listing */
router.get("/listing/:type", getListingbyType);

/* post listing */
router.post("/", addListings);

// get All img
router.get("/singlePageImg/:listingID", getsinglePageImg);

/* get listItem */
router.get("/:listingID", getListItemId);
router.get("/:listingID/:type", getListItemId);

/* update listItem */
router.patch("/:listingID", updateListItem);

/* delete listItem */
router.delete("/delete/:listingID", verifyToken, deleteListItem);

/* upload images and files */
router.post('/upload/:listingID', upload.array('attachments'), addWatermark, uploadListItem);

module.exports = router;

