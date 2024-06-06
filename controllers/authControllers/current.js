import User from "../../models/authModel.js"
import jwt from "jsonwebtoken";

const current = async (req, res) => {
    // errors are catching in authMiddleware.js

    const authorizationHeader = req.headers.authorization.split(" ");
    const token = authorizationHeader[1];

    const data = jwt.decode(token);

    const result = await User.findById(data.id);

    res.status(200).send({ data: { email: result.email } });
}

export default current;