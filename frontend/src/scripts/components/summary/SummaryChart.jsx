import D3Wrap from "../../libs/d3Wrap";
import * as d3 from "d3";

export const SummaryChart = ({initData}) => {
    const methods = {
        initialize: (div, data) => {
            const w = 500;
            const h = 500;
            const r = 200;
            const color =  d3.scaleOrdinal(d3.schemeCategory10);
            const usedData = data || initData;
            
            const vis = d3.select(div)
                .append("svg:svg")
                .data([usedData])
                    .attr("width", w)
                    .attr("height", h)
                .append("svg:g")
                    .attr("transform", "translate(" + r + "," + r + ")")
        
            const arc = d3.arc()
                .outerRadius(r).innerRadius(0);
        
            const pie = d3.pie()
                .value(function(d) { return d.value; });
        
            const arcs = vis.selectAll("g.slice")
                .data(pie)
                .enter()
                    .append("svg:g")
                        .attr("class", "slice");

        
            arcs.append("svg:path")
                    .attr("fill", function(d, i) { return color(i); } )
                    .attr("d", arc);
    
            arcs.append("svg:text")
                    .attr("transform", function(d) {
                    d.innerRadius = 0;
                    d.outerRadius = r;
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function(d, i) { return usedData[i].label; });
                
        }
    };

    return D3Wrap(methods);
}
