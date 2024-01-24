const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

export const navigateTo = (url) => {
    window.history.pushState({}, "", url);
    handleLocation();
};

const routes = {
    404: "../templates/404.js",
    "/": "../templates/login.js",
    "/profile": "../templates/profile.js",
    "/toto": "../templates/niangoos.js",
};

const pageInstancesCache = {};

const handleLocation = async () => {
    const path = window.location.pathname;
    console.log(path);
    const routePath = routes[path] || routes[404];

    try {
        let pageInstance = pageInstancesCache[routePath];

        if (!pageInstance) {
            const { default: PageClass } = await import(routePath);
            pageInstance = new PageClass();
            pageInstancesCache[routePath] = pageInstance;
        }

        await pageInstance.render();
    } catch (error) {
        console.error("Error loading module:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            route(e);
        } else if (e.target.closest("[data-link]")) {
            route(e.target.closest("[data-link]"));
        }
    });
});

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
