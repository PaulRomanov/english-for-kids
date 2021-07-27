import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import categoriesRouter from './category/category.router';
import cardsRouter from './cards/cards.router';
import loginRouter from './auth/auth.router';

const DB_URL = 'mongodb+srv://user:user@cluster0.i03ef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', loginRouter);
app.use('/api/categories/:catId/cards', cardsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/', async (req, res) => {
    res.json({ message: 'Server is running!' });
});
const port = process.env.PORT || 5000
async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(port, () => console.log('server started on 5000'));
    } catch (e) {
        console.log(e);
    }
}

startApp();
