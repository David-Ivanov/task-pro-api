import HttpError from "../../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { createRegisterSchema } from "../../schemas/authSchemas.js";
import User from "../../models/authModel.js"
import gravatar from "gravatar";

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

    // add avatar
    const avatarURL = gravatar.url(email, { s: 250, d: "identicon" }, true);

    // create user
    const user = {
        email,
        name,
        password: passwordHash,
        avatarURL,
    }

    await User.create(user);
    res.status(201).send({ user: { email, name } });
}

export default register;
