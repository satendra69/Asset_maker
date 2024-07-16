const express = require("express");
const { register, login, logout, verify } = require("../controller/auth");
const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/signout", logout);
router.post("/verify", verify);

module.exports = router;
