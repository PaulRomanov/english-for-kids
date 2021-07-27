import mongoose from 'mongoose';

const Cards = new mongoose.Schema({
    cardId: { type: String, required: true },
    word: { type: String, required: true },
    translation: { type: String, required: true },
    image: { type: String, required: true },
    audioSrc: { type: String, required: true },
});

export default mongoose.model('Cards', Cards);
