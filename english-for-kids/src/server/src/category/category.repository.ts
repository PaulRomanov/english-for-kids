import categoryRepo from './category.model';
import { СategoryDto } from './categoryDto';

async function create(card: СategoryDto): Promise<СategoryDto | undefined> {
    try {
        return await categoryRepo.create(card);
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getAll(): Promise<Array<СategoryDto> | undefined> {
    try {
        return categoryRepo.find();
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getOne(id: string): Promise<СategoryDto | undefined> {
    try {
        return categoryRepo.findOne({ id });
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function update(card: СategoryDto): Promise<СategoryDto | undefined> {
    try {
        return categoryRepo.update(card);
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function remove(id: string): Promise<СategoryDto | undefined> {
    try {
        return categoryRepo.findByIdAndDelete(id);
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
