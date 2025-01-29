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

// Update sold-out status
router.post("/list_sold_out_update", async (req, res) => {
  const { id, soldStatus } = req.body;

  if (!id || soldStatus === undefined) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    // Update the sold-out status in the database
    const query = "UPDATE listings SET sold_status = ? WHERE id = ?";
    const values = [soldStatus, id];
    const [result] = await db.promise().execute(query, values);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Sold-out status updated successfully" });
    } else {
      res.status(404).json({ error: "Listing not found" });
    }
  } catch (error) {
    console.error("Error updating sold-out status:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;

