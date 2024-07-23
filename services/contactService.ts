import Contact from "../models/contact";
import { ContactRepository } from "../repositories/contactRepository";
import { IContact } from "../types";

export class ContactService {
	private contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	// CRUD methods

	async createContact(contact: IContact): Promise<IContact | null> {
		return null;
	}

	async getContactById(id: string): Promise<IContact | null> {
		return null;
	}

	async updateContact(id: string): Promise<IContact | null> {
		return null;
	}

	async deleteContact(id: string): Promise<any> {
		return null;
	}

	async getAllContacts(): Promise<IContact[]> {
		return [];
	}
}
