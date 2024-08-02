const express = require("express");
const router = express.Router();
const { loginP, logoutP, registerP, verifyP } = require("../controller/auth");

router.post("/loginP", loginP);
router.post("/logoutP", logoutP);
router.post("/registerP", registerP);
router.post("/verifyP", verifyP);

module.exports = router;
