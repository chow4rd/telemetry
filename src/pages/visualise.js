import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LineChart from '../charts/lineChart';
import '../styles.css';
import Add from '../icons/add.png';

//creates a dropdown component
function DropDown({ list, onChange, selectedElement }) {
  return (
    <select value={selectedElement} onChange={onChange}>
      {list.map((listElement, index) => ( //maps all the data options on the dropdown
        <option key={index} value={listElement.dataList}> 
          {new Date(listElement.dateCreated).toLocaleString()} {listElement.dataType} 
        </option>
      ))}
    </select>
  );
}

function Visualise() {
  const [outputLists, setOutputLists] = useState([]);
  const [charts, setCharts] = useState([]);
  const [show, setShow] = useState(false);
  const isStored = useRef(false); //stores value without re-render


  useEffect(() => {
    //fetch data from MongoDB when the component initilises
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/view'); //fetches data from database
        setOutputLists(response.data); //saves data to ouputLists
      } catch (error) { 
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const localCharts = JSON.parse(localStorage.getItem('charts')); //checks if theres charts in local storage
    if (localCharts) {
     setCharts(localCharts); //if there is loads the charts
    }
  }, []);

  //store charts in local storage whenever charts is updated and manage syncronization
  useEffect(() => {
    if (isStored.current) {  //makes sure render finishes before storing charts
      localStorage.setItem('charts', JSON.stringify(charts)) //stores charts
    } else {
      isStored.current = true; //makes sure its not immedediatly updated on initial render
    };
  }, [charts]); //charts listener

  const handleDropdownChange = (e, chartIndex) => {
    const newCharts = [...charts]; //duplicats stored charts
    newCharts[chartIndex].selectedElement = e.target.value; //sets selectedElement for chart
    setCharts(newCharts); //stores the duplicated charts with the new selectedElement
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); //prevents page reload

    const newChart = { //creates a new chart with all its values
      chartName: e.target.chartName.value,
      xAxis: e.target.xAxis.value,
      yAxis: e.target.yAxis.value,
      selectedElement: outputLists && outputLists.length > 0 ? outputLists[0].dataType : null, //checks for selectedElement if none set to null
    }; 

    setCharts([...charts, newChart]); //duplicates charts and stores with new chart
    showAdd(); //hides the form
  };

  //used to show and hide form
  const showAdd = () => {
    setShow(!show);
  };

  //deletes chart
  const removeChart = (index) => {
    const newCharts = [...charts];
    newCharts.splice(index, 1); //removes the chart from the duplicated list
    setCharts(newCharts); //stores the new list
  };


  return (
    <div>
      <div className="topBar">
        <h1>Visualise</h1>
      </div>

      <div className='pageContents'>

        <button className='addGraphButton' onClick={showAdd}><img src={Add} alt="addGraph" /></button>
        {show && (
          <form onSubmit={handleFormSubmit}>
          <label htmlFor='chartName'>Chart Name</label>
          <input type='text' name='chartName'></input>
  
          <label htmlFor='xAxis'>X Axis Name</label>
          <input type='text' name='xAxis'></input>
  
          <label htmlFor='yAxis'>Y Axis Name</label>
          <input type='text' name='yAxis'></input>
  
          <input type='submit'></input>
        </form>
        )}

        {charts.map((chart, index) => (
          <div key={index} className="chart-container">
            <DropDown list={outputLists} onChange={(e) => handleDropdownChange(e, index)} selectedElement={chart.selectedElement}/>
            <button onClick={() => removeChart(index)}>X</button>
            <LineChart getData={chart.selectedElement} chartName={chart.chartName} xAxis={chart.xAxis} yAxis={chart.yAxis}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualise;