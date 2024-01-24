import { navigateTo } from "../scripts/router.js";
import AbstractView from "./AbstractView.js";

export default class Login extends AbstractView {
    constructor() {
        super();
        this.setTitle("Signin");
    }
    async getHTML() {
        return `
            <h1>Graphql</h1>
            <div style="height: 70vh" class="container d-flex flex-column justify-content-center align-items-center">
                <form id="loginForm" class="login-email">
                    <h1 class="login-text mb-3" class="display-4">Login</h1>
                    <div class="">
                        <input
                            type="text"
                            id="username"
                            class="form-control mb-3"
                            placeholder="Username/Email"
                            name="username"
                            required
                        />
                    </div>
                    <div class="">
                        <input
                            id="password"
                            type="password"
                            class="form-control mb-3"
                            placeholder="Password"
                            name="password"
                            required
                        />
                    </div>
                    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
                        <button name="submit" class="btn btn-light">Login</button>
                    </div>
                </form>
                <div id="errorMessage" class="text-danger mt-3"></div>
            </div>
        `;
    }
    async submitForm() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessageContainer = document.getElementById("errorMessage");

        const credentials = btoa(`${username}:${password}`);

        const headers = new Headers();
        headers.append("Authorization", `Basic ${credentials}`);
        headers.append("Content-Type", "application/json");

        try {
            const response = await fetch("https://learn.zone01dakar.sn/api/auth/signin", {
                method: "POST",
                headers: headers,
            });
            if (!response.ok) {
                const errorData = await response.json();
                errorMessageContainer.textContent = errorData.error;
            } else {
                const responseData = await response.json();
                console.log("JWT: ", responseData);
                sessionStorage.setItem("jwt", responseData);
                errorMessageContainer.textContent = "";
                navigateTo("/profile");
            }
        } catch (error) {
            console.error("Error during login:", error);
            errorMessageContainer.textContent = "An unexpected error occurred.";
        }
    }

    async render() {
        document.title = "Sign In";
        const container = document.getElementById("app");
        container.innerHTML = await this.getHTML();
        document.getElementById("loginForm").addEventListener("submit", (event) => {
            event.preventDefault();
            this.submitForm();
        });
    }
}
