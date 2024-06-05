import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import { v2 as cloudinary } from 'cloudinary';


import boardsRouter from "./routes/boardsRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import columnsRouter from "./routes/columnsRouter.js";
import cardsRouter from "./routes/cardsRouter.js";

const app = express();

cloudinary.config({
    cloud_name: 'daqlrgzqj',
    api_key: '784961374618977',
    api_secret: 'O5P8EPL5rIC_WDAb1IMUeMW_sHs'
});

app.use(morgan("tiny"));
app.use(cors());

app.use("/avatars", express.static(path.resolve("public/avatars")));
app.use("/api/boards", boardsRouter);
app.use("api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/users", userRouter, authRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

export default app;  