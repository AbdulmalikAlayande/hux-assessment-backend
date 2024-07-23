import { IUser } from "../types/index";
import User from "../models/User";
// import { UserModel } from "../models/UserModel";
import { sign, verify } from "jsonwebtoken";
import { Document } from "mongoose";

export class UserService {
	private readonly secretKey: string;

	constructor(secretKey: string) {
		this.secretKey = secretKey;
	}

	async createUser(userRequest: IUser): Promise<Document<any>> {
		const user = new User();
		user.firstName = userRequest.firstName;
		user.lastName = userRequest.lastName;
		user.email = userRequest.email;
		user.firstName = userRequest.firstName;

		// Logic to create a new user in the database
		// using the provided user object
		// Return the created user document
		return new Document();
	}

	async getUserById(userId: string): Promise<Document<any> | null> {
		// Logic to retrieve a user from the database
		// based on the provided userId
		// Return the user document if found, otherwise null
		return new Document();
	}

	async updateUser(userId: string): Promise<Document<any> | null> {
		// Logic to update a user in the database
		// based on the provided userId and updatedUser object
		// Return the updated user document if found, otherwise null
		return new Document();
	}

	async deleteUser(userId: string): Promise<boolean> {
		// Logic to delete a user from the database
		// based on the provided userId
		// Return true if the user is deleted successfully, otherwise false
		return true;
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
