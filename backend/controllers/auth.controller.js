import User from "../models/user.model.js";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userEixsts = await User.findOne({ email });
    if (userEixsts) {
      return res.status(400).json({ message: "User already userEixsts" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error occurred" });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
