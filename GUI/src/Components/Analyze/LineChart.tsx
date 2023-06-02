/* eslint-disable no-restricted-globals */
import { memo, useEffect } from "react"
import * as d3 from "d3";

interface test {
    flightid: string;
    packet_type: string;
    date_time: string;
    aircraftid: string;
    eventid: string;
    gps_lat: string;
    gps_long: string;
    altitude: string;
    speed: string;
    heading: string;
}

const LineChart = ({ data }: { data: any }) => {
    useEffect(() => {
        d3.select('#lineChart svg').remove();

        if (data.length < 1) return;
        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 20, bottom: 50, left: 70 },
            width = 750 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        var svg = d3.select("#lineChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},     ${margin.top})`);

        var bisectAltitude = d3.bisector(function (d: test) { return d.altitude; }).left;

        const max = d3.max(data, (d: test) => { return Number(d.altitude); });
        // Add X axis and Y axis
        var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, max ? max : 100]).nice();
        var y = d3.scaleLog()
            .range([height, 0])
            .domain([10, 10000000]).nice();
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        svg.append("g")
            .call(d3.axisLeft(y).ticks(3).tickFormat(d3.format(".2d")));

        // add the Line
        var valueLine = d3.line()
            .x((d: any) => { return x(d.altitude); })
            .y((d: any) => { return y(d.altitude); });
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", valueLine);


        // append the circle at the intersection 
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        focus.append("rect")
            .attr("class", "tooltip")
            .attr("width", 100)
            .attr("height", 50)
            .attr("x", 10)
            .attr("y", -22)
            .attr("rx", 4)
            .attr("ry", 4);

        focus.append("text")
            .attr("class", "tooltip-date")
            .attr("x", 18)
            .attr("y", -2);

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () { focus.style("display", null); })
            .on("mouseout", function () { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove(this: any) {
            var x0: any = x.invert(d3.pointer(event, this)[0]);
            var i = bisectAltitude(data, x0, 1);
            var d0 = data[i - 1];
            var d1 = data[i];
            if (!d1) return;
            var d = x0 - d0.altitude > d1.altitude - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.altitude) + "," + y(d.altitude) + ")");
            focus.select(".tooltip-date").text(d.altitude);
        }


    }, [data])
    return <div id="lineChart"></div>
}

export default memo(LineChart);