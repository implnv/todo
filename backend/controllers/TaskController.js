import { Task } from "../models/TaskModel.js";

const tasks = (req, res) => {
    const { id } = req.params;

    Task.find({ author: id }, (err, dataTasks) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ tasks: dataTasks });
    });
}

const taskCreate = (req, res) => {
    const { name, description, color, type, author } = req.body;

    Task.create({name, description, color, type, author}, (err, dataTask) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ 'task': dataTask, 'message': 'Задача успешно создана' });
    });
}

const taskMove = (req, res) => {
    const { uid, type } = req.body;

    Task.findByIdAndUpdate({ _id: uid }, { type }, { new: true }, (err, dataTask) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ 'task': dataTask, 'message': 'Задача успешно обновлена' });
    });
}

export { tasks, taskCreate, taskMove }