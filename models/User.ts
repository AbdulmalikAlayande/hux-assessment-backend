import { Schema, model, Document } from "mongoose";
import { IUser } from "../types/index";

const userSchema = new Schema<IUser>({
	_id: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: false,
	},
});

const User = model<IUser>("User", userSchema);

export default User;
