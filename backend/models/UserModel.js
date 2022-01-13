import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    login: String,
    password: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

export { userSchema };