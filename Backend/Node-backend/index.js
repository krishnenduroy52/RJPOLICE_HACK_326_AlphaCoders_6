const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle offers from other users
  socket.on("offer", (data) => {
    console.log("Received offer:", data);
    // Broadcast the offer to other users
    socket.broadcast.emit("offer", data);
  });

  // Handle answers from other users
  socket.on("answer", (data) => {
    console.log("Received answer:", data);
    // Broadcast the answer to other users
    socket.broadcast.emit("answer", data);
  });

  // Handle ICE candidates from other users
  socket.on("ice-candidate", (data) => {
    console.log("Received ICE candidate:", data);
    // Broadcast the ICE candidate to other users
    socket.broadcast.emit("ice-candidate", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Handle cleanup or notification logic if needed
  });
});

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
const { sendNotification } = require("./notificationModule");

app.get("/", async (req, res) => {
  res.send("Hello, world!. Backend server of rajasthan hackathon app");
});

app.get("/sendnotification", async (req, res) => {
  try {
    await sendNotification();
    res.send("Success");
  } catch (error) {
    console.log("Error");
    res.send("Error");
  }
});

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
  if (!user || !bcrypt.compare(password, user.user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json(user);
});

const socketioport = 8000;
const port = 3001;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

server.listen(socketioport, () => {
  console.log(`Server is listening on port ${socketioport}`);
});
