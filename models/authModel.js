import { Schema, model } from "mongoose";

const user = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        avatarURL: String,
        theme: {
            type: String,
            enum: ["light", "dark", "violet"],
            default: "dark"
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false }
);

const User = model('user', user);

export default User;