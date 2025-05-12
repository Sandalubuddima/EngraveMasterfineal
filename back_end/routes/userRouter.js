import express from 'express';
import {
  createUser,
  googleLogin,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", updateUser);    // 👈 new
userRouter.delete("/:id", deleteUser); // 👈 new

export default userRouter;
