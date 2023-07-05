import React from "react";

import "./visualizer.css";
import { getTree } from "./domain/structure-to-tree";

import JSONTree from "./InteractiveTree/InteractiveTree";

function Visualizer(props) {
    
    const rawString = props.rawString;

    const data = JSON.parse(rawString);
    const tree = getTree(data);

    return (
        <div id="wrapper2">

            <JSONTree 
              data={tree} 
            />

        </div>
    )
}

export default Visualizer;