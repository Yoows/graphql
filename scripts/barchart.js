var studentExamData = new Array();
studentExamData.push("01,80");
studentExamData.push("02,40");
studentExamData.push("03,70");
studentExamData.push("04,80");
studentExamData.push("05,30");
studentExamData.push("06,90");
studentExamData.push("07,70");
studentExamData.push("08,80");
studentExamData.push("09,100");
studentExamData.push("10,60");

var svg;
var svgWidth, svgHeight, svgMargin, svgSpace;
var MarginSpace, MarginHeight;
var barchartWidth, barchartMargin, totalChartBars, maximumDataValue;
var LabelOnYAxis;

function ChartSettings() {
    svgMargin = 20;
    svgSpace = 60;
    svgHeight = svg.height.baseVal.value - 2 * svgMargin - svgSpace;
    svgHeight = svg.width.baseVal.value - 2 * svgMargin - svgSpace;

    MarginSpace = svgMargin + svgSpace;
    MarginHeight = svgMargin + svgHeight;

    barchartMargin = 15;
    totalChartBars = studentExamData.length;
    barchartWidth = svgWidth / totalChartBars - barchartMargin;

    maximumDataValue = 0;
    for (var i = 0; i < totalChartBars; i++) {
        var arrVal = studentExamData[i].split(",");
        var barVal = parseInt(arrVal[1]);
        if (parseInt(barVal) > parseInt(maximumDataValue)) maximumDataValue = barVal;
    }
    LabelOnYAxis = 10;
}
function drawXYAxis(x1, y1, x2, y2) {
    var newDataAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newDataAxis.setAttribute("x1", x1);
    newDataAxis.setAttribute("y1", y1);
    newDataAxis.setAttribute("x2", x2);
    newDataAxis.setAttribute("y2", y2);
    newDataAxis.style.stroke = "black";
    newDataAxis.style.strokeWidth = "2px";
    svg.appendChild(newDataAxis);
}

function drawMarkers() {
    var numberMarkers = parseInt(maximumDataValue / LabelOnYAxis);
    for (var i = 0; i < LabelOnYAxis + 1; i++) {
        var markerVal = i * numberMarkers;
        var toto = i * numberMarkers * svgHeight;
        var xaxisMarkers = MarginSpace - 5;
        var yaxisMarkers = MarginHeight - toto / maximumDataValue;
        textelement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textelement.setAttribute("dx", xaxisMarkers - 40);
        textelement.setAttribute("dy", yaxisMarkers);
        txtnode = document.createTextNode(markerVal);
        textelement.appendChild(txtnode);
        svg.appendChild(textelement);
    }
    for (var i = 0; i < totalChartBars; i++) {
        arrVal = studentExamData[i].split(",");
        nom = arrVal[0];
        markerXPosition = MarginSpace + barchartMargin + i * (barchartWidth + barchartMargin) + barchartWidth / 2;
        markerYPosition = MarginHeight + 20;
        textelement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textelement.setAttribute("dx", markerXPosition);
        textelement.setAttribute("dy", markerYPosition);
        txtnode = document.createTextNode(nom);
        textelement.appendChild(txtnode);
        svg.appendChild(textelement);
    }
}
function drawAxis() {
    drawXYAxis(MarginSpace, MarginHeight, MarginSpace, svgMargin);
    drawXYAxis(MarginSpace, MarginHeight, MarginSpace + barchartWidth + 500, MarginHeight);
    drawMarkers();
}

function drawRectangleForChart(x, y, wd, ht, fill) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    rect.setAttributeNS(null, "width", wd);
    rect.setAttributeNS(null, "height", ht);
    rect.setAttributeNS(null, "fill", "blue");
    svg.appendChild(rect);
}
function drawChart() {
    for (var i = 0; i < totalChartBars; i++) {
        var arrChartVal = studentExamData[i].split(",");
        bcVal = parseInt(arrChartVal[1]);
        bcHt = (bcVal * svgHeight) / maximumDataValue;
        bcX = MarginSpace + i * (barchartWidth + barchartMargin) + barchartMargin + 10;
        bcY = MarginHeight - bcHt - 2;
        drawRectangleForChart(bcX, bcY, barchartWidth, bcHt, true);
    }
}

function clear() {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
}

function drawBarChart() {
    svg = document.getElementsByTagName("svg")[1];
    clear();
    ChartSettings();
    drawAxis();
    drawChart();
}

window.onload = drawBarChart;
