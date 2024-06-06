import Jimp from "jimp";
import HttpError from "../../helpers/HttpError.js";
import User from "../../models/authModel.js"
import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import { v2 as cloudinary } from 'cloudinary';


const updateAvatar = async (req, res) => {
    // errors are catching in authMiddleware.js

    try {
        // get token
        const authorizationHeader = req.headers.authorization.split(" ");
        const token = authorizationHeader[1];
        const data = jwt.decode(token);

        // user already have avatar
        const findUser = await User.findById(data.id);
        if (findUser.avatarId) {
            cloudinary.api.delete_resources([findUser.avatarId],
                { type: 'upload', resource_type: 'image' }
            );
        }

        const { path: tempPath } = req.file;

        // change size
        const avatar = await Jimp.read(tempPath);
        avatar.resize(250, 250).write(tempPath);

        const result = await cloudinary.uploader.upload(tempPath, {
            asset_folder: "avatars",
            resource_type: "image"
        });

        await fs.unlink(tempPath);

        const user = await User.findByIdAndUpdate(
            data.id,
            {
                avatarURL: result.url,
                avatarId: result.public_id,
            },
            { new: true }
        );

        res.status(200).send({ data: { avatarURL: user.avatarURL } });
    } catch (error) {
        res.status(500).send({ message: HttpError(500).message });
    }
}

export default updateAvatar;