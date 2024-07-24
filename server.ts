import express from "express";
import connectDB from "./db/dbconfig";
import userRouter from "./routes/userApiRouter";
import contactRouter from "./controllers/contactController";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import verifyAuth from "./middlewares/verifyAuth";

const app = express();

app.use(express.json());

app.use(morgan("combined"));

connectDB();

app.use(cors());
app.use(helmet());

app.use("/api", userRouter);
app.use("api/contact", verifyAuth, contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
