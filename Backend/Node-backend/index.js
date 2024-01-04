// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// app.use(cors());
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// // io.on("connection", (socket) => {
// //   console.log("A user connected");

// //   socket.on("offer", (data) => {
// //     console.log("Received offer:", data);
// //     socket.broadcast.emit("offer", data);
// //   });

// //   socket.on("answer", (data) => {
// //     console.log("Received answer:", data);
// //     socket.broadcast.emit("answer", data);
// //   });

// //   socket.on("ice-candidate", (data) => {
// //     console.log("Received ICE candidate:", data);
// //     socket.broadcast.emit("ice-candidate", data);
// //   });

// //   // Handle disconnection
// //   socket.on("disconnect", () => {
// //     console.log("User disconnected");
// //     // Handle cleanup or notification logic if needed
// //   });
// // });

// // Krishnendu Roy
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Event handler for receiving ICE candidates from the user
//   socket.on("ice-candidate", (candidate) => {
//     console.log("Received ICE candidate from user");
//     // Forward the ICE candidate to the admin
//     socket.broadcast.emit("ice-candidate", candidate);
//   });

//   // Event handler for receiving SDP offer from the user
//   socket.on("sdp-offer", (offer) => {
//     console.log("Received SDP offer from user");
//     // Forward the SDP offer to the admin
//     socket.broadcast.emit("sdp-offer", offer);
//   });

//   // Event handler for receiving SDP answer from the user
//   socket.on("sdp-answer", (answer) => {
//     console.log("Received SDP answer from user");
//     // Forward the SDP answer to the admin
//     socket.broadcast.emit("sdp-answer", answer);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// const DB = process.env.VITE_APP_MONGO_SERVER;
// mongoose
//   .connect(DB, {})
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((error) => {
//     console.log("Error in connecting to server", error);
//   });

// const UserDetails = require("./Models/UserDetailsModel");
// const { sendNotification } = require("./notificationModule");

// app.get("/", async (req, res) => {
//   res.send("Hello, world!. Backend server of rajasthan hackathon app");
// });

// app.get("/sendnotification", async (req, res) => {
//   try {
//     await sendNotification();
//     res.send("Success");
//   } catch (error) {
//     console.log("Error");
//     res.send("Error");
//   }
// });

// app.post("/userDetails", async (req, res) => {
//   try {
//     const data = req.body;
//     const hashedPassword = await bcrypt.hash(data.user.password, 10);
//     data.user.password = hashedPassword;
//     const userDetails = new UserDetails(data);
//     await userDetails.save();
//     res.send("Success");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // User Login
// app.post("/user/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await UserDetails.findOne({ "user.email": email });
//   if (!user || !bcrypt.compare(password, user.user.password)) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
//   res.json({ message: "Login successful", user: user });
// });

// const socketioport = 8000;
// const port = 3001;
// app.listen(port, () => {
//   console.log(`app is running on port ${port}`);
// });

// server.listen(socketioport, () => {
//   console.log(`Server is listening on port ${socketioport}`);
// });

// Krishnendu
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

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
    console.log("Error in connecting to the server", error);
  });

const UserDetails = require("./Models/UserDetailsModel");
const { sendNotification } = require("./notificationModule");

app.get("/", async (req, res) => {
  res.send("Hello, world!. Backend server of the Rajasthan hackathon app");
});

app.get("/sendnotification/:object", async (req, res) => {
  const object = req.params.object;
  console.log(object);
  try {
    await sendNotification(object);
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
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ message: "Login successful", user: user });
});

// WebRTC signaling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle user sending webcam stream to admin
  socket.on("sendWebcamStream", (userStream) => {
    // Send the user stream to admin
    socket.broadcast.emit("receiveWebcamStream", userStream);
  });

  // Additional socket.io events can be added as needed

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
