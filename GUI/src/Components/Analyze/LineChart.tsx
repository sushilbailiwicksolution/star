/* eslint-disable no-restricted-globals */
import { memo, useEffect } from "react"
import * as d3 from "d3";


/**
 * Interface for the data structure of each test object.
 * @interface TestObject
 */

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


/**
 * This component handles the line chart of the graph, specifying the x-axis and y-axis.
 * @component
 * @param {Object} props - The props object containing the data to be plotted on the line chart.
 * @param {TestObject[]} props.data - The data to be used for the line chart.
 */


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
        const maxSpeed = d3.max(data, (d:test) =>{return Number(d.speed);});
        // Add X axis and Y axis
        var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, data.length]).nice();
        // var y = d3.scaleLog()
        //     .range([height, 0])
        //     .domain([0, maxSpeed?maxSpeed:10]).nice();

        var y = d3.scaleLinear()  // Use linear scale for speed
        .range([height, 0])
        .domain([0, maxSpeed ? maxSpeed : 10]).nice();


        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        // svg.append("g")
        //     .call(d3.axisLeft(y).ticks(3).tickFormat(d3.format(".2d")));

         // Append X and Y axes with labels
         svg.append("g")
    .call(d3.axisLeft(y).ticks(3).tickFormat(d3.format(".2d")));
   

svg.append("g")
    .call(d3.axisLeft(y).ticks(3).tickFormat(d3.format(".2d")))
    .append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 3)
    .attr("y", -margin.left+20)
    .style("fill", "black")
    .text("Speed(KTS)");

    svg.append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 10)
    .text("Sample (No.)");

        // add the Line
        var valueLine = d3.line()
            .x((_, i) => x(i))
            .y((d: any) => { return y(d.speed); });
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
                var i = Math.round(x0); // Round to the nearest integer to get the sample index
                var d = data[i]; // Get the data point at the index i
                focus.attr("transform", "translate(" + x(i) + "," + y(d.speed) + ")");
                focus.select(".tooltip-date").text(`Sample (No.): ${i} , Speed(KTS): ${d.speed}`);
            }
            
            


    }, [data])
    return <div id="lineChart"></div>
}

export default memo(LineChart);