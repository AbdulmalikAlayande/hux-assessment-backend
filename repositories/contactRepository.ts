import { Model } from "mongoose";
import Contact from "../models/contact";
import { IContact } from "../types";

export class ContactRepository {
	private contactModel: Model<IContact>;

	constructor(contactModel: Model<IContact>) {
		this.contactModel = contactModel;
	}

	// Add your repository methods here

	// Example method: create a new contact
	async createContact(contactData: Partial<IContact>): Promise<IContact> {
		const contact = new this.contactModel(contactData);
		return contact.save();
	}

	// Example method: get all contacts
	async getAllContacts(): Promise<IContact[]> {
		return this.contactModel.find().exec();
	}

	// Example method: get contact by ID
	async getContactById(contactId: string): Promise<IContact | null> {
		return this.contactModel.findById(contactId).exec();
	}

	// Example method: update contact by ID
	async updateContactById(
		contactId: string,
		contactData: Partial<IContact>
	): Promise<IContact | null> {
		return this.contactModel
			.findByIdAndUpdate(contactId, contactData, { new: true })
			.exec();
	}

	// Example method: delete contact by ID
	async deleteContactById(contactId: string): Promise<IContact | null> {
		return this.contactModel.findByIdAndDelete(contactId).exec();
	}
}
