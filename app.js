import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import swaggerUi from "swagger-ui-express";

import boardsRouter from "./routes/boardsRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import columnsRouter from "./routes/columnsRouter.js";
import cardsRouter from "./routes/cardsRouter.js";

const app = express();

// const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

dotenv.config();
const { CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: "daqlrgzqj",
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

app.use(morgan("tiny"));
app.use(cors());

app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/users", userRouter, authRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
