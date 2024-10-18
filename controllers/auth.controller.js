const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw 'User not found';
    }

    if (user &&
      (password === user.password ||
        (await bcrypt.compare(password, user.password)))) {
      const payload = {
        id: user._id,
      };

      return res.send({
        message: "Login successfully",
        data: {
          accessToken: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }),
          refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '180d' }),
        }
      });
    }
  } catch (err) {
    console.log("Login error", err)
    res.status(500).send({ message: err });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let whereQuery = {
      email
    }

    const user = await UserModel.findOne(whereQuery);

    if (user) {
      return res.send({
        message: "User already exist",
      })
    }

    // for password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertedUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    })
    await insertedUser.save();


    res.send({
      message: "Register Successfully, Please login"
    })


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};