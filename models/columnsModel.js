import { Schema, model } from 'mongoose';

const board = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'board',
        },
    },
    { versionKey: false }
);

const Board = model('contact', board);
export default Board;