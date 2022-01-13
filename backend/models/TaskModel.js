import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: String,
    description: String,
    color: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

export { taskSchema };