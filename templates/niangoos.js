import AbstractView from "./AbstractView.js";
import { navigateTo } from "../js/router.js";
import * as func from "../js/functions.js";

export default class Profile extends AbstractView {
    constructor() {
        super();
        this.setTitle("Profile");
    }

    async getHTML() {
        return `
			<div class="container-fluid position-relative d-flex p-0">
				<!-- Sidebar Start -->
				<div class="sidebar pe-4 pb-3">
					<nav class="navbar bg-secondary navbar-dark">
						<a href="/profile" data-link class="navbar-brand mx-4 mb-3">
							<h3 class="text-primary logo"><i class="fa fa-user-edit me-2"></i>Graphiql</h3>
						</a>
						<div class="navbar-nav w-100" id="whois">
						</div>
					</nav>
				</div>
				<!-- Sidebar End -->

				<!-- Content Start -->
				<div class="content">
					<!-- Navbar Start -->
					<nav class="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
						<svg id="toggler" xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 448 512">
							<path
								fill="#9969ff"
								d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352m0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96M432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16m0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16"
							/>
						</svg>
						<div class="navbar-nav align-items-center ms-auto">
							<div class="nav-item dropdown">
								<a onclick="logout()" class="logout" data-bs-toggle="dropdown">
									<svg width="29px" viewBox="0 0 130 130">
										<path
											fill="none"
											stroke="#9969ff"
											stroke-width="7px"
											d="M85 21.81a51.5 51.5 0 1 1-39.4-.34M64.5 10v51.66"
											style="transition: stroke 0.2s ease-out 0s, opacity 0.2s ease-out 0s;"
										></path>
									</svg>
								</a>
							</div>
						</div>
					</nav>
					<!-- Navbar End -->
					<!-- Sale & Revenue Start -->
					<div class="container-fluid pt-4 px-4">
						<div class="row g-4">
							<div class="col-sm-6 col-xl-3">
								<div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
										<path
											fill="#9969ff"
											d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16m-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352"
										/>
									</svg>
									<div class="ms-3">
										<p class="mb-2">XP Amount</p>
										<h6 id="xpamount" class="mb-0"></h6>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-xl-3">
								<div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 320 512">
										<path
											fill="#9969ff"
											d="M313.553 119.669L209.587 7.666c-9.485-10.214-25.676-10.229-35.174 0L70.438 119.669C56.232 134.969 67.062 160 88.025 160H152v272H68.024a11.996 11.996 0 0 0-8.485 3.515l-56 56C-4.021 499.074 1.333 512 12.024 512H208c13.255 0 24-10.745 24-24V160h63.966c20.878 0 31.851-24.969 17.587-40.331"
										/>
									</svg>
									<div class="ms-3">
										<p class="mb-2">Level</p>
										<h6 id="level" class="mb-0"></h6>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-xl-3">
								<div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
										<path
											fill="#9969ff"
											fill-rule="evenodd"
											d="M6 0h3.5a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-.854.354L8.104 3.31L2.207 9.207A1 1 0 0 1 .793 7.793l5.896-5.897L5.646.854A.5.5 0 0 1 6 0m7.207 6.207a1 1 0 0 0-1.414-1.414l-5.897 5.896l-1.042-1.043A.5.5 0 0 0 4 10v3.5a.5.5 0 0 0 .5.5H8a.5.5 0 0 0 .354-.854L7.31 12.104l5.896-5.897Z"
											clip-rule="evenodd"
										/>
									</svg>
									<div class="ms-3">
										<p class="mb-2">Audit Ratio</p>
										<h6 id="auditratio" class="mb-0">$1234</h6>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="container-fluid pt-4 px-4">
						<div class="row g-4">
							<div class="col-sm-12 col-xl-6">
								<div class="bg-secondary text-center rounded p-4">
									<div class="d-flex align-items-center justify-content-between mb-4">
										<h6 class="mb-0 titlepro">XP earned by project</h6>
									</div>
									<div id="xpByprojectchart">
										<div id="tooltip"></div>
										<svg id="barChart" width="500" height="500"></svg>
									</div>
								</div>
							</div>
							<div class="col-sm-12 col-xl-6">
								<div class="bg-secondary text-center rounded p-4">
									<div class="d-flex align-items-center justify-content-between mb-4">
										<h6 class="mb-0 titlepro">All yours skills</h6>
									</div>
									<div id="xpByprojectchart">
										<div id="tooltippie"></div>
										<svg id="skillsChart" width="500" height="500"></svg>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Sales Chart End -->
					<br />
					<br />
					<br />
				</div>

				<!-- Content End -->
			</div>
		`;
    }

    async render() {
        func.makestyle("/static/css/profile.css");

        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            console.log("Go to connect first");
            navigateTo("/");
            return;
        }

        document.setTitle = "Profile";
        const container = document.getElementById("app");
        container.innerHTML = await this.getHTML();

        document.getElementById("toggler").addEventListener("click", function () {
            document.querySelector(".sidebar").classList.toggle("open");
            document.querySelector(".content").classList.toggle("open");
        });

        try {
            const response = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: GET_USER_PROFILE,
                }),
            });

            if (!response.ok) {
                console.error("Erreur de requête GraphQL:", response.status);
                return;
            }

            const responseData = await response.json();

            document.getElementById("xpamount").innerText = func.formatBytes(
                responseData.data.event_user[0].user.XPamount.aggregate.sum.amount
            );
            document.getElementById("level").innerText = responseData.data.event_user[0].level;
            document.getElementById("auditratio").innerText = parseFloat(
                responseData.data.event_user[0].user.auditRatio.toFixed(1)
            );

            const dataObject = {};

            for (const iterator of responseData.data.event_user[0].user.xpByProject) {
                dataObject[iterator.object.name] = iterator.amount;
            }
            console.log(dataObject);

            createBarChart(dataObject, "barChart");
            createPieChart(responseData.data.event_user[0].user.skill);
            document.getElementById("whois").innerHTML = `
				<div class="mb-0">
					<img src="/static/assets/wave.gif" style="width: 100px; height: auto; border-radius: 50%;" />
				</div>
				<br />
				<h6 class="mb-0">${responseData.data.event_user[0].user.firstName} ${responseData.data.event_user[0].user.lastName}</h6>
				<br />
				<h6 class="mb-0">alias ${responseData.data.event_user[0].user.login}</h6>
				<br />
				<h6 class="mb-0">${afficherMoisEtJour(responseData.data.event_user[0].user.attrs.dateOfBirth)}</h6>
				<br />
				<h6 class="mb-0">${responseData.data.event_user[0].user.attrs.nationality1}</h6>
				<br />
				<h6 class="mb-0">${responseData.data.event_user[0].user.attrs.gender}</h6>
			`;
        } catch (error) {
            console.error("Erreur lors de la requête GraphQL:", error);
            logout();
            return;
        }

        window.logout = logout;
    }
}

function createPieChart(skills) {
    var totalAmount = skills.reduce((sum, skill) => sum + skill.amount, 0);

    var svg = document.getElementById("skillsChart");

    var centerX = 260;
    var centerY = 260;

    var radius = 200;

    var startAngle = 0;

    skills.forEach((skill) => {
        var angle = (skill.amount / totalAmount) * 360;
        var percent = (skill.amount / totalAmount) * 100;

        var x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
        var y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);

        startAngle += angle;

        var x2 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
        var y2 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);

        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute(
            "d",
            `M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${x2},${y2} Z`
        );
        path.setAttribute("stroke", "black");
        path.setAttribute("stroke-width", "1.7");
        path.setAttribute("stroke-opacity", "0.5");
        path.setAttribute("fill", "#4D4D4D");

        path.addEventListener("mouseover", () => {
            path.setAttribute("fill", "#CAADFF");
            showTooltippie(skill.type, percent, skill.amount);
        });

        path.addEventListener("mouseout", () => {
            path.setAttribute("fill", "#4D4D4D");
            hideTooltippie();
        });

        svg.appendChild(path);
    });

    function showTooltippie(key, value, skillown) {
        const tooltip = document.getElementById("tooltippie");
        tooltip.innerText = `${key.replace("skill_", "").toUpperCase()}: ${value.toFixed(
            0
        )}% of all your skills and you have mastered ${skillown}%`;
    }

    function hideTooltippie() {
        const tooltip = document.getElementById("tooltippie");
        tooltip.innerText = "";
    }
}

function createBarChart(data, svgId) {
    const svg = document.getElementById(svgId);
    const maxValue = Math.max(...Object.values(data));
    const barWidth = svg.clientWidth / Object.keys(data).length;
    let currentXPosition = 0;

    for (const key in data) {
        const barHeight = (data[key] / maxValue) * svg.clientHeight;

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", currentXPosition);
        bar.setAttribute("y", svg.clientHeight - barHeight);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("stroke", "black");
        bar.setAttribute("stroke-width", "1.8");
        bar.setAttribute("stroke-opacity", "0.7");
        bar.setAttribute("fill", "#4D4D4D");

        bar.addEventListener("mouseover", () => {
            bar.setAttribute("fill", "#CAADFF");
            showTooltip(key, data[key]);
        });
        bar.addEventListener("mouseout", () => {
            bar.setAttribute("fill", "#4D4D4D");
            hideTooltip();
        });

        svg.appendChild(bar);

        currentXPosition += barWidth;
    }

    function showTooltip(key, value) {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${func.formatBytes(value)}`;
    }

    function hideTooltip() {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerText = "";
    }
}

function logout() {
    localStorage.removeItem("jwt");
    navigateTo("/");
    return;
}

function afficherMoisEtJour(tmp) {
    var date = new Date(tmp);

    var monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];

    var month = monthNames[date.getMonth()];

    var day = date.getDate().toString().padStart(2, "0");

    return day + " " + month;
}

export const GET_USER_PROFILE = `
	query GetUserProjects {
		event_user(where: { event: { path: { _ilike: "/dakar/div-01" } } }, order_by: { user: { login: asc } }, limit: 1) {
			level
			user {
				firstName
				lastName
				login
				attrs
				auditRatio
				XPamount: transactions_aggregate( where: { event: { object: { id: { _eq: 100256 } }, _and: { campus: { _eq: "dakar" } } }, _and: { type: { _eq: "xp" } } }) {
					aggregate {
						sum {
							amount
						}
					}
				}
				xpByProject: transactions(
					where: { event: { object: { id: { _eq: 100256 } }, _and: { campus: { _eq: "dakar" } } }, _and: { type: { _eq: "xp" }, object: { type: { _eq: "project" } } } }
					order_by: { createdAt: asc }
				) {
					createdAt
					type
					amount
					object {
						type
						name
					}
				}
				skill: transactions(
					distinct_on: [type]
					where: {
						event: { object: { id: { _eq: 100256 } }, _and: { campus: { _eq: "dakar" } } }
						_and: [{ type: { _neq: "xp" } }, { type: { _neq: "down" } }, { type: { _neq: "up" } }, { type: { _neq: "level" } }]
					}
					order_by: { type: asc, createdAt: desc }
				) {
					type
					amount
					object {
						name
					}
				}
			}
		}
	}`;
