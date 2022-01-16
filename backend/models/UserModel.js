import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    login: String,
    password: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

const User = model('User', userSchema);

export { User }