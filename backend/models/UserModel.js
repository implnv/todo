import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    login: String,
    password: Number,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

export { userSchema };