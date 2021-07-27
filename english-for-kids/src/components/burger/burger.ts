import './burger.scss';
import { BaseComponent } from '../base-component';

export class Burger extends BaseComponent {
    constructor() {
        super('div', ['burger-btn']);
        this.init();
    }

    init(): void {
        this.element.innerHTML = Burger.html();
    }

    static html(): string {
        return `
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
        `;
    }
}
