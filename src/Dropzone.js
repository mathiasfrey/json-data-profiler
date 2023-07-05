import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";

function Dropzone(props) {
    // callback from outer component
    const handleFileOpen = props.onFileOpen;

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsText(file);

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            handleFileOpen(reader.result);
        };
       
      })
      
    }, [handleFileOpen]); // no dependency array

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div id="wrapper">
        
        <div {...getRootProps()} id="dropzone" className={`${isDragActive ? "dragging" : ""}`}>

          <div className="icon" />

          <input {...getInputProps()} />
          <p>Simply drag 'n' drop your <code>JSON{'{}'}</code> here, or
            
          </p><button>Browse</button>
        </div>
        <div id="privacy">
            Your upload does not leave your computer.
        </div>
        <a href="https://github.com/mathiasfrey/json-data-profiler">Instructions, sample JSON &amp; license</a>
      </div>
    )
  }

export default Dropzone;