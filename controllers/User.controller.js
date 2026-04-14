const user = require("../models/user_model");
const httptextmessage = require("../utisl/httpTextMessage");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_genrateToken = require("../utisl/jwt_genrateToken");

const getAllusers = async (req, res) => {
  const query = req.query;
  const limit = query.limit;
  const page = query.page;
  const skip = (page - 1) * limit;
  const Users = await user.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httptextmessage.SUCCESS, data: { Users } }); //Jsend structure
};
//register
const register = async (req, res) => {
  const { firstName, lastName, Email, password, role, avatar } = req.body;
  const oldUser = await user.findOne({ Email: Email });
  if (oldUser) {
    return res.status(400).json({
      status: httptextmessage.ERROR,
      message: "the user already exists",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = new user({
    firstName,
    lastName,
    Email,
    password: hashedpassword,
    role,
    avatar: req.file.filename,
  });

  const token = await jwt_genrateToken({
    Email: newUser.Email,
    id: newUser._id,
    role: newUser.role,
  });

  newUser.token = token;
  await newUser.save();

  res.status(201).json({ status: httptextmessage.SUCCESS, User: newUser });
};
//login
const login = async (req, res) => {
  const { Email, password, role } = req.body;
  if (!Email && !password) {
    return res.status(400).json({
      status: httptextmessage.ERROR,
      message: "please enter the data",
    });
  }
  const userEmail = await user.findOne({ Email: Email });
  const User = await user.findOne({ Email: Email });

  if (!userEmail) {
    return res.status(400).json({
      status: httptextmessage.ERROR,
      message: "user not found",
    });
  }

  const passwordmatched = await bcrypt.compare(password, userEmail.password);
  const token = await jwt_genrateToken({
    Email: User.Email,
    id: User._id,
    role: User.role,
  });

  user.token = token;
  if (userEmail && passwordmatched) {
    return res.status(201).json({
      status: httptextmessage.SUCCESS,
      message: "logged in successfuly ",
      token: token,
      role: User.role,
    });
  } else {
    return res.status(400).json({
      status: httptextmessage.ERROR,
      message: "Fiald to login",
    });
  }
};

module.exports = {
  getAllusers,
  register,
  login,
};
