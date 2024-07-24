import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { validationResult } from "express-validator";
import { logger } from "../utils";
import bcrypt from "bcrypt";

const userService = new UserService();
export const registerController = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const result = await userService.createUser(req, res);
		logger.info("user created successfully");
		res.json(result);
	} catch (error) {
		if (error instanceof Error) {
			logger.error("Error occurred: " + error.name, error.message);
			res.status(500).json({
				error: "Error",
				message: error.message,
			});
		} else {
			logger.error("Unknown error occurred:", error);
			res.status(500).json({
				error: "Unknown",
				message: "An unexpected error occurred.",
			});
		}
	}
};

export const updateContoller = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const userId = req.params.id;
		const userData = req.body;
		const result = await userService.updateUser(userId, userData);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const loginContoller = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await userService.getUserByEmail(email);
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		await user.incrementLoginCount();
		const token = userService.generateToken(user._id);
		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "strict",
			secure: false,
		});
		res.json({ token });
	} catch (error) {
		logger.error("Error occurred:", error);
		res.status(500).json({ message: "An unexpected error occurred" });
	}
};
