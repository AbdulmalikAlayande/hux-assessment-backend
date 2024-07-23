import ResponseHandler from "../response/response.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "dotenv";
import userRepo from "../repositories/userRepository.js";
import { Request, Response, NextFunction } from "express";

env.config();

interface AuthenticatedRequest extends Request {
	user?: any;
}

const verifyAuth = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req?.headers?.authorization) {
			const token = req.headers.authorization.replace("Bearer ", "");
			const obj = jwt.verify(
				token,
				process.env.JWT_SECRET || ""
			) as JwtPayload;
			const userData = await userRepo.findById(obj.id);
			req.user = userData;
			next();
		} else {
			throw new Error();
		}
	} catch (error) {
		return ResponseHandler.unauthorized(res, { error: "Unauthorized" });
	}
};

export default verifyAuth;
