import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { createEmailSchema, createRegisterSchema } from "../schemas/authSchemas.js";
import User from "../models/authModel.js"
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { MAILTRAP_PASSWORD, MAILTRAP_USERNAME } = process.env

// transporter for email
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: MAILTRAP_USERNAME,
        pass: MAILTRAP_PASSWORD
    }
});

export const register = async (req, res) => {
    const { email, password } = req.body;

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

    // send email
    const verificationToken = crypto.randomUUID();

    transport.sendMail({
        from: 'ivanovdavid905@gmail.com',
        to: email,
        subject: "Please, verify",
        text: `Open the link to verify http://localhost:3000/api/users/verify/${verificationToken}`,
        html: `<p>Open the link to verify</p> <a href="http://localhost:3000/api/users/verify/${verificationToken}">Link</a>`,
    });

    // create user
    const user = {
        email,
        password: passwordHash,
        avatarURL,
        verificationToken,
    }

    const newUser = await User.create(user);
    res.status(201).send({ user: { email, subscription: newUser.subscription } });
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const { error } = createRegisterSchema.validate(req.body);

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

        // check is user verify
        if (!user.verify) {
            return res.status(401).send({ message: HttpError(401, "You are not verify").message });
        }

        // create token

        const payload = {
            email,
            password: user.password,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        const newUser = await User.findByIdAndUpdate({ _id: user._id }, { token });

        res.status(200).send({ user: { email: newUser.email, subscription: newUser.subscription }, token });
    } catch (err) {
        res.status(401).send({ message: HttpError(401).message });
    }
}

export const logout = async (req, res) => {
    // errors are catching in authMiddleware.js
    const authorizationHeader = req.headers.authorization.split(" ");
    const token = authorizationHeader[1];

    const data = jwt.decode(token);

    await User.findByIdAndUpdate(data.id, { token: null });

    res.status(204).end()
}

export const current = async (req, res) => {
    // errors are catching in authMiddleware.js

    const authorizationHeader = req.headers.authorization.split(" ");
    const token = authorizationHeader[1];

    const data = jwt.decode(token);

    const result = await User.findById(data.id);

    res.status(200).send({ email: result.email });
}

export const verify = async (req, res) => {
    const { verificationToken } = req.params;

    try {
        await User.findOneAndUpdate(
            { verificationToken },
            {
                verificationToken: null,
                verify: true,
            },
            { new: true }
        );

        res.status(200).send({ message: 'Verification successful' });
    } catch (err) {
        res.status(404).send({ message: HttpError(404, "User not found").message });
    }
}

export const sendEmailAgain = async (req, res) => {
    const { email } = req.body;

    // checks if the email has been skipped
    if (!email) {
        return res.status(400).send({ message: HttpError(400, "Missing required field email").message });
    }


    // validate the email
    const { error } = createEmailSchema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: HttpError(400).message });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: HttpError(400, "User are not registered").message });
        }

        if (user.verify) {
            return res.status(400).send({ message: HttpError(400, "Verification has already been passed").message });
        }

        transport.sendMail({
            from: 'ivanovdavid905@gmail.com',
            to: email,
            subject: "Please, verify",
            text: `Open the link to verify http://localhost:3000/api/users/verify/${user.verificationToken}`,
            html: `<p>Open the link to verify</p> <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Link</a>`,
        });

        res.status(200).send({ message: "Verification email sent" });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: HttpError(400, "User are not registered").message });
    }
}