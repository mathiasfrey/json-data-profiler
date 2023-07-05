import React from 'react';
import Tree from 'react-d3-tree';
import './json-tree.css';

// https://www.npmjs.com/package/react-d3-tree
const DEFAULT_NODE_CIRCLE_RADIUS = 15;

const textLayout = {
  title: {
    textAnchor: 'start',
    x: 40,
  },
  attribute: {
    x: 40,
    dy: '1.2em',
  },
};

const renderNodeWithCustomEvents = ({
  nodeDatum,
  toggleNode,
  handleNodeClick
}) => (
  
  <g>
    <circle r={DEFAULT_NODE_CIRCLE_RADIUS} onClick={() => handleNodeClick(nodeDatum)} />

    <text className="rd3t-label__title" {...textLayout.title} onClick={toggleNode}>
    {nodeDatum.children && "👋" } {nodeDatum.name}
      </text>
      <text className="rd3t-label__attributes">
        {nodeDatum.attributes &&
          Object.entries(nodeDatum.attributes).map(([labelKey, labelValue], i) => (
            <tspan key={`${labelKey}-${i}`} {...textLayout.attribute}>
              {labelKey}: {typeof labelValue === 'boolean' ? labelValue.toString() : labelValue}
            </tspan>
          ))}
      </text>
  </g>
);


export default function JSONTree(props) {

    const data = props.data;

    const handleNodeClick = (nodeDatum) => {
      window.alert(
        nodeDatum.children ? "Clicked a branch node" : "Clicked a leaf node." +
        " HERE COMES THE DATA PROFILE"
      );
      // console.log(nodeDatum);
    };

    return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '800px', height: '800px' }}>
        <Tree 
          data={data} 
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          renderCustomNodeElement={(rd3tProps) =>
            renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
          }
        />
      </div>
    );
  }