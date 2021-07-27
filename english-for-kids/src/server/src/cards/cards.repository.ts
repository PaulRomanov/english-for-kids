import { CardDto } from './cardDto';
import cardRepo from './cards.model';
// import { StatusCodes } from 'http-status-codes';

// const { BAD_REQUEST, NOT_FOUND, OK, CREATED, INTERNAL_SERVER_ERROR } = StatusCodes;
async function create(card: CardDto): Promise<CardDto | undefined> {
    try {
        return await cardRepo.create(card);
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getAll(): Promise<Array<CardDto> | undefined> {
    try {
        return cardRepo.find();
    } catch (error) {
        console.log(error);
    }
    return undefined;
}


async function getOne(id: string): Promise<CardDto | undefined> {
  try {
      const card = cardRepo.findOne({ _id: id });
      return card
  } catch (error) {
      console.log(error);
  }
  return undefined;
}
async function update(card: CardDto): Promise<CardDto | undefined> {
    try {
        return cardRepo.update(card);
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function remove(id: string): Promise<CardDto | undefined> {
    try {
        //  await cardRepo.deleteOne(id);
        return cardRepo.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
};
