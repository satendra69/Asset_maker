const nodemailer = require('nodemailer');
const db = require('../connect');

const setupMailTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const sendUserConfirmationEmail = async (name, email) => {
    const mailTransporter = setupMailTransporter();

    const mailDetails = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Property Inquiry",
        html: `<h3>Hello ${name},</h3>
               <p>Thank you for your inquiry. We will respond shortly.</p>`,
    };

    await mailTransporter.sendMail(mailDetails);
};

const sendAdminNotificationEmail = async (inquiryDetails) => {
    const mailTransporter = setupMailTransporter();

    const adminMailDetails = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Property Inquiry",
        html: `<h3>New Inquiry Details:</h3>
               <p><strong>Name:</strong> ${inquiryDetails.name}</p>
               <p><strong>Email:</strong> ${inquiryDetails.email}</p>
               <p><strong>Phone:</strong> ${inquiryDetails.phone}</p>
               <p><strong>Message:</strong> ${inquiryDetails.message}</p>
               <p><strong>Address:</strong> ${inquiryDetails.address}</p>
               <p><strong>Purpose:</strong> ${inquiryDetails.purpose}</p>
               <p><strong>Listing Type:</strong> ${inquiryDetails.listingType}</p>
               ${inquiryDetails.propertyDetails ? `<p><strong>Property Details:</strong> ${inquiryDetails.propertyDetails}</p>` : ''}
              `,
    };

    await mailTransporter.sendMail(adminMailDetails);
};

const sendCityEnquiryNotificationEmail = async (inquiryDetails) => {
    const mailTransporter = setupMailTransporter();

    const adminMailDetails = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Property Inquiry",
        html: `<h3>New Inquiry Details:</h3>
               <p><strong>Inquiry Type:</strong> ${inquiryDetails.inquiryType}</p>
               <p><strong>Name:</strong> ${inquiryDetails.name}</p>
               <p><strong>Email:</strong> ${inquiryDetails.email}</p>
               <p><strong>Phone:</strong> ${inquiryDetails.phone}</p>
               <p><strong>Message:</strong> ${inquiryDetails.message}</p>
               <p><strong>Max Price:</strong> ${inquiryDetails.maxPrice}</p>
               <p><strong>Minimum Size:</strong> ${inquiryDetails.minSize}</p>
               <p><strong>Listing Type:</strong> ${inquiryDetails.listingType}</p>`,
    };

    await mailTransporter.sendMail(adminMailDetails);
};

const sendInquiryNotifyEmail = async (inquiryDetails) => {
    const mailTransporter = setupMailTransporter();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Property Inquiry",
        html: `
          <h3>You have received a new property inquiry:</h3>
          <p><strong>Name:</strong> ${inquiryDetails.name}</p>
          <p><strong>Number:</strong> ${inquiryDetails.number}</p>
          <p><strong>Email:</strong> ${inquiryDetails.email}</p>
          <p><strong>User Details:</strong> ${inquiryDetails.userId}</p>
          <p><strong>Purpose:</strong> ${inquiryDetails.purpose}</p>
          <p><strong>Address:</strong> ${inquiryDetails.address}</p>
          <p><strong>Message:</strong> ${inquiryDetails.message}</p>
          <p><strong>Property Details:</strong> ${inquiryDetails.propertyDetails}</p>
          <p>Please get back to them shortly. Thank you.</p>
        `,
    };

    await mailTransporter.sendMail(mailOptions);
};

const submitEnquiryForm = async (req, res) => {
    const { name, email, phone, message, listingType, userId, propertyId, propertyDetails, address, purpose } = req.body;

    try {
        await db.query('INSERT INTO inquiries (name, email, phone, message, listing_type, user_id, property_id, address, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, message, listingType, userId, propertyId, address, purpose]);

        await sendUserConfirmationEmail(name, email);
        await sendAdminNotificationEmail({ name, email, phone, message, listingType, userId, propertyDetails, address, purpose });

        return res.status(200).json({ message: "Inquiry submitted successfully" });
    } catch (error) {
        console.error("Error processing inquiry:", error);
        return res.status(500).json({ error: "Error submitting inquiry" });
    }
};

const submitContactForm = async (req, res) => {
    const { firstName, lastName, email, phone, message, listingType } = req.body;

    try {
        await sendUserConfirmationEmail(firstName, email);
        await sendAdminNotificationEmail({ firstName, lastName, email, phone, message, listingType });

        return res.status(200).json({ message: "Contact inquiry submitted successfully" });
    } catch (error) {
        console.error("Error processing contact inquiry:", error);
        return res.status(500).json({ error: "Error submitting contact inquiry" });
    }
};

const submitCityEnquiryForm = async (req, res) => {
    const { inquiryType, namePrefix, name, email, phone, message, maxPrice, minSize, listingType } = req.body;

    try {
        await sendUserConfirmationEmail(name, email);
        await sendCityEnquiryNotificationEmail({ inquiryType, name, email, phone, message, maxPrice, minSize, listingType });

        return res.status(200).json({ message: "Inquiry submitted successfully" });
    } catch (error) {
        console.error("Error processing inquiry:", error);
        return res.status(500).json({ error: "Error submitting inquiry" });
    }
};

module.exports = { submitEnquiryForm, submitContactForm, submitCityEnquiryForm };
