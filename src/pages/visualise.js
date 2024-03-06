import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LineChart from '../charts/lineChart';
import '../styles.css';
import Add from '../icons/add.png';
import Delete from '../icons/delete.png';
import BarChart from "../charts/basicBarChart";
import BasicAreaChart from "../charts/basicArea";
import BasicColumn from "../charts/basicColumn";

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
  const [charts, setCharts] = useState([]);
  const [show, setShow] = useState(false);
  const isStored = useRef(false);
  const [chartType, setChartType] = useState()


  useEffect(() => {
    // Fetch data from MongoDB when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/view');
        setOutputLists(response.data);
      } catch (error) { 
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const localCharts = JSON.parse(localStorage.getItem('charts'));
    if (localCharts) {
     setCharts(localCharts);
    }
  }, []);

  useEffect(() => {
    if (isStored.current) {
      localStorage.setItem('charts', JSON.stringify(charts))
    } else {
      isStored.current = true;
    };
  }, [charts]);

  const handleDropdownChange = (e, chartIndex) => {
    const newCharts = [...charts];
    newCharts[chartIndex].selectedElement = e.target.value;
    setCharts(newCharts);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newChart = {
      chartName: e.target.chartName.value,
      xAxis: e.target.xAxis.value,
      yAxis: e.target.yAxis.value,
      selectedElement: outputLists && outputLists.length > 0 ? outputLists[0].dataType : null,
    };

    setCharts([...charts, newChart]);
    showAdd();
  };
  const showAdd = () => {
    setShow(!show);
  };

  const removeChart = (index) => {
    const newCharts = [...charts];
    newCharts.splice(index, 1);
    setCharts(newCharts);
  };

  function addValueToChartType(event){
    setChartType(event.target.value);
  }


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

          <label> Type of Graph
            <select name="Type of Graph" onChange={addValueToChartType}>
              <option disabled selected hidden>Select a Type of Chart</option>
              <option value="line" name='chartType'>Line Chart</option>
              <option value="bar" name='chartType'>Basic Bar Chart</option>
              <option value="area" name='chartType'>Basic Area Graph</option>
              <option value="column" name='chartType'>Basic Column</option>
              <option value="column" name='chartType'>Stacked and Grouped Column</option>
              <option value="gauge" name='chartType'>Gauge Series</option>
              <option value="gauge" name='chartType'>Gauge with Dual Axis</option>
            </select>
          </label>
  
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
            <img className="deleteButton" onClick={() => removeChart(index)} src={Delete} alt="deleteGraph"/>
            {chartType === 'line' &&
                <LineChart getData={chart.selectedElement} chartName={chart.chartName} chartType={'line'} xAxisName={chart.xAxis} yAxisName={chart.yAxis}/>
            }
            {chartType === 'bar' &&
                <BarChart getData={chart.selectedElement} chartName={chart.chartName} xAxisName={chart.xAxis} yAxisName={chart.yAxis}/>
            }
            {chartType === 'area' &&
                <BasicAreaChart getData={chart.selectedElement} chartName={chart.chartName} xAxisName={chart.xAxis} yAxisName={chart.yAxis}/>
            }
            {chartType === 'column' &&
                <BasicColumn getData={chart.selectedElement} chartName={chart.chartName} xAxisName={chart.xAxis} yAxisName={chart.yAxis}/>
            }
            {chartType === 'gauge' &&
                <h2>This is a Gauge</h2> //Add code for the Gauge
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualise;