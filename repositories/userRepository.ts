import { IUser } from "../types/index";
import User from "../models/User";
import { DeleteResult } from "mongodb";

interface UserRepository {
	findByEmail(email: string): Promise<IUser | null>;
	findById(id: string): Promise<IUser | null>;
	findAll(): Promise<IUser[]>;
	createUser(user: IUser): Promise<IUser | null>;
	updateUser(id: string, user: Partial<IUser>): Promise<IUser | null>;
	deleteUser(id: string): Promise<string | null>;
}

const userRepository: UserRepository = {
	async findByEmail(email: string) {
		return User.findOne({ email }).exec();
	},

	async createUser(user: IUser) {
		try {
			const data = await User.create(user);
			return data ? (data.toJSON() as IUser) : null;
		} catch (error) {
			throw error;
		}
	},

	async updateUser(id: string, user: Partial<IUser>) {
		try {
			const updatedUser = await User.findByIdAndUpdate(id, user, {
				new: true,
			}).exec();
			return updatedUser ? (updatedUser.toJSON() as IUser) : null;
		} catch (error) {
			throw error;
		}
	},

	async deleteUser(id: string) {
		try {
			const deleteOperation: DeleteResult = await User.deleteOne({
				_id: id,
			}).exec();
			return deleteOperation.acknowledged ? "Deleted Successfully" : null;
		} catch (error) {
			throw error;
		}
	},

	async findById(id: string): Promise<IUser | null> {
		try {
			const foundUser = await User.findById(id).exec();
			return foundUser ? (foundUser.toJSON() as IUser) : null;
		} catch (error) {
			throw error;
		}
	},

	async findAll(): Promise<IUser[]> {
		try {
			const users = await User.find().exec();
			return users.map((user) => user.toJSON() as IUser);
		} catch (error) {
			throw error;
		}
	},
};

export default userRepository;
