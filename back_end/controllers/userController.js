import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// ✅ Create User
export async function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type === "admin") {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({
        message: "Please login as administrator to create admin accounts"
      });
    }
  }

  try {
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);
    const user = new User(newUserData);
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "User not created" });
  }
}

// ✅ Login User
export async function loginUser(req, res) {
  try {
    const users = await User.find({ email: req.body.email });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isBlocked: user.isBlocked,
      type: user.type,
      profilePicture: user.profilePicture
    }, process.env.SECRET);

    res.json({
      message: "User logged in",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        profilePicture: user.profilePicture,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

// ✅ Get All Users (Admin only)
export async function getAllUsers(req, res) {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// ✅ Update User by ID (Admin only)
export async function updateUser(req, res) {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    const updateData = { ...req.body };

    // Hash new password if it's provided
    if (updateData.password && updateData.password.trim() !== "") {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    } else {
      delete updateData.password; // skip update if empty
    }

    await User.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: "User updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
}

// ✅ Delete User by ID (Admin only)
export async function deleteUser(req, res) {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
}

// ✅ Check if user is admin
export function isAdmin(req) {
  return req.user && req.user.type === "admin";
}

// ✅ Check if user is customer
export function isCustomer(req) {
  return req.user && req.user.type === "customer";
}

// ✅ Google Login
export async function googleLogin(req, res) {
  const idToken = req.body.token;

  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    const email = response.data.email;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isBlocked: user.isBlocked,
        type: user.type,
        profilePicture: user.profilePicture
      }, process.env.SECRET);

      return res.json({
        message: "User logged in",
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          profilePicture: user.profilePicture,
          email: user.email
        }
      });
    }

    const newUserData = {
      email,
      firstName: response.data.given_name || "",
      lastName: response.data.family_name || "",
      type: "customer",
      password: bcrypt.hashSync("default_password", 10),
      profilePicture: response.data.picture || ""
    };

    user = new User(newUserData);
    await user.save();

    const token = jwt.sign({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isBlocked: user.isBlocked,
      type: user.type,
      profilePicture: user.profilePicture
    }, process.env.SECRET);

    res.status(201).json({
      message: "User created and logged in",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        profilePicture: user.profilePicture,
        email: user.email
      }
    });

  } catch (e) {
    console.error("Google login verification failed:", e);
    res.status(500).json({ message: "Google login failed" });
  }
}
