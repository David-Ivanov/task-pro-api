import User from "../../models/authModel.js";
import { createEditSchema } from "../../schemas/usersSchema.js";
import HttpError from "../../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const editProfile = async (req, res) => {
    try {
        let { email, name, password } = req.body;

        // validate
        const { error } = createEditSchema.validate(req.body);

        if (error) {
            return res.status(400).send({ message: HttpError(400).message });
        }

        // get token
        const authorizationHeader = req.headers.authorization.split(" ");
        const token = authorizationHeader[1];
        const data = jwt.decode(token);

        const user = await User.findById(data.id);
        if (!name) {
            name = user.name
        }

        if (!email) {
            email = user.email
        }
        if (!password) {
            password = user.password
        } else {
            password = await bcrypt.hash(password, 10);
        }

        // update user
        await User.findByIdAndUpdate(
            data.id,
            { email, name, password },
            { new: true }
        );

        res.status(200).send({ email, name, password })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: HttpError(500).message })
    }

}

export default editProfile;