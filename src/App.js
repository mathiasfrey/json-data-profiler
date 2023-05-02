import './App.css';
import { useCallback } from 'react';

import Dropzone from './Dropzone.js'; 


function App() {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     jsonData: null,
  //   };
  // }
  // this.urxn = '1';
  // this.state = {
  //   jsonData: null
  // }

  // useCallback((acceptedFiles) => {

  //   acceptedFiles.map((file) => {
  //     const reader = new FileReader();

  //     reader.onload = function (e) {
  //       //console.log('dere', e);
  //     };

  //     reader.readAsDataURL(file);
  //     return file;
  //   });
  // }, []);

  return (
    <div className="App">

      <Dropzone accept={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}/>
      
    </div>
  );
}

export default App;