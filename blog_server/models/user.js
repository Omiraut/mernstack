const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_dob: {
    type: Date,
    required: true,
  },
  user_gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
    required: true,
  },
});

module.exports = mongoose.model("mbs_user", userSchema); // table name and schema name
