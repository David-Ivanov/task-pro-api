import HttpError from "../../helpers/HttpError.js";
import User from "../../models/authModel.js";
import jwt from "jsonwebtoken";

const defaultAvatars = ["https://res.cloudinary.com/daqlrgzqj/image/upload/v1717842331/avatars/whiteUser.png", "https://res.cloudinary.com/daqlrgzqj/image/upload/v1717842331/avatars/violetUser.png", "https://res.cloudinary.com/daqlrgzqj/image/upload/v1717842472/avatars/darkUser.png"];

const changeTheme = async (req, res) => {
    // get token
    const authorizationHeader = req.headers.authorization.split(" ");
    const token = authorizationHeader[1];
    const data = jwt.decode(token);

    const { theme } = req.body;

    // validate
    if (theme !== "light" && theme !== "dark" && theme !== "violet") {
        return res.status(400).send({ message: HttpError(400).message });
    }

    // change avatar
    const user = await User.findById(data.id);
    let avatar = user.avatarURL
    try {
        const isDefaultAvatar = defaultAvatars.some(avatar => avatar === user.avatarURL);

        if (isDefaultAvatar) {
            switch (theme) {
                case "light":
                    avatar = defaultAvatars[0];
                    break;
                case "violet":
                    avatar = defaultAvatars[1];
                    break;
                case "dark":
                    avatar = defaultAvatars[2];
                    break;
            }
        }
    } catch (err) {
        res.status(500).send({ message: HttpError(500).message });
    }

    try {
        await User.findByIdAndUpdate(
            data.id,
            { theme, avatarURL: avatar },
        );

        res.status(200).send({ data: { theme, avatarURL: avatar } });
    } catch (err) {
        res.status(400).send({ message: HttpError(400).message });
    }
}


export default changeTheme;