//utils/nodemailer.js
// utils/nodemailer.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId, token }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "alysa81@ethereal.email", // Your Ethereal email
        pass: "FcmUaHGsTkkuJyeJFf", // Your Ethereal password
      },
    });

    // Determine email content based on emailType
    let subject, text, html;

    if (emailType === "verify") {
      const verificationLink = `${process.env.DOMAIN}/verify/${token}`;
      subject = "Verify Your Email Address";
      text = `Hello, please verify your email by clicking on the following link: ${verificationLink}`;
      html = `<p>Hello,</p><p>Please verify your email by clicking on the link below:</p><a href="${verificationLink}">Verify Email</a>`;
    } else if (emailType === "forget") {
      const resetLink = `${process.env.DOMAIN}/reset-password?userId=${userId}&token=${token}`;
      subject = "Reset Your Password";
      text = `Hello, please reset your password by clicking on the following link: ${resetLink}`;
      html = `<p>Hello,</p><p>Please reset your password by clicking on the link below:</p><a href="${resetLink}">Reset Password</a>`;
    } else {
      throw new Error("Invalid email type. Use 'verify' or 'forget'.");
    }

    // Send email using the transporter object
    const info = await transporter.sendMail({
      from: "alysa81@ethereal.email", // sender address
      to: email, // receiver email
      subject, // subject line
      text, // plain text body
      html, // HTML body
    });

    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};
