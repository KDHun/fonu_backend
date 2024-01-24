const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filesUploadSchema = new Schema(
  {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  },
  { timestamps: true }
);

const filesUpload = mongoose.model("filesUpload", filesUploadSchema);

module.exports = filesUpload;
