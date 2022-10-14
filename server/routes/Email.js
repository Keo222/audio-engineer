const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const router = express.Router();
require("dotenv").config({ path: __dirname + "/../.env" });

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const CLIENT_EMAIL = process.env.EMAIL_USERNAME;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    // Generate the accessToken
    const accessToken = await OAuth2Client.getAccessToken();

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: CLIENT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Nodemailer options
    const mailOptions = {
      from: CLIENT_EMAIL,
      to: CLIENT_EMAIL,
      subject: subject,
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
  const { name, email, subject, message } = req.body;

  const CLIENT_EMAIL = process.env.EMAIL_USERNAME;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    // Generate the accessToken
    const accessToken = await OAuth2Client.getAccessToken();

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: CLIENT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Nodemailer options
    const mailOptions = {
      from: CLIENT_EMAIL,
      to: CLIENT_EMAIL,
      subject: subject,
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

module.exports = router;
