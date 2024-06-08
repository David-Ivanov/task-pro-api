import Jimp from "jimp";
import HttpError from "../../helpers/HttpError.js";
import User from "../../models/authModel.js"
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises";
import { createAvatarSchema } from "../../schemas/usersSchema.js";


const updateAvatar = async (req, res, data) => {
    // errors are catching in authMiddleware.js

    try {
        const { path, mimetype } = req.file;

        // validate
        const { error } = createAvatarSchema.validate(mimetype);

        if (error) {
            return res.status(400).send({ message: HttpError(400, "Wrong format").message });
        }

        // user already have avatar
        const findUser = await User.findById(data.id);
        if (findUser.avatarId) {
            cloudinary.api.delete_resources([findUser.avatarId],
                { type: 'upload', resource_type: 'image' }
            );
        }


        // change size
        const avatar = await Jimp.read(path);
        avatar.resize(250, 250).write(path);

        const result = await cloudinary.uploader.upload(path, {
            asset_folder: "avatars",
            resource_type: "image"
        });

        await fs.unlink(path);

        return { avatarURL: result.url, avatarId: result.public_id }
    } catch (error) {
        res.status(500).send({ message: HttpError(500).message });
    }
}

export default updateAvatar;