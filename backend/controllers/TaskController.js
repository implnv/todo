import mongoose from "mongoose";
import { taskSchema } from "../models/TaskModel.js";
import jwt from 'jsonwebtoken';

const { model } = mongoose;
const Task = model('Task', taskSchema);

const getTaskById = (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.body;

    if (!authorization) return res.status(403).json({ status: false, message: 'Пользователь не авторизован' });

    try {
        const token = authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    
        Task.findById(id, (err, r) => {
            if (r && r.author._id !== decodedToken.id) res.status(200).json({ ...r._doc, success: true });
            else res.status(400).json({ success: false, message: err });
        });
    } catch(err) {
        res.status(403).json({ status: false, message: 'Ошибка токена' });
    }
}

 const saveTask = (req, res) => {
    const { name, description, color, author } = req.body;
    const task = new Task({ name, description, color, author });

    task.save().then(r => {
        if (r === task) res.status(200).json({ success: true, message: 'Задача успешно создана' });
        else res.status(400).json({ success: false, message: 'Ошибка сохранения задачи' });
    });
}

export { getTaskById, saveTask }