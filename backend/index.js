import dotenv from 'dotenv';
import mongoose from "mongoose";

const result = dotenv.config();
if (result.error) 
    throw result.error;

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { task } from './routes/TaskRoute.js'
import { user } from './routes/UserRoute.js'
import { headerMiddleware } from './middleware/headerMiddleware.js';

const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(headerMiddleware);
app.use(task);
app.use(user);

try {
    await mongoose.connect(process.env.MONGODB_SERVER, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(process.env.SERVER_PORT);
} catch (e) {
    console.error(e);
}