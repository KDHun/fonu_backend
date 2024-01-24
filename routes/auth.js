const express = require("express");
const router = express.Router();

const { signup, login, otp, varifyotp } = require("../controller/auth");
router.post("/signup", signup);
router.post("/login", login);
router.post("/otp", otp);
router.post("/varifyotp", varifyotp);

module.exports = router;
