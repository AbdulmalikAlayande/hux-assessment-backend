import { Response } from "express";

export default class ResponseHandler {
	static success(res: Response, data: any) {
		return res.status(200).json({ success: true, data });
	}

	static created(res: Response, data: any) {
		return res.status(201).json({ success: true, data });
	}

	static badRequest(res: Response, error: any) {
		return res.status(400).json({ success: false, error });
	}

	static unauthorized(res: Response, error: { error: string }) {
		return res.status(401).json({ success: false, error });
	}

	static forbidden(res: Response, error: any) {
		return res.status(403).json({ success: false, error });
	}

	static notFound(res: Response, error: any) {
		return res.status(404).json({ success: false, error });
	}

	static unprocessable(res: Response, error: any) {
		return res.status(422).json({ success: false, error });
	}

	static conflict(res: Response, error: any) {
		return res.status(409).json({ success: false, error });
	}

	static internalServerError(res: Response, error: any) {
		return res.status(500).json();
	}
}
