const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

// register
exports.register = asyncHandler(async (req,res)=>{
  const {name,email,password} = req.body;

  if(!name || !email || !password){
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const exists = await User.findOne({email});
  if(exists){
    res.status(400);
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password,10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token: generateToken(user._id)
  });
});

// login
exports.login = asyncHandler(async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user){
    res.status(400);
    throw new Error("Invalid email");
  }

  const match = await bcrypt.compare(password,user.password);
  if(!match){
    res.status(400);
    throw new Error("Wrong password");
  }

  res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token: generateToken(user._id)
  });
});

// profile
exports.getProfile = asyncHandler(async (req,res)=>{
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});
