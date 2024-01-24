const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    device: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    OTP: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    is_online: {
      type: Number,
      default: 0,
    },
    last_seen: {
      type: Date,
    },
    sip_username: {
      type: String,
    },
    sip_password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.index({ phone: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
