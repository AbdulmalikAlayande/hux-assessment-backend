import express from "express";
import { userValidationRules } from "../middlewares/validation";
import ApiRateLimiter from "../middlewares/attempts";
import {
	registerController,
	loginContoller,
	updateContoller,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post(
	"/register",
	userValidationRules,
	ApiRateLimiter,
	registerController
);

userRouter.post("/login", ApiRateLimiter, loginContoller);
userRouter.put("/user/:id", ApiRateLimiter, updateContoller);

export default userRouter;
