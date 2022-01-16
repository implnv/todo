import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refresh: String
});

const Token = model('Token', tokenSchema);

export { Token }