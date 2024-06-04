import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();


app.use(morgan("tiny"));
app.use(cors());

app.use("/avatars", express.static(path.resolve("public/avatars")));
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter, userRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

export default app; 