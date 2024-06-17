import User from "../../models/authModel.js";
import { createEditSchema } from "../../schemas/usersSchema.js";
import HttpError from "../../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import updateAvatar from "./updateAvatar.js";

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
        if (!name || name === "") {
            name = user.name;
        }
        if (!email || email === "") {
            email = user.email;
        }
        if (!password || password === "") {
            password = user.password;
        } else {
            password = await bcrypt.hash(password, 10);
        }

        // update avatar
        let result = {
            avatarURL: user.avatarURL,
            avatarId: user.avatarId,
        };
        if (req.file) {
            const imageOnCloud = await updateAvatar(req, res, data);
            result = {
                avatarId: imageOnCloud.avatarId,
                avatarURL: imageOnCloud.avatarURL,
            };
        }

        // update user
        const updatedUser = await User.findByIdAndUpdate(
            data.id,
            {
                email,
                name,
                password,
                avatarURL: result.avatarURL,
                avatarId: result.avatarId,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).send({ message: "This email already in use" });
        }

        res.status(200).send({ email, name, avatarURL: result.avatarURL });
    } catch (err) {
        res.status(400).send({ message: "This email already in use" });
    }
};

export default editProfile;
