import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
// import "./index.css";
import "./visualizer.css";
import { getTree } from "./domain/structure-to-tree";

function Visualizer(props) {
    
    const rawString = props.rawString;

    const data = JSON.parse(rawString);
    const tree = getTree(data);

    return (
        <div id="wrapper2">
            <TreeDiagram data={tree} />
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

            const deltax = target.x - source.x;
            const deltay = target.y - source.y;

            //const midpoint = { x: (source.x + target.x) / 2, y: (source.y)}; // + target.y) / 3 };
            //const midpoint2 = { x: (source.x + target.x) / 2, y: (source.y + target.y) / 3 };
            
            const midpoint1 = { x: source.x + deltax * .05, y: source.y + deltay * .15};
            const midpoint2 = { x: source.x + deltax * .95, y: source.y + deltay * .2};

            const points = [source, midpoint1, midpoint2, target];
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
        .attr('r', 5);
      
      // array
      // TODO: add visualization for arrays!

    }, [data]);
   
    // <svg width={this.props.width} height={this.props.height}>
    return (
      <svg ref={svgRef} width={1000} height={400} viewBox="0 -20 1000 440" />
      
    );
}



export default Visualizer;
// export default callback;