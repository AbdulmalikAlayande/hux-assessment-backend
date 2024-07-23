// middleware/validation.ts
import { body } from "express-validator";

export const userValidationRules = [
	body("firstName")
		.isString()
		.notEmpty()
		.withMessage("First name is required"),
	body("lastName").isString().notEmpty().withMessage("Last name is required"),
	body("email").isEmail().withMessage("Email is invalid"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const contactValidationRules = [
	body("firstName")
		.isString()
		.notEmpty()
		.withMessage("First name is required"),
	body("lastName").isString().notEmpty().withMessage("Last name is required"),
	body("email").isEmail().withMessage("Email is invalid"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 6 characters long"),
	body("phoneNumber")
		.isLength({ min: 11 })
		.withMessage("Phone must be at least 11 characters long"),
];
