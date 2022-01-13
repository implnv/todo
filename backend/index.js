import dotenv from 'dotenv';
import mongoose from "mongoose";

const result = dotenv.config();
if (result.error) 
    throw result.error;

import express from 'express';
import bodyParser from 'body-parser';
import { task } from './routes/TaskRoute.js'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(task);

try {
    await mongoose.connect(process.env.MONGODB_SERVER);
    app.listen(process.env.SERVER_PORT);
} catch (e) {
    console.error(e);
}