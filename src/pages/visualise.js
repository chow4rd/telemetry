import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChartWithScrollbar from '../charts/scrollBarChat';
import '../styles.css';

function DropDown({ list, onChange, selectedElement }) {
  return (
    <select value={selectedElement} onChange={onChange}>
      {list.map((listElement, index) => (
        <option key={index} value={listElement.dataList}>
          {new Date(listElement.dateCreated).toLocaleString()} {listElement.dataType}
        </option>
      ))}
    </select>
  );
}

function Visualise() {
  const [outputLists, setOutputLists] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    // Fetch data from MongoDB when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/view');
        setOutputLists(response.data);
        if (response.data.length > 0) {
          setSelectedElement(response.data[0].dateType);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDropdownChange = (e) => {
    setSelectedElement(e.target.value);
  };

  return (
    <>
      <div className="topBar">
        <h1>Visualise</h1>
      </div>
      <div>
        <DropDown list={outputLists} onChange={handleDropdownChange} selectedElement={selectedElement} />
      </div>
      <div className="chart-container">
        <LineChartWithScrollbar getData={selectedElement} />
      </div>
    </>
  );
}

export default Visualise;