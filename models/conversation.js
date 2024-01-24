const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    broadcast_id: {
      type: String,
      default: null,
    },
    broadcast_msg_id: {
      type: String,
      default: null,
    },
    originalName: {
      type: String,
      default: "",
    },
    fileId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"filesUpload"
    },
    fileURL:{
      type:String,
      default:""
    },
    fileName: {
      type: String,
      default:""
    },
    message: {
      type: String,
      default:""
    },
    message_type: {
      type: Number,
      default: 0,
    },
    media_type: {
      type: Number,
      default: 0,
    },
    delivery_type: {
      type: Number,
      default: 0,
    },
    reply_message_id: {
      type: String,
      default: "",
    },
    schedule_time: {
      type: Date,
      default: null,
    },
    block_message_users: {
      type: [String],
      default: [],
    },
    delete_message_users: {
      type: [String],
      default: [],
    },
    is_deleted: {
      type: Number,
      default: 0,
    },
    message_reaction_users: {
      type: [String],
      default: [],
    },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatList",
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ispinned: {
      type: Number,
      default: 0,
    },
    pin_by: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
