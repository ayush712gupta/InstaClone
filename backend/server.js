const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ✅ Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail", // or your email provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// ✅ POST route to handle form submissions
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // receive email in your own inbox
    subject: "New InstaClone Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.send("Form submitted successfully!");
  });
});

// ✅ Handle all other routes → always send index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
