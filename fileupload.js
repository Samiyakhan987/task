const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Ensure 'uploads' folder exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const server = http.createServer((req, res) => {
  if (req.url === '/fileupload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error during file upload');
        return;
      }

      const uploadedFile = files.filetoupload[0];
      const oldPath = uploadedFile.filepath;
      const newPath = path.join(uploadDir, uploadedFile.originalFilename);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error moving file');
          return;
        }

        // Send email notification
        const transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: 'your_mailtrap_user', // replace with your Mailtrap credentials
            pass: 'your_mailtrap_pass'
          }
        });

        const mailOptions = {
          from: 'support@yourdomain.com',
          to: 'admin@example.com',
          subject: 'File Uploaded',
          text: 'A user uploaded a file to the support portal.'
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Email error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded and moved!');
      });
    });
  } else {
    // Display upload form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit" value="Upload">');
    res.write('</form>');
    res.end();
  }
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
