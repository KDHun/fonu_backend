const ChatList = require("../models/chatList");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getChatList: async (req, res) => {
    try {
      const data = await ChatList.find({ userId: new ObjectId(req.user._id) })
        .populate("reciveUserId")
        .sort({ last_message_time: -1 });

      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getChatListById: async (req, res) => {
    try {
      const data = await ChatList.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteChatList: async (req, res) => {
    try {
      await ChatList.findByIdAndDelete(req.params.id);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addChatList: async (req, res) => {
    try {
      await ChatList.create(req.body);
      res.status(200).send("ChatList added");
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateChatList: async (req, res) => {
    try {
      await ChatList.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("ChatList updated");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateChatListSocket: async (msg) => {
    console.log(msg,"up-msg")
    const data = {
      last_message: msg.message,
      last_media_type: msg.media_type,
      last_message_time: msg.createdAt,
      $inc: { unread_msg_count: 1 },
    };
    const data1 = {
      last_message: msg.message,
      last_media_type: msg.media_type,
      last_message_time: msg.createdAt,
    };
    const update1 = await ChatList.findByIdAndUpdate(msg.cid, data1, { new: true });
    const update2 = await ChatList.findOneAndUpdate(
      {
        $and: [
          { userId: new ObjectId(msg.receiver_id) },
          { reciveUserId: new ObjectId(msg.sender_id) },
        ],
      },
      { $set: data },
      { new: true }
    );
    return [update1,update2];
  },
  updateBadgeCountSocket: async (data) => {
    const updateData = {
      unread_msg_count: 0,
    };
    const update = await ChatList.findByIdAndUpdate(data._id, updateData, {
      new: true,
    });
    return update;
  },
};
