"use strict";

class KMeans {
    constructor(points, clustersCount) {
        this.points = [];
        this.centroids = [];
        this.clustersCount = clustersCount;
        this.preparePoints(points);
        this.createCentroids();
        this.step = 0;
        this.canRecalculate = true;
    }

    getData() {
        return {
            points: this.points,
            centroids: this.centroids
        };
    }

    preparePoints(points) {
        points.forEach((point) => {
            this.points.push({
                x: point[0],
                y: point[1],
                clusterNum: null
            });
        });
    }

    createCentroids() {
        for (let i = 0; i < this.clustersCount; i++) {
            let point = this.points[i];
            this.centroids.push({
                clusterNum: i,
                x: point.x,
                y: point.y
            });
        }
    }

    recalc() {
        if (!this.canRecalculate) {
            return;
        }
        this.calcCentroids();
        this.updateClusters();
        this.step++;
    }

    calcCentroids() {
        this.centroids.forEach(centroid => {
            let pointsInCluster = 0,
                x = 0,
                y = 0;
            this.points.forEach(point => {
                if (point.clusterNum !== centroid.clusterNum) {
                    return;
                }
                pointsInCluster++;
                x += point.x;
                y += point.y;
            });
            if (!pointsInCluster) {
                return;
            }
            centroid.x = x / pointsInCluster;
            centroid.y = y / pointsInCluster;
        });
    }

    updateClusters() {
        this.points.forEach(point => {
            let clusterNum = point.clusterNum,
                minDist = null;

            this.centroids.forEach(centroid => {
                let dist = this.distance(point, centroid);
                if (minDist == null || dist < minDist) {
                    minDist = dist;
                    clusterNum = centroid.clusterNum;
                }
            });
            point.clusterNum = clusterNum;
        });
    }

    distance(pointA, pointB) {
        return this.euclideanDistance(pointA, pointB);
    }

    euclideanDistance(pointA, pointB) {
        return Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2));
    }
}