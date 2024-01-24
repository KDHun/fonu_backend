require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(422).json({ error: "Email does not exists" });
      }
      if (user.password !== password) {
        return res.status(422).json({ error: "Invalid password" });
      }
      const userId = user._id.toString();
      const token = jwt.sign(
        {
          email,
          password,
          userId,
        },
        process.env.SECRET,
        { expiresIn: 60 * 60 }
      );
      res.send({ token });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  signup: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    let user;

    try {
      user = await User.findOne({ email: email });
      if (user) {
        return res.status(422).json({ error: "Email already exists" });
      }
    } catch (err) {
      return res.status(500).send(err);
    }

    try {
      const newUser = await User.create(req.body);
      const userId = newUser._id.toString();
      const token = jwt.sign(
        {
          email,
          password,
          userId,
        },
        process.env.SECRET,
        { expiresIn: 60 * 60 }
      );

      return res.send({ token });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  otp: async (req, res) => {
    const { phone } = req.body;
    try {
      //const OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      const OTP = 123456;
      const user = await User.findOne({ phone: phone });

      if (user) {
        return res.send({ message: "OTP sent successfully" });
      }
      const userData = {
        device: "ios",
        link: "https://user1-profile.com",
        address: "123 Main St, City1",
        email: "john.doe@example.com",
        phone: phone,
        role: "Tech Support",
        company: "Tech Solutions",
        name: "John Doe",
        OTP: OTP,
        image: "https://user1-image.com",
        is_online: 1,
        last_seen: new Date().toISOString(),
      };
      
      const data = await User.create(userData);

      return res.send({ message: "OTP sent successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  
  varifyotp: async (req, res) => {
    const { phone, OTP } = req.body;
    try {
      const user = await User.findOne({ phone: phone });
      if (user?.OTP === OTP) {
        const token = jwt.sign(
          {
            _id: user._id.toString(),
            phone: user.phone,
          },
          process.env.SECRET
          // { expiresIn: 60 * 60 }
        );

        return res.send({ user, token });
      } else {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
