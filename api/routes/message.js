const express = require("express");

const {
  getMessage,
  deleteMessaage,
  registerMessage,
} = require("../controller/message.js");
const verifyToken = require("../middleware/jwt.js");

const router = express.Router();

router.post("/add", registerMessage);
router.get("/", verifyToken, getMessage);
router.delete("/:id", verifyToken, deleteMessaage);

module.exports = router;
