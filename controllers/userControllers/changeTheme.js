import HttpError from "../../helpers/HttpError.js";
import User from "../../models/authModel.js";
import jwt from "jsonwebtoken";

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

    try {
        await User.findByIdAndUpdate(
            data.id,
            { theme },
        );

        res.status(200).send({ data: { theme } });
    } catch (err) {
        res.status(400).send({ message: HttpError(400).message });
    }
}


export default changeTheme;