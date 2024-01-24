const router = require("express").Router();
const { deshboard } = require("../controller/deshboard");
const auth = require("../middleware/auth");

module.exports = router;

router.get("/", auth, deshboard);
