import User from "../../models/authModel.js"
import jwt from "jsonwebtoken";

const logout = async (req, res) => {
    // errors are catching in authMiddleware.js
    const authorizationHeader = req.headers.authorization.split(" ");
    const token = authorizationHeader[1];

    const data = jwt.decode(token);

    await User.findByIdAndUpdate(data.id, { token: null });

    res.status(204).end()
}

export default logout;