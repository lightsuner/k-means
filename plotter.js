"use strict";

class Plotter {
    constructor(width, height, domainX, domainY) {
        this.domainX = domainX;
        this.domainY = domainY;
        this.width = width;
        this.height = height;
        this.colors = d3.scale.category10();
        this.svg = d3.select("body").append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style('border', '1px solid')
            .append("g");
    }

    x(x) {
       return d3.scale.linear().range([0, this.width]).domain([0, this.domainX]).nice()(x);
    }

    y(y) {
        return d3.scale.linear().range([this.height, 0]).domain([0, this.domainY]).nice()(y);
    }

    draw(data) {
        this.svg.selectAll('g').remove();
        let g = this.svg.append('g');

        g.selectAll(".dot")
            .data(data.points)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 8)
            .attr("cx", d => this.x(d.x))
            .attr("cy", d => this.y(d.y))
            .style("fill", d => d.clusterNum == null ? this.colors(0) : this.colors(d.clusterNum + 1));

        g.selectAll(".centroids")
            .data(data.centroids)
            .enter().append('rect')
            .attr('class', 'centroid')
            .attr("x", d => this.x(d.x) - 4)
            .attr("y", d => this.y(d.y) - 4)
            .attr('width', 8)
            .attr('height', 8)
            .attr('rx', 1)
            .attr('ry', 1)
            .style("fill", (d, i) => this.colors(i+1))
            .style("stroke-width", 1)
            .style("stroke", '#000');
    }

}