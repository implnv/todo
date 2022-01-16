import mongoose from "mongoose";
import { Task } from "../models/TaskModel.js";

const { model } = mongoose;

const getTaskById = (req, res) => {
    const { id } = req.body;
    const { decodedToken } = req;

    Task.findById(id, (err, r) => {
        const authorId = JSON.stringify(r.author._id).replace(/\"/g, '');

        if (err) return res.status(400).json({ success: false, message: err });
        if (r && authorId === decodedToken.id) res.status(200).json({ success: true, ...r._doc });
    });
}

 const saveTask = (req, res) => {
    const { name, description, color } = req.body;
    const { decodedToken } = req;

    const authorId = decodedToken.id;
    const task = new Task({ name, description, color, author: authorId });
    
    task.save().then(r => {
        if (r === task) res.status(200).json({ success: true, message: 'Задача успешно создана' });
        else res.status(400).json({ success: false, message: 'Ошибка сохранения задачи' });
    });
}

export { getTaskById, saveTask }