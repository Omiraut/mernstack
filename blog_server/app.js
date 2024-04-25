require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const userRoute = require("./routes/userapi");
app.use("/api/user", userRoute);
// add user command connected to path is ->userapi(setting parameter)->user(verifying parameter)->db(for connection)

app.get("/", (req, res) => {
  res.send("Hello worl from Server Omi is Here working on server");
});
app.listen(port, () => {
  console.log(`server is running on : http://localhost:${port}`);
});
