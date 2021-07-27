export type CategoryType = string[];

export enum Mode {
    TRAIN = 'TRAIN',
    PLAY = 'PLAY',
}

export enum Module {
    MAIN_PAGE = 'MAIN_PAGE ',
    CATEGORY_PAGE = 'CATEGORY_PAGE',
}

export type CardType = {
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
};
export type Cards = CardType[];

export type Store = {
    mode: Mode;
    category: CategoryType;
    cards: Cards[];
};

export interface LoginDto {
    auth: boolean;
    message: string;
}
export enum Endpoints {
   baseUrl = 'https://agile-dawn-75756.herokuapp.com',
   categories ='https://agile-dawn-75756.herokuapp.com/api/categories',
   cards = 'https://agile-dawn-75756.herokuapp.com/api/categories/:catId/cards',
   auth = 'https://agile-dawn-75756.herokuapp.com/auth/login'
}