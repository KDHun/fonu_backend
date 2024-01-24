const router = require("express").Router();
const {
  getCallHistory,
  getCallHistoryById,
  addCallHistory,
  deleteCallHistory,
  updateCallHistory,
  addManyCallHistory,
  getCallHistoryWithUser
} = require("../controller/callHistory");
const auth = require("../middleware/auth");

module.exports = router;

router.get("/", auth, getCallHistory);
router.get("/withuser",auth,getCallHistoryWithUser);
router.get("/:id", auth, getCallHistoryById);
router.post("/", auth, addCallHistory);
router.post("/all", auth, addManyCallHistory);
router.put("/:id", auth, updateCallHistory);
router.delete("/:id", auth, deleteCallHistory);