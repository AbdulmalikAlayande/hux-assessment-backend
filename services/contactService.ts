import { ContactRepository } from "../repositories/contactRepository";
import { IContact } from "../types";
import Contact from "../models/Contact";
import { logger } from "../utils";
import ResponseHandler from "../response/response";
import { Request, Response } from "express";

export class ContactService {
	private contactRepository: ContactRepository = new ContactRepository(
		Contact
	);

	constructor() {}

	async createContact(req: Request, res: Response): Promise<any> {
		try {
			const contact: IContact = new Contact();
			const request = req.body;
			if (!request) {
				return ResponseHandler.badRequest;
			}

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
