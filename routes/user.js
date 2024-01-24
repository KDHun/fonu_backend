const router = require("express").Router();
const {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
} = require("../controller/user");
const auth = require("../middleware/auth");

module.exports = router;

router.get("/", auth, getUser);
router.get("/:id", auth, getUserById);
router.post("/", auth, addUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);