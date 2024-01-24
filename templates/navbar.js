export default class Navbar {
    constructor() {}
    async getHTML() {
        return `
        <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" width="30" height="30" class="d-inline-block align-top" alt="">
          Graphql
        </a>
        <a class="nav-link" href="#">Logout</a>
      </nav>
        `;
    }

    async render() {
        const navbarContainer = document.getElementById("nav");
        navbarContainer.innerHTML = await this.getHTML();
    }
}
