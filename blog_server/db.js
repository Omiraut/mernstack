require("dotenv").config();

const mongoose = require("mongoose");
const db_url = process.env.DB_URI;
mongoose.connect(db_url);

mongoose.connection.on("connected", () => {
  console.log("connected to DB");
});
mongoose.connection.on("error", (err) => {
  console.log("connection failed error :", err);
});
