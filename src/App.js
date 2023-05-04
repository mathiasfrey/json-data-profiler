import './App.css';
import { useState } from 'react';

import Dropzone from './Dropzone.js'; 
import Visualizer from './Visualizer.js';

function App() {

  const [rawString, setRawString] = useState("");

  function setFileState(rs) {
    setRawString(rs);
  }

  function handleFileOpen(fileStr) { 
    console.log("Received string from file");
    
    setFileState(fileStr);

    // console.log(rawString);
  }

  return (
    <div className="App">

      <Dropzone 
        accept={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
        onFileOpen={handleFileOpen}
      />

      {rawString && <Visualizer rawString={rawString}/>}

    </div>
  );
}

export default App;