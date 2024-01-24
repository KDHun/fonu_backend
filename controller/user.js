const User = require("../models/user");


module.exports = {
  getUser: async (req, res) => {
    try {
      const data = await User.find({});
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const data = await User.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addUser: async (req, res) => {
    try {
      await User.create(req.body);
      res.status(200).send("User added");
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("User updated");
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
