import loginRepo from './auth.model';
import { UserDto } from './user.dto';

async function getOne(login: string, password: string): Promise<UserDto | undefined> {
    try {
        return loginRepo.findOne({ login, password });
    } catch (e) {
        console.log(e);
    }
    return undefined;
}

export default {
    getOne,
};
