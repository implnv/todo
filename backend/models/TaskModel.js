import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema({
    name: String,
    description: String,
    color: String,
    type: String,
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Task = model('Task', taskSchema)

export { Task }