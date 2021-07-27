import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorMessage } from '../helpers/errorMessage';
import categoryRepository from './category.repository';


const { OK, NOT_FOUND, BAD_REQUEST } = StatusCodes;

const router = Router({ mergeParams: true });

router.post('/', async (req: Request, res: Response) => {
    console.log('category create');
    const { catId } = req.params;
    const { body } = req;
    if (!body) {
        res.status(BAD_REQUEST).json(errorMessage(BAD_REQUEST, 'Не переданы параметры категории'));
    }

    const card = await categoryRepository.create(body);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'категория не создана'));
    }
    res.status(OK).json(card);
});

// GET ALL
router.get('/', async (req: Request, res: Response) => {
    const cards = await categoryRepository.getAll();
    if (!cards) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'категории не найдены'));
    }
    res.status(OK).json(cards);
});

// GET one
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const card = await categoryRepository.getOne(id);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'категории не найдены'));
    }
    res.status(OK).json(card);
});

// update
router.put('/:id', async (req: Request, res: Response) => {
    const { catId } = req.params;
    const { body } = req;
    if (!body) {
        res.status(BAD_REQUEST).json(errorMessage(BAD_REQUEST, 'Не переданы параметры категории'));
    }
    const card = await categoryRepository.update(body);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'категория не обновлена'));
    }
    res.status(OK).json(card);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(BAD_REQUEST).json({ message: 'Id не указан' });
    }

    const card = await categoryRepository.remove(id);
    if (!card) {
        res.status(NOT_FOUND).json(errorMessage(NOT_FOUND, 'категория не найдена'));
    }
    res.status(OK).json(card);
});

// router.delete('/:id', cardsRepository.delete);

export default router;

// import { Router } from 'express';
// import  categoryRepository  from './category.repository';
// import { getReasonPhrase, StatusCodes } from 'http-status-codes';
// import { Category } from './category.model';

// const {BAD_REQUEST, NOT_FOUND, OK, CREATED } = StatusCodes

// const router = Router();

// //get all
// router.get('/', async (req, res) => {
//     const categories = await categoryRepository.getAll();
//     res.json(categories);
// });

// //get one
// router.get('/:id', async (req, res) => {
//     const catId = Number(req.params.id);
//     if (!catId) {
//          res.status(BAD_REQUEST).send({
//           error: StatusCodes.BAD_REQUEST,
//           message: `${getReasonPhrase(StatusCodes.BAD_REQUEST)}`,

//         });
//     }
//     const cat = await categoryRepository.getOne(catId);
//     if (!cat) {
//         res.sendStatus(NOT_FOUND);
//     }
//     res.status(OK).send(cat);
// });

// //delete
// router.delete('/:id', async (req, res) => {
//   const categoryId = Number(req.params.id);
//   if (!categoryId) {
//     return res.status(StatusCodes.BAD_REQUEST);
//   }
//   try {
//     await categoryRepository.deleteCategory(categoryId);
//     return res.sendStatus(StatusCodes.OK);
//   } catch (e) {
//     return res.status(StatusCodes.BAD_REQUEST).send(e);
//   }
// });

// //create
// router.post('/', async (req, res) => {
//   const data = req.body as Category;
//   if (!data.id) return res.sendStatus(StatusCodes.BAD_REQUEST);
//   try {
//     const newCategory = await categoryRepository.createCategory(data);
//     return res.json(newCategory);
//   } catch (e) {
//     return res.status(StatusCodes.BAD_REQUEST).send(e);
//   }
// });

// export default router;
