import './menu.scss';
import { BaseComponent } from '../base-component';
import { Mode, Module } from '../../types/types';
import { getMode } from '../../store/store';

export class Menu extends BaseComponent {
    setCategory!: (idx: number) => void;
    setCurrentModule: (module: Module) => void;
    setCategoryModule: (mode: Mode) => void;
    constructor(
        setCategory: (idx: number) => void,
        setCurrentModule: (module: Module) => void,
        setCategoryModule: (mode: Mode) => void,
    ) {
        super('div', ['burger-menu']);
        this.setCategory = setCategory;
        this.setCurrentModule = setCurrentModule;
        this.setCategoryModule = setCategoryModule;
        // this.event();
        this.render();
    }

    render(): void {
        this.element.innerHTML = Menu.html();
        this.event();
    }

    static html(): string {
        return `
        <div class="burger-btn-close">
        <span class="line-close"></span>
        <span class="line-close"></span>
       </div>
       <nav class="menu">
         <a class="menu-item active-item" href="#" id="idCard--1">
         <img src="assets/img/main-side.png" alt="main_side">
         Main Page
         </a>
         <a class="menu-item" href="#" id="idCard-0">
         <img src="assets/img/action1.png" alt="action">
         Action (set A)
         </a>
         <a class="menu-item" href="#" id="idCard-1">
         <img src="assets/img/action2.png" alt="action">
         Action (set B)
         </a>
         <a class="menu-item"  href="#" id="idCard-2">
         <img src="assets/img/action3.png" alt="action">
         Action (set C)
         </a>
         <a class="menu-item"  href="#" id="idCard-3">
         <img src="assets/img/adective.png" alt="Adjective">
         Adjective
         </a>
         <a class="menu-item"  href="#" id="idCard-4">
         <img src="assets/img/animals1.png" alt="Animal">
         Animal (set A)
         </a>
         <a class="menu-item"  href="#" id="idCard-5">
         <img src="assets/img/animals2.png" alt="Animal">
         Animal (set B)
         </a>
         <a class="menu-item" href="#" id="idCard-6">
         <img src="assets/img/clothes.png" alt="Clothes">
         Clothes
         </a>
         <a class="menu-item" href="#" id="idCard-7">
         <img src="assets/img/emotions2.png" alt="Emotion">
         Emotion
         </a>
       </nav>
       <button class="btn-login">Login</button>
       <div class="menu-close hidden"></div>
        `;
    }

    event(): void {
        this.element.querySelector('.menu')?.addEventListener('click', (e) => {
            // убирает класс active-item со всех эл-тов nav
            this.element.querySelectorAll('.menu > a').forEach((element) => {
                element.classList.remove('active-item');
            });

            // переключение категорий по айди
            const target = e.target as HTMLElement;
            if (target) {
                const id: number = +target.id.replace('idCard-', '');
                if (id === -1) {
                    this.setCurrentModule(Module.MAIN_PAGE);
                } else {
                    this.setCurrentModule(Module.CATEGORY_PAGE);
                }
                const mode = getMode();
                if (mode === Mode.TRAIN) {
                    this.setCategoryModule(Mode.TRAIN);
                } else {
                    this.setCategoryModule(Mode.PLAY);
                }
                this.setCategory(id);
            }
            // навешивает класс active-item
            target.classList.toggle('active-item');
            this.element.classList.remove('burger-menu-active');
            this.element.querySelector('.menu-close')?.classList.add('hidden');
        });
    }
}
