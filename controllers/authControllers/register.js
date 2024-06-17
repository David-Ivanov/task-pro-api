import HttpError from "../../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { createRegisterSchema } from "../../schemas/authSchemas.js";
import User from "../../models/authModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

const avatarURL = "https://res.cloudinary.com/daqlrgzqj/image/upload/v1717842472/avatars/darkUser.png";

const register = async (req, res) => {
    const { email, password, name } = req.body;

    // checks if the user is registered
    try {
        const isUserAlreadyRegister = await User.findOne({ email });
        if (isUserAlreadyRegister) {
            return res.status(409).send({ message: HttpError(409).message });
        }
    } catch (err) {
        return res.status(409).send({ message: HttpError(409).message });
    }

    const { error } = createRegisterSchema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: HttpError(400).message });
    }

    const passwordHash = await bcrypt.hash(password, 10);


    // create user
    const user = {
        email,
        name,
        password: passwordHash,
        avatarURL
    }

    const createdUser = await User.create(user);

    // create token

    const payload = {
        email,
        password: passwordHash,
        id: createdUser._id
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    await User.findOneAndUpdate({ email }, { token });

    res.status(201).send({ user: { email, name, avatarURL }, token });
}

export default register;
