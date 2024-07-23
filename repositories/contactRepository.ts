import { Model } from "mongoose";
import { IContact } from "../types";

export class ContactRepository {
	private contactModel: Model<IContact>;

	constructor(contactModel: Model<IContact>) {
		this.contactModel = contactModel;
	}

	async createContact(contactData: Partial<IContact>): Promise<IContact> {
		try {
			const contact = new this.contactModel(contactData);
			return await contact.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	async getAllContacts(): Promise<IContact[]> {
		try {
			return await this.contactModel.find().exec();
		} catch (error) {
			throw new Error(error);
		}
	}

	async getContactById(contactId: string): Promise<IContact | null> {
		try {
			return await this.contactModel.findById(contactId).exec();
		} catch (error) {
			throw new Error(error);
		}
	}

	async updateContactById(
		id: string,
		data: Partial<IContact>
	): Promise<IContact | null> {
		try {
			return await this.contactModel
				.findByIdAndUpdate(id, data, { new: true })
				.exec();
		} catch (error) {
			throw new Error(error);
		}
	}

	async deleteContactById(contactId: string): Promise<IContact | null> {
		try {
			return await this.contactModel.findByIdAndDelete(contactId).exec();
		} catch (error) {
			throw new Error(error);
		}
	}
}
