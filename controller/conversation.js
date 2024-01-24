const Conversation = require("../models/conversation");

module.exports = {
  getConversation: async (req, res) => {
    try {
      const data = await Conversation.find({});
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getConversationById: async (req, res) => {
    try {
      const data = await Conversation.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getConversationByChatId: async (req, res) => {
    try {
      const data = await Conversation.find({
        $or: [
          { $and: [{ sender_id: req.query.sender_id }, { receiver_id: req.query.receiver_id }] },
          { $and: [{ sender_id: req.query.receiver_id }, { receiver_id: req.query.sender_id }] },
        ],
      }).sort({ datetime: -1 });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteConversation: async (req, res) => {
    try {
      await Conversation.findByIdAndDelete(req.params.id);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addConversation: async (req, res) => {
    try {
      await Conversation.create(req.body);
      res.status(200).send("Conversation added");
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateConversation: async (req, res) => {
    try {
      await Conversation.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Conversation updated");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addConversationSocket: async (conversation) => {
    try {
      const data = await Conversation.create(conversation);
      return data; 
    } catch (err) {
      console.log(err);
    }
  },
};
