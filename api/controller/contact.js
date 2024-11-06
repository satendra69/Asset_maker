const sgMail = require('@sendgrid/mail');
const db = require('../connect');

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendUserConfirmationEmail = async (name, email) => {
    const msg = {
        to: email,
        from: {
            email: process.env.EMAIL_USER,
            name: 'Asset Makers Support'
        },
        subject: "Property Inquiry",
        html: `<h3>Hello ${name},</h3>
               <p>Thank you for your inquiry. We will respond shortly.</p>`,
    };
    await sgMail.send(msg);
};

const sendAdminNotificationEmail = async (inquiryDetails) => {
    const msg = {
        to: process.env.EMAIL_MASTER,
        from: {
            email: process.env.EMAIL_USER,
            name: 'Asset Makers Support'
        },
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
    await sgMail.send(msg);
};

const sendCityEnquiryNotificationEmail = async (inquiryDetails) => {
    const msg = {
        to: process.env.EMAIL_MASTER,
        from: {
            email: process.env.EMAIL_USER,
            name: 'Asset Makers Support'
        },
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
    await sgMail.send(msg);
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

const getInquiries = async (req, res) => {
    try {
        const [inquiries] = await db.query('SELECT id, name, email, phone, message, listing_type AS listingType, user_id AS userId, property_id AS propertyId, address, purpose, created_at AS createdAt FROM inquiries ORDER BY created_at DESC');
        return res.status(200).json(inquiries);
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return res.status(500).json({ error: "Error fetching inquiries" });
    }
};

const getInquiryById = async (req, res) => {
    const { id } = req.params;
    try {
        const [inquiry] = await db.query('SELECT id, name, email, phone, message, listing_type AS listingType, user_id AS userId, property_id AS propertyId, address, purpose, created_at AS createdAt FROM inquiries WHERE id = ?', [id]);
        if (inquiry.length === 0) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        return res.status(200).json(inquiry[0]);
    } catch (error) {
        console.error("Error fetching inquiry:", error);
        return res.status(500).json({ error: "Error fetching inquiry" });
    }
};

const deleteInquiry = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM inquiries WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        return res.status(200).json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        return res.status(500).json({ error: "Error deleting inquiry" });
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

module.exports = { submitEnquiryForm, getInquiries, getInquiryById, deleteInquiry, submitContactForm, submitCityEnquiryForm };
