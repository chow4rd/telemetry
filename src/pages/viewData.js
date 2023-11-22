import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function ViewData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/view');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5050/api/delete/${id}`);
      console.log('Data deleted:', response.data);
      setData(data.filter(item => item._id !== id));
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
