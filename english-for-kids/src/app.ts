import { Wrapper } from './components/wrapper/wrapper';
import { Burger } from './components/burger/burger';
import { Menu } from './components/menu/menu';
import { MainPage } from './modules/mainPage/mainPage';
import { Switch } from './components/switch/switch';
import { store } from './store/store';
import { Footer } from './components/footer/footer';
import { Categories } from './modules/categories/categories';
import { Mode, Module, LoginDto } from './types/types';
import { Stars } from './components/stars/stars';
import { GameModule } from './modules/gameModule/gameModule';
import { PopUpLogin } from './components/popUpLogin/popUpLogin';
import { AdminPage } from './modules/adminPage/adminPage';
import { AdminPageWord } from './modules/adminPageWord/adminPageWord';
import { Endpoints } from "./types/types";

export class App {
    private auth: boolean;
    private adminPageWord: AdminPageWord;
    private adminPage: AdminPage;
    private popUpLogin: PopUpLogin;
    private readonly wrapper: Wrapper;
    private readonly burger: Burger;
    private readonly menu: Menu;
    private readonly mainPage: MainPage;
    private readonly switch: Switch;
    private category: Categories | GameModule;
    private readonly footer: Footer;
    categoryIdx: number;
    private readonly stars: Stars;
    private currentModule: Module;
    constructor(private rootElement: HTMLElement) {
        this.auth = false;
        this.adminPageWord = new AdminPageWord();
        this.adminPage = new AdminPage();
        this.currentModule = Module.MAIN_PAGE;
        this.popUpLogin = new PopUpLogin();
        this.wrapper = new Wrapper();
        this.burger = new Burger();
        this.menu = new Menu(this.setCategory, this.setCurrentModule, this.setCategoryModule);
        const categoryList = store.category;
        this.category = new Categories();
        this.footer = new Footer();
        const categoryImages = store.cards.map((_, idx) => {
            return store.cards[idx][0].image;
        });
        this.categoryIdx = 0;
        this.mainPage = new MainPage(
            categoryList,
            categoryImages,
            this.setCategory,
            this.setCurrentModule,
            this.setCategoryModule,
        );
        this.switch = new Switch(this.switchMode);
        this.stars = new Stars();

        this.rootElement.append(
            this.burger.element,
            this.menu.element,
            this.switch.element,
            this.stars.element,
            this.wrapper.element,
            this.footer.element,
            this.popUpLogin.element,
            this.adminPage.element,
            this.adminPageWord.element,
        );
        this.wrapper.element.append(this.mainPage.element);
        this.mainPage.render();
        // убираю при загрузке приложения с главной страницы
        this.stars.element.remove();

        // обработчик на бургер, меню и крестик
        const burgerItem = document.querySelector('.burger-btn');
        const menu = document.querySelector('.burger-menu');
        const cover = document.querySelector('.menu-close');
        const menuCloseItem = document.querySelector('.burger-btn-close');
        burgerItem?.addEventListener('click', () => {
            menu?.classList.toggle('burger-menu-active');
            cover?.classList.remove('hidden');
        });
        menuCloseItem?.addEventListener('click', () => {
            menu?.classList.toggle('burger-menu-active');
            cover?.classList.add('hidden');
        });
        cover?.addEventListener('click', () => {
            menu?.classList.remove('burger-menu-active');
            cover?.classList.add('hidden');
        });

        // обработчик на кнопку login
        const btnLoginMenu = document.querySelector('.btn-login');
        const loginForm = document.querySelector('.login-form');
        const formElem = document.querySelector('.hidden-login');

        btnLoginMenu?.addEventListener('click', () => {
            formElem?.classList.remove('hidden-popUp');
            loginForm?.classList.remove('hidden');
        });

        const btnCancel = document.querySelector('.btn-popUp-cancel');
        btnCancel?.addEventListener('click', () => {
            formElem?.classList.add('hidden-popUp');
            loginForm?.classList.add('hidden');
            cover?.classList.add('hidden');
            menu?.classList.toggle('burger-menu-active');

            (<HTMLInputElement>document.getElementById('log-input')).value = '';
            (<HTMLInputElement>document.getElementById('pass-input')).value = '';
        });

        // нажатие на login переход в админ панель
        const valueLogin = document.getElementById('log-input') as HTMLInputElement;
        const valuePass = document.getElementById('pass-input') as HTMLInputElement;
        const btnLogIn = document.querySelector('.btn-popUp-login');
        btnLogIn?.addEventListener('click', async (event) => {
            event.preventDefault();
            const login = valueLogin.value;
            const password = valuePass.value;
            try {
                if (!login || !password) {
                    this.auth = false;
                    // console.log('Нужно ввести логин и пароль');
                    return;
                }
                // var flag = false;
                // const auth: LoginDto = await fetch('http://localhost:5000/auth/login', {
                const auth: LoginDto = await fetch(Endpoints.auth, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ login, password }),
                }).then((res) => res.json());

                if (auth && !auth.auth) {
                    // console.log('Пользователь с таким логином/паролем не найден');
                    return;
                }
                this.auth = true;

                // console.log('Пользователь залогинен');

                // переход в админ страницу
                formElem?.classList.add('hidden-popUp');
                loginForm?.classList.add('hidden');
                cover?.classList.add('hidden');
                menu?.classList.toggle('burger-menu-active');
                document.querySelector('.admin-page-wrapper')?.classList.remove('hidden-conteiner');
            } catch (error) {
                // console.log(error);
            }
        });

        // события в ADMIN PAGE
        // нажатие на Words
        const btnWordsAdminPage = document.querySelector('.admin-page-link-wrapper-words');
        btnWordsAdminPage?.addEventListener('click', () => {
            document.querySelector('.admin-page-wrapper')?.classList.add('hidden-conteiner');
            document.querySelector('.admin-page-words-wrapper')?.classList.remove('hidden-admin-page-words-wrapper');
        });
        // нажатие на Categories
        document.querySelector('.admin-page-link-wrapper-categories')?.addEventListener('click', () => {
            document.querySelector('.admin-page-wrapper')?.classList.remove('hidden-conteiner');
            document.querySelector('.admin-page-words-wrapper')?.classList.add('hidden-admin-page-words-wrapper');
        });

        // нажатие на Log out
        document.querySelector('.admin-page-words-logOug')?.addEventListener('click', () => {
            document.querySelector('.admin-page-words-wrapper')?.classList.add('hidden-admin-page-words-wrapper');
        });
        document.querySelector('.admin-page-categories-logOug')?.addEventListener('click', () => {
            document.querySelector('.admin-page-wrapper')?.classList.add('hidden-conteiner');
        });

        // обработчик на Switch
        const switchMode = document.querySelector('.switch-input');
        const card = document.querySelectorAll('.card');
        switchMode?.addEventListener('click', () => {
            menu?.classList.toggle('menu-play');
            card.forEach(function pipirka(elem) {
                elem.classList.toggle('card--play');
                store.mode = store.mode === Mode.PLAY ? Mode.TRAIN : Mode.PLAY;
            });
        });
    }

    switchMode = (mode: Mode): void => {
        if (this.currentModule === Module.CATEGORY_PAGE) {
            const cardAll = this.category.element.querySelectorAll('.card');
            // внутри switch добавляем кнопку и меняем карточки
            if (mode === Mode.PLAY) {
                this.setCategoryModule(Mode.PLAY);
                this.setCategory(this.categoryIdx);
                cardAll.forEach((elem) => {
                    elem.querySelector('.card-header')?.classList.add('hidden');
                    elem.querySelector('.rotate')?.classList.add('hidden');
                    elem.querySelector('.front')?.classList.add('card-cover');
                });
            } else if (mode === Mode.TRAIN) {
                this.setCategoryModule(Mode.TRAIN);
                // создаем и категорию и устанавливаем категорию равную this.categoryIdx
                this.setCategory(this.categoryIdx);
                // убираем класс "круглой" кнопки
                this.stars.element.remove();
                cardAll.forEach((elem) => {
                    elem.querySelector('.card-header')?.classList.remove('hidden');
                    elem.querySelector('.rotate')?.classList.remove('hidden');
                    elem.querySelector('.front')?.classList.remove('card-cover');
                });

                // удаляем из категорий кнопку
                document.querySelector('.btn-container')?.remove();
                // удаляем из категорий звездочки
                document.querySelector('.wrapper-stars')?.remove();
            }
        }
    };

    setCategoryModule = (mode: Mode): void => {
        if (mode === Mode.PLAY) {
            this.category = new GameModule();
        } else {
            this.category = new Categories();
        }
    };

    setCurrentModule = (module: Module): void => {
        this.currentModule = module;
    };

    setCategory = (idx: number): void => {
        this.categoryIdx = idx;
        if (idx === -1) {
            this.wrapper.element.innerHTML = '';
            this.wrapper.element.append(this.mainPage.element);
            document.querySelector('.burger-menu')?.classList.remove('burger-menu-active');
            document.querySelector('.menu-close')?.classList.add('hidden');
            this.stars.element.remove();
        } else {
            this.category.card = store.cards[idx];
            this.wrapper.element.innerHTML = '';
            this.wrapper.element.append(this.category.element);
        }
    };
}
