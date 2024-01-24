const filesUpload = require("../models/filesUpload");

module.exports = {
  getFileById: async (id) => {
    try {
      const file = await filesUpload.findById(id);
      return file;
    } catch (err) {
      return err;
    }
  },
  addFile: async (file) => {
    try {
      const newFile = await filesUpload.create(file);
      return newFile;
    } catch (err) {
      return err;
    }
  },
  deleteFile: async (id) => {
    try {
      const file = await filesUpload.findByIdAndDelete(id);
      return file;
    } catch (err) {
      return err;
    }
  },
};
