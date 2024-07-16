var express = require("express");
const {
  addListings,
  getListItem,
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

/* get lsiting */
router.get("/", getListItem);

/* get lsiting */
router.get("/Propperty/:type", getListingbyType);

/* post lsiting */
router.post("/", addListings);

// get All img
router.get("/singlePageImg/:id", getsinglePageImg);

/* get lsitItem */
router.get("/:id", getListItemId);
router.get("/:id/:type", getListItemId);//

/* update lsitItem */
router.patch("/:id", updateListItem);
/* delete lsitItem */
router.delete("/:id", verifyToken, deleteListItem);

// Posting property Images
// router.post(
//   "/upload/:id",
//   verifyToken,
//   upload.array("images", 12),
//   uploadListItem
// );

router.post(
  "/upload/:id",
  upload.array("images", 12),
  addWatermark, uploadListItem
);

module.exports = router;
