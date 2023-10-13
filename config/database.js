require("dotenv").config();
const mongoose = require("mongoose");
const db_url = process.env.dB_URL;

console.log("db_url--",db_url);
// Connect to MongoDB
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for successful connection and connection error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully!");
});
