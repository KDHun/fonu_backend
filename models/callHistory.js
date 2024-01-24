const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CallHistorySchema = new Schema(
  {
    CallerNumber: {
      type: String,
      required: true,
    },
    ReceiverName: {
      type: String,
      required: true,
    },
    ReceiverNumber: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
    DayOfWeek: {
      type: String,
      required: true,
    },
    Status: {
      type: Number,
      required: true,
    },
    CallDuration: {
      type: String,
      required: true,
    },
    Cost: {
      type: String,
      required: true,
    },
    AnsweredBy: {
      type: String,
    },
    UserId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const callHistory = mongoose.model("CallHistory", CallHistorySchema);

module.exports = callHistory;
