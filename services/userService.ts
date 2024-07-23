import { IUser } from "../types/index";
import User from "../models/User";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Document } from "mongoose";
import userRepository from "../repositories/userRepository";

export class UserService {
	private readonly secretKey: string;

	constructor(secretKey: string) {
		this.secretKey = secretKey;
	}

	async createUser(userRequest: IUser): Promise<object> {
		try {
			const user = new User();
			user.firstName = userRequest.firstName;
			user.lastName = userRequest.lastName;
			user.email = userRequest.email;
			user.firstName = userRequest.firstName;

			const hash = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(
				userRequest.password,
				hash
			);

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

	async updateUser(userId: string): Promise<any> {
		try {
			const updatedUser = await userRepository.updateUser(userId);
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
		// Logic to generate a JWT token for the provided userId
		// using the secretKey
		// Return the generated token
		return "";
	}

	verifyToken(token: string): string | object {
		// Logic to verify and decode a JWT token
		// using the secretKey
		// Return the decoded token payload if valid, otherwise throw an error
		return "";
	}
}
