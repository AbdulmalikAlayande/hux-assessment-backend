import rateLimit from "express-rate-limit";

const ApiRateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	message: "Too many attempts, please try again after some time",
});

export default ApiRateLimiter;
