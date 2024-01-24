import { navigateTo } from "../scripts/router.js";
import AbstractView from "./AbstractView.js";

export let userID = 0;
export default class Profile extends AbstractView {
    constructor() {
        super();
        this.setTitle("Profile");
    }

    async getHTML() {
        return `
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2048px-GraphQL_Logo.svg.png"
                            alt="Logo"
                            width="30"
                            height="24"
                            class="d-inline-block align-text-top"
                        />
                        Graphql
                    </a>
                    <a class="nav-link" data-link onclick="logout()">Logout</a>
                </div>
            </nav>
            <div class="container">
                <div class="col-12 text-center">
                    <h1 id="welcome"></h1>
                </div>
                <div class="counter mt-10">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" id="level"></h6>
                                <p class="m-0px font-w-600"><i class="bi bi-water"></i> Level</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" id="projectCompleted"></h6>
                                <p class="m-0px font-w-600">Project Completed</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" id="auditRatio"></h6>
                                <p class="m-0px font-w-600">Audit ratio</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" id="xpCount">190</h6>
                                <p class="m-0px font-w-600">XP</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid pt-4 px-4">
                    <div class="row g-4">
                        <div class="col-md-6 bg-light" id="xpByprojectchartDiv">
                            <div class="bg-light text-center rounded p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <h6 class="mb-0 titlepro">XP earned by project</h6>
                                </div>
                                <div id="xpByprojectchart" style="height:70vh">
                                    <div id="tooltip"></div>
                                    <svg id="barChart" height="434px" width="434px"></svg>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 bg-light">
                            <div class="bg-light text-center rounded p-4 mb-3"">
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <h6 class="mb-0 titlepro">Audit Ratio</h6>
                                </div>
                                <div id="auditRatio">
                                    <svg id="svg" viewBox="0 0 32 32">
                                        <circle id="myCircle" r="16" cx="16" cy="16" />
                                    </svg>
                                </div>
                            </div>
                            <div class="row mt-6 infos">
                                <div class="col">
                                    <div class="squarePass"></div>
                                    <p id="passAudit">Pass</p>
                                </div>
                                <div class="col">
                                    <div class="squareFail"></div>
                                    <p id="failAudit" style="text-align">Fail</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    async render() {
        document.title = "Profile";
        const container = document.getElementById("app");
        container.innerHTML = await this.getHTML();
        var userID;
        const jwt = sessionStorage.getItem("jwt");
        if (!jwt) {
            console.log("Go to connect first");
            navigateTo("/");
            return;
        }
        try {
            const response = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: Get_id,
                }),
            });

            if (!response.ok) {
                console.error("Erreur de requête GraphQL:", response.status);
                return;
            } else {
                const responseData = await response.json();
                userID = responseData.data.user[0].id;
            }
        } catch (error) {
            console.error("Erreur lors de la requête GraphQL:", error);
            this.logout();
            return;
        }

        try {
            const response = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                    query {
                        event_user(
                          where: {event: {path: {_ilike: "/dakar/div-01"}}}
                          order_by: {user: {login: asc}}
                          limit: 1
                        ) {
                          level
                          user {
                            id
                            firstName
                            lastName
                            login
                            auditRatio
                            XPamount: transactions_aggregate(
                              where: {event: {object: {id: {_eq: 100256}}, _and: {campus: {_eq: "dakar"}}}, _and: {type: {_eq: "xp"}}}
                            ) {
                              aggregate {
                                sum {
                                  amount
                                }
                              }
                            }
                            xpByProject: transactions(
                              where: {event: {object: {id: {_eq: 100256}}, _and: {campus: {_eq: "dakar"}}}, _and: {type: {_eq: "xp"}, object: {type: {_eq: "project"}}}}
                              order_by: {createdAt: asc}
                            ) {
                              createdAt
                              type
                              amount
                              object {
                                type
                                name
                              }
                            }
                            auditValidated: audits_aggregate(
                              where: {auditorId: {_eq: ${userID}}, grade: {_gte: 1}}
                            ) {
                              aggregate {
                                count
                              }
                            }
                             auditFailed:  audits_aggregate(where:{auditorId:{_eq:${userID}}, grade:{_lt:1}}){
                              aggregate{
                                count
                              }
                            }
                             auditMade:  audits_aggregate(where:{auditorId:{_eq:${userID}}, grade:{_is_null: false}}){
                              aggregate{
                                count
                              }
                            }
                          }
                        }
                      }
                        `,
                }),
            });

            if (!response.ok) {
                console.error("Erreur de requête GraphQL:", response.status);
                return;
            }

            const responseData = await response.json();

            const dataObject = {};
            let count = 0;
            for (const iterator of responseData.data.event_user[0].user.xpByProject) {
                dataObject[iterator.object.name] = iterator.amount;
                count++;
            }

            document.getElementById("level").textContent = responseData.data.event_user[0].level;
            document.getElementById("projectCompleted").textContent = count - 1;
            document.getElementById("auditRatio").textContent =
                responseData.data.event_user[0].user.auditRatio.toFixed(1);
            document.getElementById("xpCount").textContent = this.formatBytes(
                responseData.data.event_user[0].user.XPamount.aggregate.sum.amount
            );

            const auditMade = responseData.data.event_user[0].user.auditMade.aggregate.count;
            let auditFailed = responseData.data.event_user[0].user.auditFailed.aggregate.count;
            let auditValidated = responseData.data.event_user[0].user.auditValidated.aggregate.count;
            let auditFailedPercentage = (auditFailed / auditMade) * 100;
            document.getElementById("passAudit").textContent = `Pass (${auditValidated})`;
            document.getElementById("failAudit").textContent = `Fail (${auditFailed})`;
            let pct = Math.round(auditFailedPercentage).toString();
            document.getElementById("myCircle").style.strokeDasharray = `${pct} 100`;
            this.createBarChart(dataObject, "barChart");
        } catch (error) {
            console.error("Erreur lors de la requête GraphQL:", error);
            this.logout();
            return;
        }
    }

    formatBytes(xp) {
        const e = (Math.log(xp) / Math.log(1000)) | 0;
        const unit = `${"kMGTPEZY"[e - 1] || ""}B`;
        const num = xp / Math.pow(1000, e);
        const round = Math.round(num);
        const value = round > 100 ? String(round) : num.toFixed(round > 10 ? 1 : 2);

        return `${value} ${unit}`;
    }

    showTooltip(key, value) {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${this.formatBytes(value)}`;
    }
    hideTooltip() {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerText = "";
    }
    createBarChart(data, svgId) {
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
            bar.setAttribute("stroke", "grey");
            bar.setAttribute("stroke-width", "1");
            bar.setAttribute("stroke-opacity", "0.7");
            bar.setAttribute("fill", "#262626");

            bar.addEventListener("mouseover", () => {
                bar.setAttribute("fill", "#030303");
                this.showTooltip(key, data[key]);
            });
            bar.addEventListener("mouseout", () => {
                bar.setAttribute("fill", "#262626");
                this.hideTooltip();
            });

            svg.appendChild(bar);

            currentXPosition += barWidth;
        }
    }
}
window.logout = logout;
function logout() {
    sessionStorage.removeItem("jwt");
    navigateTo("/");
    return;
}
export const Get_id = `
query {
    user{
        id
    }
}`;
