const pug = require('pug');
const path = require('path');
const nodemailer = require('nodemailer');
const createTransporter = require('../Config/email');

const sendEmailNotification = async (bookData) => {
    try {
        // Get the email transporter
        const transporter = await createTransporter();

        // Compile the Pug template
        const templatePath = path.join(__dirname, '../views/bookCreated.pug');
        const compiledTemplate = pug.compileFile(templatePath);

        // Generate HTML from template with book data
        const html = compiledTemplate({
            title: bookData.title,
            author: bookData.author,
            yearPublished: bookData.yearPublished
        });

        // Setup email data
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"Book API" <bookapi@example.com>',
            to: process.env.EMAIL_TO || 'admin@example.com',
            subject: 'New Book Added to Library',
            html: html
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);

        // Log preview URL for Ethereal emails
        if (info.messageId && !process.env.SMTP_HOST) {
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        }

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Middleware function to send email after book creation
const emailMiddleware = (req, res, next) => {
    // Store the original json method
    const originalJson = res.json;

    // Override the json method
    res.json = function(data) {
        // If it's a successful book creation (status 201)
        if (res.statusCode === 201 && data) {        // Send email notification asynchronously
            sendEmailNotification(data)
                .then(info => {
                    console.log('Email notification sent successfully:', info.messageId);
                })
                .catch(err => {
                    console.error('Failed to send email notification:', err.message);
                    if (err.response) {
                        console.error('SMTP Response:', err.response);
                    }
                });
        }
        
        // Call the original json method
        return originalJson.call(this, data);
    };

    next();
};

module.exports = emailMiddleware;