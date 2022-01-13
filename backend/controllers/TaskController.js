import mongoose from "mongoose";
import { taskSchema } from "../models/TaskModel.js";

const { model } = mongoose;
const Task = model('Task', taskSchema);

const getTaskById = (req, res, next) => {
    Task.findById(req.body.id, (err, r) => {
        if (r) res.send({...r._doc, success: true });
        else res.send({ success: false });
    });
}

async function saveTask(req, res, next) {
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        author: req.body.author
    });

    await task.save().then(r => {
        if (r === task) res.send({ success: true });
        else res.send({ success: false });
    });
}

export { getTaskById, saveTask }