import express from "express";
import connectDB from "./db/dbconfig";
import router from "./controllers/userController";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", router);
app.use("api/contact");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
