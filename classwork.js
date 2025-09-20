const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6df4d0ea1d838d",
    pass: "your_real_password"
  }
});

app.post('/upload', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.send('No file uploaded.');
  }

  const mailOptions = {
    from: 'noreply@yourdomain.com',
    to: 'friend@example.com',
    subject: 'New Document Uploaded',
    html: `<p>A new file named <strong>${req.file.originalname}</strong> was uploaded successfully.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.send('File uploaded but email failed.');
    } else {
      console.log('Email sent:', info.response);
      res.send('File uploaded and email sent successfully!');
    }
  });
});

Server.listen(8080);