import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LineChart from '../charts/lineChart';
import '../styles.css';
import Add from '../icons/add.png';

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
<<<<<<< HEAD

=======
>>>>>>> e278b46998e417858c312822105ae032dda78c18

  const showAdd = () => {
    setShow(!show);
  };

  const removeChart = (index) => {
    const newCharts = [...charts];
    newCharts.splice(index, 1);
    setCharts(newCharts);
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
            <LineChart getData={chart.selectedElement} chartName={chart.chartName} xAxisName={chart.xAxis} yAxisName={chart.yAxis}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualise;