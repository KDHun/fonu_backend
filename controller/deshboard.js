const user = require("../models/user");
const callHistory = require("../models/callHistory");
const dayIndex = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

module.exports = {
  deshboard: async (req, res) => {
    try {
      const calldata = await callHistory.find({}) || [];
      const userData = await user.find({});
      const Incomming = [0, 0, 0, 0, 0, 0, 0];
      const Outgoing = [0, 0, 0, 0, 0, 0, 0];
      const Missed = [0, 0, 0, 0, 0, 0, 0];
      let IncommingCalls=0;
      let OutgoingCalls=0;
      let MissedCalls=0;
      calldata.forEach((call) => {
        const { Status, DayOfWeek } = call;
        if (Status === 0) Incomming[dayIndex[DayOfWeek]] += 1,IncommingCalls++;
        else if (Status === 1) Outgoing[dayIndex[DayOfWeek]] += 1,OutgoingCalls++;
        else Missed[dayIndex[DayOfWeek]] += 1,MissedCalls++;
      });
      const data = {
        deshboard: {
          totleCalls: calldata.length,
          IncommingCalls: IncommingCalls,
          OutgoingCalls: OutgoingCalls,
          MissedCalls: MissedCalls,
        },
        callSummary: {
          Incomming,
          Outgoing,
          Missed,
        },
        memberList:userData,
        calldata,
      };
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
