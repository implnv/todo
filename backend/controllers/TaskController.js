import { Task } from "../models/TaskModel.js";

const tasksGet = (req, res) => {
    const { id } = req.user;

    Task.find({ author: id }, (err, dataTasks) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ tasks: dataTasks });
    });
}

const taskCreate = (req, res) => {
    const { name, description, color, type } = req.body;
    const { id } = req.user;

    Task.create({name, description, color, type, author: id}, (err, dataTask) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ 'task': dataTask, 'message': 'Задача успешно создана' });
    });
}

const taskEdit = (req, res) => {
    const { id, name, description } = req.body;

    Task.findByIdAndUpdate(id, { name, description }, { new: true }, (err, dataTask) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ 'task': dataTask, 'message': 'Задача успешно отредактирована' });
    });
}

const taskDelete = (req, res) => {
    const { id } = req.body;

    Task.findByIdAndDelete(id, (err, dataTasks) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ 'task': dataTasks, 'message': 'Задача успешно удалена' });
    });
}

const taskMove = (req, res) => {
    const { id, type } = req.body;

    Task.findByIdAndUpdate(id, { type }, { new: true }, (err, dataTask) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        return res.status(200).json({ 'task': dataTask, 'message': 'Задача успешно обновлена' });
    });
}

export { tasksGet, taskCreate, taskEdit, taskDelete, taskMove }