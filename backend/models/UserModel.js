import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    login: String,
    password: String,
    props: {
        block_1: {
            name: String,
            color: String
        },
        block_2: {
            name: String,
            color: String
        },
        block_3: {
            name: String,
            color: String
        },
        block_4: {
            name: String,
            color: String
        }
    }
});

const User = model('User', userSchema);

export { User }