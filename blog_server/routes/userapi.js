const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { json } = require("body-parser");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

router.post("/uploadimage", upload.single("image"), async (req, res) => {
  res.json("File uploaded successfuly");
});
// for posting data
// http://localhost:5001/api/user/adduser
router.post("/adduser", async (req, res) => {
  try {
    const newUser = new User({
      //setting data in respective columns
      user_name: bcrypt.hashSync(req.body.user_name, 11),
      //bcrypt is used for encryption for data forwarded to database
      user_email: bcrypt.hashSync(req.body.user_email, 11),
      // cannot use bcrypt because data format given is specific as date for dob and enum for gender
      user_dob: req.body.user_dob,
      user_gender: req.body.user_gender,
    });
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    res.status(500).json({ "error ": error });
  }
});
// http://localhost:5001/api/user/viewuser
router.get("/viewuser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ "error: ": error });
  }
});
// http://localhost:5001/api/user/getbyid/
router.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id); // await is important while doing and sending any operation as it takes time to complete operation
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//localhost:5001/api/user/updateuserbyid/:id
router.put("/updateuserbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body }, // this $set used for updating specific data received from request
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//localhost:5001/api/user/deleteuser/:id
router.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "user is deleted successfuly", value: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
