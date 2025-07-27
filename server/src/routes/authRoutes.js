import { refresh } from "../controllers/auth.controller.js";
import express from "express";
const AuthRouter = express.Router();

AuthRouter.post("/refresh", refresh);
export default AuthRouter;
