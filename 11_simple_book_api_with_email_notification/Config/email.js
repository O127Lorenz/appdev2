const nodemailer = require('nodemailer');

const createTransporter = async () => {
    try {
        // Create reusable transporter object using Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use TLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false // Accept self-signed certs
            }
        });

        // Verify connection configuration
        await transporter.verify();
        console.log('Email transporter is ready');

        return transporter;
    } catch (error) {
        console.error('Error creating email transporter:', error);
        throw error;
    }
};

module.exports = createTransporter;