import Jimp from "jimp";
import HttpError from "../../helpers/HttpError.js";
import User from "../../models/authModel.js"
import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import path from "node:path";

const updateAvatar = async (req, res) => {
    // errors are catching in authMiddleware.js

    try {
        const { path: tempPath, filename } = req.file;
        const newPath = path.resolve(`public/avatars/${filename}`);

        // change size

        const avatar = await Jimp.read(tempPath);
        avatar.resize(250, 250).write(tempPath);

        await fs.rename(tempPath, newPath);

        const authorizationHeader = req.headers.authorization.split(" ");
        const token = authorizationHeader[1];
        const data = jwt.decode(token);

        const user = await User.findByIdAndUpdate(
            data.id,
            { avatarURL: newPath },
            { new: true }
        );

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: HttpError(500).message });
    }
}

export default updateAvatar;