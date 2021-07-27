import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorMessage } from '../helpers/errorMessage';
import cardsRepository from './cards.repository';

const { OK, NOT_FOUND, BAD_REQUEST } = StatusCodes;

const router = Router({ mergeParams: true });

router.post('/', async (req: Request, res: Response) => {
    console.log('card create');
    const { catId } = req.params;
    const { body } = req;
    if (!body) {
        res.status(BAD_REQUEST).json(errorMessage(BAD_REQUEST, 'Не переданы параметры карточки'));
    }

    const card = await cardsRepository.create(body);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'Карточка не создана'));
    }
    res.status(OK).json(card);
});

// GET ALL
router.get('/', async (req: Request, res: Response) => {
    const cards = await cardsRepository.getAll();
    if (!cards) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'Карточки не найдены'));
    }
    res.status(OK).json(cards);
});

// GET one
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const card = await cardsRepository.getOne(id);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'Карточки не найдены'));
    }
    res.status(OK).json(card);
});


// update
router.put('/:id', async (req: Request, res: Response) => {
    const { catId } = req.params;
    const { body } = req;
    if (!body) {
        res.status(BAD_REQUEST).json(errorMessage(BAD_REQUEST, 'Не переданы параметры карточки'));
    }
    const card = await cardsRepository.update(body);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'Карточка не обновлена'));
    }
    res.status(OK).json(card);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(BAD_REQUEST).json({ message: 'Id не указан' });
    }

    const card = await cardsRepository.remove(id);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'Карточка не найдена'));
    }
    res.status(OK).json(card);
});

// router.delete('/:id', cardsRepository.delete);

export default router;
