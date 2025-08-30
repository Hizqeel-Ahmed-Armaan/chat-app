import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utilities/utils.js";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
  try {

    if (!fullname || !email || !password) {
     return res.status(400).json({ message: "All fields are required" })}

   if (password.length < 6) {
  return res.status(400).json({ message: "Password must be at least 6 characters long" });
   }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if(user){
        generateToken(res, user._id);
        await user.save();
    }

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
    maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const check = async (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json("Internal server error")
        console.log("Error in check controller")
    }
}