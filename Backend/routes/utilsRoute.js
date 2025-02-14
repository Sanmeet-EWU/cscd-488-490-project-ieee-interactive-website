import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email from .env
        pass: process.env.PASSWORD, // Your password from .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // Sender's email
      to: req.body.email, // Recipient email from request body
      subject: req.body.subject, // Subject from request body
      text: req.body.text, // Email body text from request body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
