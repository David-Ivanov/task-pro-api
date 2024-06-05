import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createHelpSchema } from "../../schemas/usersSchema";
import HttpError from "../../helpers/HttpError.js";

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

const needHelp = async (req, res) => {
    const { email, comment } = req.body;

    if (!email, !comment) {
        return res.status(400).send({ message: HttpError(400).message });
    }

    const { error } = createHelpSchema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: HttpError(400).message });
    }

    try {
        await transport.sendMail({
            from: email,
            to: "taskpro.project@gmail.com",
            text: comment,
            html: `<p>${comment}</p>`,
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).send({ message: HttpError(500).message });
    }
}

export default needHelp;