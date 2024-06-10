import HttpError from "../../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { createLoginSchema } from "../../schemas/authSchemas.js";
import User from "../../models/authModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;


const login = async (req, res) => {
    const { email, password } = req.body;

    const { error } = createLoginSchema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: HttpError(400).message });
    }

    try {
        const user = await User.findOne({ email });

        // check email
        if (!user) {
            return res.status(401).send({ message: HttpError(401, "Email or password is wrong").message });
        }

        // check password 
        const isRegistered = await bcrypt.compare(password, user.password);
        if (!isRegistered) {
            return res.status(401).send({ message: HttpError(401, "Email or password is wrong").message });
        }

        // create token

        const payload = {
            email,
            password: user.password,
            id: user._id
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

        const newUser = await User.findByIdAndUpdate({ _id: user._id }, { token });

        res.status(200).send({ data: { user: { email: newUser.email, name: newUser.name, avatarURL: newUser.avatarURL, theme: newUser.theme }, token } });
    } catch (err) {
        res.status(401).send({ message: HttpError(401).message });
    }
}
export default login;
