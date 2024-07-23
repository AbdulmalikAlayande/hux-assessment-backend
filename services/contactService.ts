import Contact from "../models/contact";
import { ContactRepository } from "../repositories/contactRepository";
import { IContact } from "../types";
import { logger } from "../utils";

export class ContactService {
	private contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async createContact(contact: IContact): Promise<IContact | null> {
		try {
			const createdContact = await this.contactRepository.createContact(
				contact
			);
			logger.info("Contact created successfully");
			return createdContact;
		} catch (error) {
			logger.error("Failed to create contact", error);
			throw error;
		}
	}

	async getContactById(id: string): Promise<IContact | null> {
		try {
			const contact = await this.contactRepository.getContactById(id);
			if (!contact) {
				logger.warn(`Contact with id ${id} not found`);
			}
			return contact;
		} catch (error) {
			logger.error(`Failed to get contact with id ${id}`, error);
			throw error;
		}
	}

	async updateContact(
		id: string,
		partialContact: IContact
	): Promise<IContact | null> {
		try {
			const contact = await this.contactRepository.getContactById(id);
			if (!contact) {
				logger.warn(`Contact with id ${id} not found`);
				return null;
			}
			const updatedContact =
				await this.contactRepository.updateContactById(
					id,
					partialContact
				);
			logger.info(`Contact with id ${id} updated successfully`);
			return updatedContact;
		} catch (error) {
			logger.error(`Failed to update contact with id ${id}`, error);
			throw error;
		}
	}

	async deleteContact(id: string): Promise<void> {
		try {
			const contact = await this.contactRepository.getContactById(id);
			if (!contact) {
				logger.warn(`Contact with id ${id} not found`);
				return;
			}
			await this.contactRepository.deleteContactById(id);
			logger.info(`Contact with id ${id} deleted successfully`);
		} catch (error) {
			logger.error(`Failed to delete contact with id ${id}`, error);
			throw error;
		}
	}

	async getAllContacts(): Promise<IContact[]> {
		try {
			return await this.contactRepository.getAllContacts();
		} catch (error) {
			logger.error("Failed to get all contacts", error);
			throw error;
		}
	}
}
