const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatListSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciveUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    block_by: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    isGroup: {
      type: Number,
      default: 0,
    },
    isReported: {
      type: Number,
      default: 0,
    },
    istyping: {
      type: Number,
      default: 0,
    },
    unread_msg_count: {
      type: Number,
      default: 0,
    },
    last_message: {
      type: String,
      trim: true,
    },
    last_media_type: {
      type: Number,
      default: 0,
    },
    isblocked_by_reciver: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Number,
      default: 0,
    },
    last_message_time: {
      type: Date,
    },
    pintime: {
      type: Date,
    },
    isPinned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatList", chatListSchema);
