export const logger = {
	info: (message: string) => console.log(`INFO: ${message}`),
	error: (message: string, error: Error | any) =>
		console.log(`ERROR: ${message}`, error),
	warn: (message: string) => console.log(`WARN: ${message}`),
};
