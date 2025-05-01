// userController.js
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type === "admin") {
    if (req.user == null || req.user.type !== "admin") {
      res.json({
        message: "Please login as administrator to create admin accounts"
      });
      return;
    }
  }

  newUserData.password = bcrypt.hashSync(newUserData.password, 10);

  const user = new User(newUserData);

  user.save()
    .then(() => {
      res.json({
        message: "User created"
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({
        message: "User not created"
      });
    });
}

export function loginUser(req, res) {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length === 0) {
      res.json({
        message: "User not found"
      });
    } else {
      const user = users[0];
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

      if (isPasswordCorrect) {
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
          token: token,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            profilePicture: user.profilePicture,
            email: user.email
          }
        });
      } else {
        res.json({
          message: "User not logged in (wrong password)"
        });
      }
    }
  });
}

export function isAdmin(req) {
  if (req.user == null || req.user.type !== "admin") {
    return false;
  }
  return true;
}

export function isCustomer(req) {
  if (req.user == null || req.user.type !== "customer") {
    return false;
  }
  return true;
}

export async function googleLogin(req, res) {
  console.log(req.body);
  const idToken = req.body.token;

  try {
    // Verify the ID token using Google's tokeninfo endpoint
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);

    const email = response.data.email;

    if (!email) {
      res.json({
        message: "Invalid Google token"
      });
      return;
    }

    const usersList = await User.find({ email: email });

    if (usersList.length > 0) {
      // User already exists -> login
      const user = usersList[0];
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
        token: token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          profilePicture: user.profilePicture,
          email: user.email
        }
      });
    } else {
      // New user -> create account
      const newUserData = {
        email: email,
        firstName: response.data.given_name || "",
        lastName: response.data.family_name || "",
        type: "customer",
        password: "default_password", // you can generate a random one if you want
        profilePicture: response.data.picture || ""
      };

      const user = new User(newUserData);
      await user.save();

      const newToken = jwt.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isBlocked: user.isBlocked,
        type: user.type,
        profilePicture: user.profilePicture
      }, process.env.SECRET);

      res.json({
        message: "User created and logged in",
        token: newToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          profilePicture: user.profilePicture,
          email: user.email
        }
      });
    }

  } catch (e) {
    console.error("Google login verification failed:", e);
    res.json({
      message: "Google login failed"
    });
  }
}
