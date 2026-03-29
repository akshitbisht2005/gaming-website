const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* Storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

/* Home route */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* Submit route */
app.post("/submit", upload.single("proof"), (req, res) => {
  const { name, email, option } = req.body;

  const data = {
    name,
    email,
    option,
    proof: req.file ? req.file.filename : "no file"
  };

  fs.appendFileSync("data.txt", JSON.stringify(data) + "\n");

  res.send("✅ Payment Submitted Successfully!");
});

/* 🔥 PORT CHANGED HERE */
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});