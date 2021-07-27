import './popUpLogin.scss';
import { BaseComponent } from '../base-component';

export class PopUpLogin extends BaseComponent {
    constructor() {
        super('div', ['popUpLogin-wrapper']);

        this.render();
    }

    render(): void {
        this.element.innerHTML = PopUpLogin.html();
    }

    static html(): string {
        return `
        <div class="login-form hidden">
          <form action="">
          <div class="login-title">Login</div>
          <input class="login-input" type="text" id="log-input" placeholder="login" required minlength="1">
          <br>
          <input class="login-input" type="password" id="pass-input" placeholder="password" required minlength="1">
          <br>
          <div class="btn-popUp-wrapper">
          <button class="btn-popUp-cancel" type="submit">Cancel</button>
          <button class="btn-popUp-login" type="submit">Login</button>
          </div>
          </form>
        </div>
        <div class = "hidden-login hidden-popUp"></div>
        `;
    }
}
