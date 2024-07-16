var express = require("express");
const {
  getComments,
  addComment,

  deleteComment,
} = require("../controller/comments");
const verify = require("../middleware/jwt");
var router = express.Router();

/* get comments */
router.get("/", getComments);

// SingleComment

/* update lsitItem */
router.post("/:userId", verify, addComment);

// /* update lsitItem */
// router.patch("/:listId", verify, updateComment);
/* delete lsitItem */
router.delete("/:id", verify, deleteComment);

module.exports = router;
