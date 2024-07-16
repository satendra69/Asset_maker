var express = require("express");
var router = express.Router();
var {
  deleteCity,
  addCity,
  getCity,
  updateCity,
} = require("../controller/city.js");
const verifyToken = require("../middleware/jwt.js");

/* get city */
router.get("/", getCity);

/* post city */
router.post("/add", verifyToken, addCity);
/* delete city */
router.delete("/:id", deleteCity);
/* update city */
router.patch("/:id", updateCity);

module.exports = router;
