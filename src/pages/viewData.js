import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function ViewData() {
  const [data, setData] = useState([]); //stores fetched data

  useEffect(() => { //runs as soon as component initialises 
    const fetchData = async () => { //asynchronous function lets program run while working
      try {
        const response = await axios.get('http://localhost:5050/api/view'); //fetches data
        setData(response.data); //adds data to the storage 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); //calls the fetchData function
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5050/api/delete/${id}`); //deletes data from database
      console.log('Data deleted:', response.data);
      setData(data.filter(item => item._id !== id));  //deletes data from storage using filter
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <div className='topBar'><h1>View Data</h1></div>
      <div className='pageContents'>
        <table className='dataTable'>
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Data Type</th>
              <th>Data List</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td>{new Date(item.dateCreated).toLocaleString()}</td>
                <td>{item.dataType}</td>
                <td>{item.dataList.join(', ')}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewData;
