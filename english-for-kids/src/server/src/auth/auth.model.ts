import mongoose from 'mongoose';

const Login = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.model('Login', Login);
