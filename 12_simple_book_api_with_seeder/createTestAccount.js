const nodemailer = require('nodemailer');

async function createTestAccount() {
    try {
        // Generate test SMTP service account
        const testAccount = await nodemailer.createTestAccount();
        
        console.log('Test Email Account Created:');
        console.log('Username:', testAccount.user);
        console.log('Password:', testAccount.pass);
        
        return testAccount;
    } catch (error) {
        console.error('Error creating test account:', error);
        process.exit(1);
    }
}

createTestAccount();
