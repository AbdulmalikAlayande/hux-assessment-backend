import express, { Request, Response } from "express";
import { UserService } from "../services/userService";
import { userValidationRules } from "../middlewares/validation";
import { validationResult } from "express-validator";

const router = express.Router();

const userService = new UserService();
router.post(
	"/register",
	userValidationRules,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const result = await userService.createUser(req, res);
			res.json(result);
		} catch (error) {
			res.status(500).json({ error });
		}
	}
);

router.put(
	"/user/:id",
	userValidationRules,
	async (req: Request, res: Response) => {
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
	}
);

export default router;
