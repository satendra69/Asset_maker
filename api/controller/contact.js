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

const sendUserConfirmationEmail = async (firstName, email) => {
    const mailTransporter = setupMailTransporter();

    const mailDetails = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Property Inquiry",
        html: `<h3>Hello ${firstName},</h3>
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
               <p><strong>First Name:</strong> ${inquiryDetails.firstName}</p>
               <p><strong>Last Name:</strong> ${inquiryDetails.lastName}</p>
               <p><strong>Email:</strong> ${inquiryDetails.email}</p>
               <p><strong>Phone:</strong> ${inquiryDetails.phone}</p>
               <p><strong>Message:</strong> ${inquiryDetails.message}</p>
               <p><strong>Listing Type:</strong> ${inquiryDetails.listingType}</p>
               ${inquiryDetails.propertyId ? `<p><strong>Property ID:</strong> ${inquiryDetails.propertyId}</p>` : ''}
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

const submitEnquiryForm = async (req, res) => {
    const { firstName, lastName, email, phone, message, listingType, propertyId } = req.body;

    try {
        await db.query('INSERT INTO inquiries (first_name, last_name, email, phone, message, listing_type, property_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, phone, message, listingType, propertyId]);

        await sendUserConfirmationEmail(firstName, email);
        await sendAdminNotificationEmail({ firstName, lastName, email, phone, message, listingType, propertyId });

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
    const { inquiryType, namePrefix, name, email, phone, message, maxPrice, minSize, listingType, propertyId } = req.body;

    try {
        await sendUserConfirmationEmail(name, email);
        await sendCityEnquiryNotificationEmail({ inquiryType, name, email, phone, message, maxPrice, minSize, listingType, propertyId });

        return res.status(200).json({ message: "Inquiry submitted successfully" });
    } catch (error) {
        console.error("Error processing inquiry:", error);
        return res.status(500).json({ error: "Error submitting inquiry" });
    }
};

module.exports = { submitEnquiryForm, submitContactForm, submitCityEnquiryForm };
