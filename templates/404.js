import AbstractView from "./AbstractView.js";

export default class Notfound extends AbstractView {
    constructor() {
        super();
        this.setTitle("404 Error");
    }
    async getHTML() {
        return `
            <div class="error-container">
                <div class="centerIt">
                    <div class="section">
                        <h1 class="error">404</h1>
                        <div class="page"> 🫤 Oops ! what you are trying to find there !</div>
                        <a class="back-home" href="/" data-link>Back to home</a>
                    </div>
                </div>
            </div>
        `;
    }
    async render() {
        const container = document.getElementById("app");
        container.innerHTML = await this.getHTML();
    }
}
