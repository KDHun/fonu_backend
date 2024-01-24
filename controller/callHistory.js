const callHistory = require("../models/callHistory");
const sortMapping = {
  date: "Date",
  duration: "CallDuration",
  cost: "Cost",
  from: "CallerNumber",
  to: "ReceiverNumber",
  answeredby: "AnsweredBy",
};
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = {
  getCallHistory: async (req, res) => {
    try {
      const {
        pagesize = 1000000,
        page = 0,
        sort = 'date',
        startdate = "0000-00-00",
        enddate = "9999-99-99",
        status = '3',
        search: searchText,
      } = req.query;

      const skiping = pagesize * page;
      const Filters = { UserId: new ObjectId(req.user.userId) };

      if (startdate && enddate) {
        Filters.Date = {
          $gte: startdate,
          $lte: enddate,
        };
      }
      if (status !== "3") {
        Filters.Status = status;
      }
      if (searchText) {
        Filters.$text = { $search: searchText };
      }
      const totalRows = await callHistory.countDocuments(Filters);
      const data = await callHistory
        .find(Filters)
        .sort([[sortMapping[sort], 1]])
        .skip(skiping)
        .limit(pagesize);

      res.status(200).send({ data, totalRows });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  getCallHistoryById: async (req, res) => {
    try {
      const data = await callHistory.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteCallHistory: async (req, res) => {
    try {
      await callHistory.findByIdAndDelete(req.params.id);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addCallHistory: async (req, res) => {
    try {
      await callHistory.create({ ...req.body, userId: new ObjectId(req.user.userId) });
      res.status(200).send("callHistory added");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addManyCallHistory: async (req, res) => {
    try {
      const data = req.body.map((data1) => {
        return { ...data1, UserId: new ObjectId(req.user.userId) };
      });
      await callHistory.insertMany(data);
      res.status(200).send("callHistory added");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateCallHistory: async (req, res) => {
    try {
      await callHistory.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("callHistory updated");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getCallHistoryWithUser: async (req, res) => {
    try {
      const data = await callHistory.find({ UserId: new ObjectId(req.user.userId) }).populate('UserId')
    
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      
      res.status(500).send(err);
    }
  }
};
