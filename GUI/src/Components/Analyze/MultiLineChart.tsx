import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
    date: Date;
    value: number;
   
}

interface MultiLineGraphProps {
    data: DataPoint[][];
    width: number;
    height: number;
    xLabel?: string;
    yLabel?: string;
    selectedXAxis: string; 
    selectedYAxis: string;
}

const MultiLineGraph: React.FC<MultiLineGraphProps> = ({ data, width, height, xLabel = 'X-Axis', yLabel = 'Y-Axis', selectedXAxis,
selectedYAxis, }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current || data.length === 0 || !selectedXAxis || !selectedYAxis) return;
    
        const svg = d3.select(svgRef.current);
    
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
    
        const xAccessor = (d: DataPoint) => {
            if (selectedXAxis in d) {
                return d[selectedXAxis as keyof DataPoint];
            }
            // Handle case where the property doesn't exist or handle the error
            return 0; // For instance, return a default value
        };
        
        const yAccessor = (d: DataPoint) => {
            if (selectedYAxis in d) {
                return d[selectedYAxis as keyof DataPoint];
            }
            // Handle case where the property doesn't exist or handle the error
            return 0; // For instance, return a default value
        };
        
        const xScale = d3
            .scaleTime()
            .domain([
                d3.min(data, (series) => d3.min(series, xAccessor) as Date) || new Date(),
                d3.max(data, (series) => d3.max(series, xAccessor) as Date) || new Date(),
            ])
            .range([0, innerWidth]);
    
        const yScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, (series) => d3.max(series, yAccessor) as number) || 1,
            ])
            .nice()
            .range([innerHeight, 0]);
    
        const line = d3
            .line<DataPoint>()
            .x((d) => xScale(xAccessor(d))) 
            .y((d) => yScale(yAccessor(d))); 
    
        const xAxis = d3.axisBottom(xScale).ticks(5).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(5).tickSizeOuter(0);
    
        svg.selectAll('*').remove();
    
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    
        const flightColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#9467bd', '#8c564b'];
    
        data.forEach((series, index) => {
            g
                .append('path')
                .datum(series)
                .attr('fill', 'none')
                .attr('stroke', flightColors[index % flightColors.length])
                .attr('stroke-width', 2)
                .attr('d', line);
        });
    
        g
            .append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);
    
        g.append('text')
            .attr('class', 'x-axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 35)
            .text(selectedXAxis) // Update text to display the selected x-axis label
            .attr('fill', 'white');
    
        g.append('g').call(yAxis);
    
        g.append('text')
            .attr('class', 'y-axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -30)
            .text(selectedYAxis) // Update text to display the selected y-axis label
            .attr('fill', 'white');
    }, [data, height, width, selectedXAxis, selectedYAxis]);
     

    return <svg ref={svgRef} width={width} height={height} />;
};

export default MultiLineGraph;
