import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";

import Visualizer from './Visualizer.js';
import hierarchy from "./data/transactions.hierarchy.json"; 

let a = 1;

function callback (result) {
    // 
    console.log(result);  
    a = true; 

    //<Visualizer data={result}/>

    //import hierarchy from "./data/transactions.hierarchy.json"; 

    // const FileName = generate_package_name();
    // const xmlString = CSV2XML(result, FileName);

    // Create blob link to download
    // const url = window.URL.createObjectURL(
    //     new Blob([xmlString], { type: 'text/xml' }),
    //   );
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute(
    //     'download',
    //     `${FileName}.xml`,
    //   );
  
    //   document.body.appendChild(link);
    //   link.click();
    //   link.parentNode.removeChild(link);
    console.log('dere pleri!');

}


function Dropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsText(file);

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            callback(reader.result);
        };
        

      })
      
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div id="wrapper">
        { a && <Visualizer data={hierarchy}/>}
        <div {...getRootProps()} id="dropzone" className={`${isDragActive ? "dragging" : ""}`}>

          <div className="icon" />

          <input {...getInputProps()} />
          <p>Simply drag 'n' drop your <code>JSON{'{}'}</code> here, or
            

          </p><button>Browse</button>
        </div>
        <a href="https://github.com/mathiasfrey/json-data-profiler">Instructions, sample JSON &amp; license</a>
      </div>
    )
  }

export default Dropzone;