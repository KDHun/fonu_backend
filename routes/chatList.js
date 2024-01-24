const router = require("express").Router();
const {
  getChatList,
  getChatListById,
  updateChatList,
  deleteChatList,
  addChatList,
} = require("../controller/chatList");
const auth = require("../middleware/auth");

module.exports = router;

router.get("/", auth, getChatList);
router.get("/:id", auth, getChatListById);
router.post("/", auth, addChatList);
router.put("/:id", auth, updateChatList);
router.delete("/:id", auth, deleteChatList);