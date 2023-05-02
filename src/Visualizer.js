import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
import "./index.css";
import "./visualizer.css";
// import hierarchy from "./data/transactions.hierarchy.json"; 


function Visualizer(props) {
    
    const data = props.data;

    // const data = hierarchy;

    return (
        <div id="wrapper2">
        <TreeDiagram data={data} />
        </div>
    )
}

function TreeDiagram(props) {
    const data = props.data;
    const svgRef = useRef();


    useEffect(() => {
      const svg = d3.select(svgRef.current);
  
       const root = d3.hierarchy(data);
      const treeLayout = d3.tree().size([1000, 400]);
      treeLayout(root);
      


      const curve = d3.line()
        .curve(d3.curveBasis)
        .x((d) => d.x)
        .y((d) => d.y);

      // tree.sort([comparator])
    //   function comparator(a, b) {
    //     return b.value - a.value;
    //   }
      svg.selectAll('path.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', (d) => {
            const source = { x: d.source.x, y: d.source.y };
            const target = { x: d.target.x, y: d.target.y };
            const midpoint = { x: (source.x + target.x) / 2, y: (source.y)}; // + target.y) / 3 };
            const points = [source, midpoint, target];
            return curve(points);
        });
      
      svg.selectAll()
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', (d) => d.x + 5)
        .attr('y', (d) => d.y + 3)
        .append('tspan')
        .text((d) => d.data.name)
        .append('tspan')
        .attr('class', 'type')
        .text((d)=>d.data.type); 
  
      svg.selectAll('circle.node')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', 5)
    }, [data]);
   
    // <svg width={this.props.width} height={this.props.height}>
    return (
      <svg ref={svgRef} width={1000} height={400} viewBox="0 -20 1000 440" />
      
    );
}



export default Visualizer;
// export default callback;