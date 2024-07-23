import express from "express";
import connectDB from "./db/dbconfig";
import router from "./controllers/userController";
import contactRouter from "./controllers/contactController";
import cors from "cors";
import helmet from "helmet";

import verifyAuth from "./middlewares/verifyAuth";

const app = express();

app.use(express.json());

connectDB();

app.use(cors());
app.use(helmet());

app.use("/api", verifyAuth, router);
app.use("api/contact", contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
