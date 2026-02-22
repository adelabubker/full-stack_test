import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new AppError("Name and Email are required", 400, "E001"));
    }

    const user = await User.create({ name, email });

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    next(error);
  }
};