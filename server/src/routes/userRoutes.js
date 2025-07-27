import { login, signUp } from "../controllers/userController.js";
import { login as logins, refresh } from "../controllers/auth.controller.js";
import express from "express";
const UserRouter = express.Router();

UserRouter.post("/login", login, logins);
UserRouter.post("/signUp", signUp, logins);

export default UserRouter;
