import { Schema, model, Document } from "mongoose";

interface IContact extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
}

const contactSchema = new Schema<IContact>({
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
	phone: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const Contact = model<IContact>("Contact", contactSchema);

export default Contact;
