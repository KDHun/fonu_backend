const { Server } = require("socket.io");
const { addConversationSocket } = require("../controller/conversation");
const { updateChatListSocket, updateBadgeCountSocket } = require("../controller/chatList");
let io;
let users = new Map(); 

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    users.set(userId, socket.id);
    console.log(`${userId} user connected with ID: ${socket.id}`);

    socket.on("sendMessage", async (msg) => {
      const data = await addConversationSocket(msg);
      const data1 = await updateChatListSocket(data);
      io.to(users.get(msg.sender_id)).emit("reciveMessage", data);
      io.to(users.get(msg.sender_id)).emit("conversationList", data1[0]);
      if (users.has(msg.receiver_id)) {
        io.to(users.get(msg.receiver_id)).emit("conversationList", data1[1]);
        io.to(users.get(msg.receiver_id)).emit("reciveMessage", data);
      } else {
        console.log("user not found");
      }
    });

    socket.on("badgeCount", async (data) => {
      const update = await updateBadgeCountSocket(data);
    });

    socket.on("isTyping", (data) => {
      io.to(users.get(data.receiver_id)).emit("isTyping", data);
    });

    socket.on("doneTyping", (data) => {
      io.to(users.get(data.receiver_id)).emit("doneTyping", data);
    });
    socket.to("disconnect", () => {
      console.log(`User with ID: ${socket.id} disconnected`);
      users.delete(socket.id);
    });
  });
};

module.exports = init;
