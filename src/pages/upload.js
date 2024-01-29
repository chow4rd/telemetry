import React, { useState } from 'react';
import axios from 'axios'; //used for making HTTP requests
import '../styles.css';

function Upload() {
  //the CSV will be split into these catagories
  const dataTypes = [
    'roll',
    'pitch',
    'yaw',
  ];
  
  //adds an empty dataList to each dataType and stores them in an object
  const initialState = dataTypes.reduce((acc, dataType) => {
    acc[dataType] = {
      dataType,
      dataList: [],
    };
    return acc;
  }, {}); //{} is the initial empty object that stores the dataType key and dataList

  const [state, setState] = useState(initialState); //used to store all the data values

  const [successMessage, setSuccessMessage] = useState(''); //storing messages for rerender
  const [uploadMessage, setUploadMessage] = useState(''); //storing messages for rerender

  const handleSubmit = async (e) => {
    e.preventDefault(); //stops page reloading
    try {
      //loop through initialState properties
      console.log(initialState)
      for (const dataType in initialState) {
        if (initialState.hasOwnProperty(dataType)) {

          //make an individual API request for each dataList
          const response = await axios.post('http://localhost:5050/api/upload', state[dataType]);

          setSuccessMessage(`Data uploaded for ${dataType}:`, response.data);  //set success message
        }
      }
      setSuccessMessage('Success all data has been uploaded!');
    } catch (error) {
      setSuccessMessage('Error uploading data:', error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const content = event.target.result;
        const rows = content.split('\n');
  
        for (const row of rows) {
          const columns = row.split(",");
          var counter = 0;
        
          for (const dataType in initialState) {
            initialState[dataType].dataList.push(columns[counter]);
            counter += 1;
          }
        }
        setState(initialState);
        setUploadMessage('File uploaded!');
      };
  
      reader.readAsText(file);
    } else {
      setUploadMessage('No file selected!');
    }
  };
  
  return (
    <div>
      <div className='topBar'><h1>Upload Data</h1></div>
      <div className='pageContents'>
        <div className='fileUpload'>
          <input className='fileUploadButton' type="file" id='file' onChange={handleFileUpload} />
          <label htmlFor='file'>Choose File</label>
          {uploadMessage && <div style={{ color: 'green', textAlign: 'center' }}>{uploadMessage}</div>}
        </div>

        <button className='uploadButton' type="submit" onClick={handleSubmit}>Upload Data</button>
        {successMessage && <div style={{ color: 'green', textAlign: 'center' }}>{successMessage}</div>}
      </div>
    </div>
  );
}

export default Upload;