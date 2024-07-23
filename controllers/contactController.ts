import express, { Request, Response } from "express";
import { ContactService } from "../services/contactService";
import VerifyAuth from "../middlewares/verifyAuth";
import verifyAuth from "../middlewares/verifyAuth";

const contactRouter = express.Router();

contactRouter.get("/get-contact/:id", (req: Request, res: Response) => {
	contactService.getContactById(req.params.id);
});

const contactService = new ContactService();
contactRouter.post(
	"/create-contact",
	verifyAuth,
	(req: Request, res: Response) => {
		contactService.createContact(req, res);
	}
);

export default contactRouter;
