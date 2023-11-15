import React from 'react';
import { useState } from 'react';
import LineChartWithScrollbar from '../charts/scrollBarChat';

function DropDown({list, onChange, selectedElement}) {
    return (
      <select value={selectedElement} onChange={onChange}>
        {list.map((listElement, index) => (
            <option key={index} value={listElement}>{listElement[0]}</option>
        ))}
      </select>
    );
}

function Visualise() {
    const [csvData, setCsvData] = useState([]);
    const [outputLists, setOutputLists] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
    const text = event.target.result;
    const lines = text.split('\n');
    const dataMap = new Map();

    lines.forEach((line) => {
    const [key, value] = line.split(',').map(Number);
    if (!isNaN(key) && !isNaN(value)) {
        if (!dataMap.has(key)) {
        dataMap.set(key, []);
        }
        dataMap.get(key).push(value);
    }
    });

    const lists = Array.from(dataMap).map(([key, values]) => [key, ...values]);

    setCsvData(text);
    setOutputLists(lists);
    };

    reader.readAsText(file);

    if (outputLists.length > 0) {
      setSelectedElement(outputLists[0][0])
    }
    };

    const handleDropdownChange = (e) => {
        setSelectedElement(e.target.value);
    };

    return (
        <>
        <div>
        <DropDown list={outputLists} onChange={handleDropdownChange} selectedElement={selectedElement} />    
        </div>
        <div className="chart-container">
        <LineChartWithScrollbar getData={selectedElement}/>
        </div>
        <div>
        <input type="file" accept=".csv" onChange={handleFileInputChange} />
        </div>
        </>
    );
}

export default Visualise;