// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Create an instance of the express app
const app = express();

// Middleware
app.use(cors());  // Enable CORS if needed
app.use(bodyParser.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json());  // For parsing application/json

// Create Nodemailer transporter using Gmail and the App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sohit6362@gmail.com',  // Your Gmail address
        pass: 'afet budz dvgk ziyj'  // Your App Password
    }
});

// POST route for registration
app.post('/register', (req, res) => {
    // Destructure the data received from the form
    const { 'College Branch': collegeBranch, 'College I\'d': collegeId, name, email, phone, event } = req.body;

    // Log the received data on the server (for debugging purposes)
    console.log('Received Registration Data:', { collegeBranch, collegeId, name, email, phone, event });

    // Create the email content
    const mailOptions = {
        from: 'sohit6362@gmail.com',  // Sender address
        to: email,  // Recipient's email
        subject: 'Registration Successful - Saraswati Puja 2025',  // Email subject
        text: `Hello ${name},\n\nThank you for registering for the Saraswati Puja 2025 at CIMAGE College.\n\nHere are your registration details:\n\nCollege Branch: ${collegeBranch}\nCollege ID: ${collegeId}\nEvent: ${event}\nPhone: ${phone}\n\nThe event will be held on 2nd February 2025. Please ensure that you arrive before 8:00 AM.\n\nContact us at: 6362107408 for any inquiries.\n\nWe look forward to seeing you at the event!\n\nBest regards,\nCIMAGE College`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Registration successfully submitted to CIMAGE Senior Student' });
        }
    });
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
