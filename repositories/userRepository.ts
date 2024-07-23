import { Model, Document } from "mongoose";
import { IUser } from "../types/index";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { DeleteResult } from "mongodb";

interface UserRepository {
	findByEmail(email: string): Promise<any>;
	findById(id: string): Promise<any>;
	findAll(): Promise<IUser[]>;
	// generateToken(user: IUser): string;
	createUser(user: IUser): Promise<any>;
	updateUser(id: string): Promise<any>;
	deleteUser(id: string): Promise<any>;
}

const userRepository: UserRepository = {
	async findByEmail(email: string) {
		return User.findOne({ email }).exec();
	},

	async createUser(user: IUser) {
		try {
			const data = await User.create(user);
			return data ? data.toJSON() : null;
		} catch (error) {
			throw error;
		}
	},

	async updateUser(id: string) {
		try {
			const foundUser = await User.findByIdAndUpdate(id);
			return foundUser ? foundUser.toJSON() : null;
		} catch (error) {
			throw error;
		}
	},

	async deleteUser(id: string) {
		try {
			const deleteOperation: DeleteResult = await User.deleteOne({
				_id: id,
			});
			return deleteOperation.acknowledged ? "Deleted Successfully" : null;
		} catch (error) {
			throw error;
		}
	},

	async findById(id: string): Promise<any> {
		try {
			const foundUser = await User.findById(id);
			return foundUser ? foundUser.toJSON() : null;
		} catch (error) {
			throw error;
		}
	},
	async findAll(): Promise<IUser[]> {
		try {
			const users = await User.find();
			return users.map((user) => user);
		} catch (error) {
			throw error;
		}
	},
};

export default userRepository;
