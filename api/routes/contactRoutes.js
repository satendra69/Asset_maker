const express = require("express");
const { submitEnquiryForm, submitContactForm, submitCityEnquiryForm } = require('../controller/contactController.js');

var router = express.Router();

router.post('/', submitContactForm);
router.post('/enquiry', submitEnquiryForm);
router.post('/cityEnquiry', submitCityEnquiryForm);

module.exports = router;
