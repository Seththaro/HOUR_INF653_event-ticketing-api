const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,               // e.g. smtp.sendgrid.net
  port: parseInt(process.env.EMAIL_PORT, 10), // e.g. 587
  secure: false,                              // use TLS
  auth: {
    user: process.env.EMAIL_USER,             // verified sender identity
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email via the configured transporter.
 *
 * @param {Object} options
 * @param {string} options.to      Recipient email address
 * @param {string} options.subject Subject line
 * @param {string} options.html    HTML body
 */
async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    // Display name “Tharo” with the sending address
    from: `"Tharo" <hourseththaro@gmail.com>`,
    // Where replies should go
    replyTo: 'Replys_hour2@mail.fhsu.edu',
    to,
    subject,
    html
  });
}

module.exports = sendEmail;