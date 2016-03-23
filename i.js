"use strict";

let points = [
    [1, 7],
    [1, 8],
    [1, 9],
    [2, 9],
    [3, 10],
    [5, 10],
    [5, 9],
    [6, 9],
    [6, 8],
    [7, 7],
    [4, 10],
    [4, 7]
];

let plotter = new Plotter(400, 400, 8, 15);
let kMeans = new KMeans(points, 4);


function drawKmeans() {
    document.getElementById('step').innerHTML = kMeans.step;
    plotter.draw(kMeans.getData());
}


document.getElementById('next').addEventListener('click', function () {
    if (!kMeans.canRecalculate) {
        document.getElementById('step').innerHTML += 'Next calculation are unnecessary!';
        return;
    }
    kMeans.recalc();
    drawKmeans();

}, false);


// Draw first state
drawKmeans();