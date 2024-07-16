// updates

import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, username, avatar FROM comment AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC
    `;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Add Comments
export const addComment = (req, res) => {
  // authorization
  if (req.userId !== req.params.userId) {
    return next(createError(401, "first login"));
  }

  const q =
    "INSERT INTO comments(`comment`, `createdAt`, `userId`, `listId`,`rating`) VALUES (?)";
  const values = [
    req.body.comment,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    req.userId,
    req.body.listId,
    req.body.rating,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Comment has been created.");
  });
};

// Delete Comments
export const deleteComment = (req, res) => {
  // authorization
  if (req.userId !== req.body.userId) {
    return next(createError(401, "first login"));
  }
  const commentId = req.params.id;
  const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

  db.query(q, [commentId, req.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("Comment has been deleted!");
    return res.status(403).json("You can delete only your comment!");
  });
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
};
