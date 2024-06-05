import HttpError from "../../helpers/HttpError";
import User from "../../models/authModel";

const changeTheme = async (req, res) => {
    // get token
    const authorizationHeader = req.headers.authorization.split(" ");
    const token = authorizationHeader[1];
    const data = jwt.decode(token);

    const { theme } = req.body;
    try {
        await User.findByIdAndUpdate(
            data.id,
            { theme },
        );

        res.status(200).send({ theme });
    } catch (err) {
        res.status(400).send({ message: HttpError(400).message });
    }
}


export default changeTheme;