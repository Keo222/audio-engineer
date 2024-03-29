const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config({ path: "/server/.env" });

const CLIENT_EMAIL = process.env.EMAIL_USERNAME;
const CLIENT_PASS = process.env.EMAIL_PASS;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: CLIENT_EMAIL,
        pass: CLIENT_PASS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });

    // Nodemailer options
    const mailOptions = {
      from: CLIENT_EMAIL,
      to: CLIENT_EMAIL,
      subject: `Audio Engineer Contact - ${subject}`,
      text: `From: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

router.post("/hire", async (req, res) => {
  const { name, work, numTracks, email, subject, message } = req.body;

  try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: CLIENT_EMAIL,
        pass: CLIENT_PASS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });

    // Nodemailer options
    const mailOptions = {
      from: CLIENT_EMAIL,
      to: CLIENT_EMAIL,
      subject: `Audio Engineer Hire - ${subject}`,
      text: `From: ${name}\n\nEmail: ${email}\n\n# Tracks: ${numTracks}\n\nWork Wanted: ${work}\n\nMessage:\n${message}`,
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;
