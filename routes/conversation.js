const router = require("express").Router();
const {
  getConversation,
  getConversationById,
  updateConversation,
  deleteConversation,
  addConversation,
  getConversationByChatId
} = require("../controller/conversation");
const auth = require("../middleware/auth");

module.exports = router;

router.get("/", auth, getConversation);
router.get("/chat", auth, getConversationByChatId);
router.get("/:id", auth, getConversationById);
router.post("/", auth, addConversation);
router.put("/:id", auth, updateConversation);
router.delete("/:id", auth, deleteConversation);