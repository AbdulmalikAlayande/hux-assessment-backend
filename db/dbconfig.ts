import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.DB_URL || "mongodb://localhost:27017/hux",
			{
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
				useNewUrlParser: true,
			} as mongoose.ConnectOptions
		);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

export default connectDB;