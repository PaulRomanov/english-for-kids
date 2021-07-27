import './switch.scss';
import { BaseComponent } from '../base-component';
import { store, getMode } from '../../store/store';
import { Mode } from '../../types/types';

export class Switch extends BaseComponent {
    onClickHandler: (mode: Mode) => void;
    constructor(onClickHandler: (mode: Mode) => void) {
        super('div', ['switch-wrapper']);
        this.element.innerHTML = ` <label class="switch">
        <input type="checkbox" class="switch-input" checked="">
        <span class="switch-span" data-on="Train" data-off="Play"></span>
        <span class="switch-handle"></span>
        </label> 
        `;
        this.onClickHandler = onClickHandler;
        this.event();
    }

    event = (): void => {
        this.element.querySelector('input')?.addEventListener('click', () => {
            store.mode = getMode() === Mode.TRAIN ? Mode.PLAY : Mode.TRAIN;
            this.onClickHandler(store.mode);
        });
    };
}
