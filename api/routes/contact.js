const express = require("express");
const { submitEnquiryForm, submitContactForm, submitCityEnquiryForm } = require('../controller/contact.js');

var router = express.Router();

router.post('/', submitContactForm);
router.post('/enquiry', submitEnquiryForm);
router.post('/cityEnquiry', submitCityEnquiryForm);

module.exports = router;
