import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorMessage } from '../helpers/errorMessage';
import loginRepo from './auth.repository';

const { OK, NOT_FOUND, BAD_REQUEST } = StatusCodes;

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log('/login');

    const { login, password } = req.body;
    console.log(login, password);

    if (!login || !password) {
        res.status(BAD_REQUEST).json(errorMessage(BAD_REQUEST, 'Не передан логин или пароль'));
    }

    const user = await loginRepo.getOne(login, password);
    if (!user) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'Пользователь с такими данными не найден'));
    } else {
        res.status(OK).json({ auth: true, message: 'Пользователь авторизован.' });
    }
});

export default router;
