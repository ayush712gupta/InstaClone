const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ✅ Handle all routes → always send index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
