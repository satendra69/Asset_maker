const express = require("express");
const { submitEnquiryForm, getInquiries, getInquiryById, deleteInquiry, submitContactForm, submitCityEnquiryForm } = require('../controller/contact.js');

var router = express.Router();

router.post('/', submitContactForm);
router.post('/enquiry', submitEnquiryForm);
router.get('/message', getInquiries);
router.get('/message/:id', getInquiryById);
router.delete('/message/:id', deleteInquiry);
router.post('/cityEnquiry', submitCityEnquiryForm);

module.exports = router;
