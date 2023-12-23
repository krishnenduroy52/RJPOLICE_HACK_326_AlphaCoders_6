const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const DB = process.env.VITE_APP_MONGO_SERVER;
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("Error in connecting to server", error);
  });

const UserDetails = require("./Models/UserDetailsModel");
const { sendNotification } = require("./notificationModule")


app.get("/", async (req, res) => {
  res.send("Hello, world!");
});

app.get("/sendnotification", async (req, res) => {
  try {
    await sendNotification();
    res.send('Success')
  } catch (error) {
    console.log("Error");
    res.send("Error")
  }
})

app.post("/userDetails", async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.user.password, 10);
    data.user.password = hashedPassword;
    const userDetails = new UserDetails(data);
    await userDetails.save();
    res.send("Success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// User Login
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDetails.findOne({ "user.email": email });
  if (!user || !bcrypt.compareSync(password, user.user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json(user);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
