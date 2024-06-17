import Jimp from "jimp";
import HttpError from "../../helpers/HttpError.js";
import User from "../../models/authModel.js";
import { v2 as cloudinary } from 'cloudinary';
import { createAvatarSchema } from "../../schemas/usersSchema.js";

const updateAvatar = async (req, res, data) => {
    try {
        const { buffer, mimetype } = req.file;

        // validate
        const { error } = createAvatarSchema.validate(mimetype);

        if (error) {
            return res.status(400).send({ message: HttpError(400, "Wrong format").message });
        }

        // user already have avatar
        const findUser = await User.findById(data.id);
        if (findUser.avatarId) {
            await cloudinary.api.delete_resources([findUser.avatarId], { type: 'upload', resource_type: 'image' });
        }

        // resize image and upload to Cloudinary
        const avatar = await Jimp.read(buffer);
        const resizedBuffer = await new Promise((resolve, reject) => {
            avatar.resize(250, 250).getBuffer(Jimp.MIME_JPEG, (err, resizedBuffer) => {
                if (err) {
                    reject("Error resizing image");
                }
                resolve(resizedBuffer);
            });
        });

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: "avatars" }, (error, result) => {
                if (error) {
                    reject("Upload to Cloudinary failed");
                }
                resolve(result);
            });

            uploadStream.end(resizedBuffer);
        });

        return { avatarURL: result.url, avatarId: result.public_id };
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: HttpError(500).message });
    }
};

export default updateAvatar;
