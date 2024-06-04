import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../models/authModel.js";

export default async function auth(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).send({ message: HttpError(401).message });
    }

    const arrayOfAuthorizationHeader = authorizationHeader.split(" ");
    const token = arrayOfAuthorizationHeader[1];


    try {
        const decodedToken = jwt.decode(token);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).send({ message: HttpError(401).message });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).send({ message: HttpError(401).message });
    }

}   