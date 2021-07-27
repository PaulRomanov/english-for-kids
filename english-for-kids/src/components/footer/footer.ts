import './footer.scss';
import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
    constructor() {
        super('div', ['footer-wrapper']);
        this.render();
    }

    render(): void {
        this.element.innerHTML = Footer.html();
    }

    static html(): string {
        return `
        <div class="footer">
        <div class = "git">
        <a href="https://github.com/PaulRomanov" style="color: aqua;">My github!</a>
        </div>
        <div class = "year" style="color: aqua;">2021</div>
        <div class = "rsschool">
        <a id="rsSchoolId" href="https://rs.school/js/">
        <img src="https://rs.school/images/rs_school_js.svg" alt="RsSchool Logo" width="50" height="60">
        </a>
        </div>
        
        </div>

           `;
    }
}
