import { IUser } from "../types/index";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository";

export class UserService {
	constructor() {}

	async createUser(req: Request, res: Response): Promise<object> {
		try {
			const { firstName, lastName, email, password } = req.body;

			const user = new User();
			user.firstName = firstName;
			user.lastName = lastName;
			user.email = email;
			const hash = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, hash);

			user.salt = hash;
			user.password = hashedPassword;

			const createdUser = await userRepository.createUser(user);
			return { success: true, data: createdUser };
		} catch (error) {
			throw error;
		}
	}

	async getUserById(userId: string): Promise<any> {
		try {
			const foundUser = userRepository.findById(userId);
			return { success: true, data: foundUser };
		} catch (error) {
			throw error;
		}
	}

	async updateUser(userId: string, userData: Partial<IUser>): Promise<any> {
		try {
			const updatedUser = await userRepository.updateUser(
				userId,
				userData
			);
			return { success: true, data: updatedUser };
		} catch (error) {
			throw error;
		}
	}

	async deleteUser(userId: string): Promise<any> {
		try {
			const deleteMessage = userRepository.deleteUser(userId);
			return { success: true, data: deleteMessage };
		} catch (error) {
			throw error;
		}
	}

	generateToken(userId: string): string {
		return jwt.sign(
			{ userId },
			process.env.JWT_SECRET || "your_jwt_secret",
			{ expiresIn: "1h" }
		);
	}

	verifyToken(token: string): string | object {
		try {
			return jwt.verify(
				token,
				process.env.JWT_SECRET || "your_jwt_secret"
			);
		} catch (error) {
			throw error;
		}
	}
}
