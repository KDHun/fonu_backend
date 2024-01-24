const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const httpProxy = require("express-http-proxy"); 
const init = require("./socket/socket");
const callHistoryRoute = require("./routes/callHistory");
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/deshboard");
const userRoute = require("./routes/user");
const conversationRoute = require("./routes/conversation");
const chatListRoute = require("./routes/chatList");
const fileUploadRoute = require("./routes/fileUpload");
const databaseConnection = require("./data/db");
const path = require("path");
databaseConnection();
const server = http.createServer(app);
init(server);

const uploadImageFolder = path.join(__dirname, "uploads", "image");
const uploadAudioFolder = path.join(__dirname, "uploads", "audio");

// const socketProxy = httpProxy("ws://your-socket-io-server-url", {
//   ws: true,
// });
// app.use("/socket.io", (req, res, next) => {
//   // Proxy WebSocket requests to the Socket.IO server
//   socketProxy(req, res, next);
// });
app.use(cors());
app.use(express.json());

app.use('/uploads/image', express.static(uploadImageFolder));
app.use('/uploads/audio', express.static(uploadAudioFolder));
app.use("/", authRoute);
app.use("/callhistory", callHistoryRoute);
app.use("/deshboard", dashboardRoute);
app.use("/user", userRoute);
app.use("/conversation", conversationRoute);
app.use("/chatlist", chatListRoute);
app.use("/file",fileUploadRoute);


server.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;
