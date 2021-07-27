import mongoose from 'mongoose';

const Category = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
});

export default mongoose.model('Category', Category);
