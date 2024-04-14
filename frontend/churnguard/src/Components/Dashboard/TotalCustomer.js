import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TotalCustomers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/data")
      .then(res => res.data) // Assuming the response directly contains the data array
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  // Calculate the total number of unique customers
  const total = data.reduce((acc, current) => {
    if (current.CustomerID && !acc.includes(current.CustomerID)) {
      return [...acc, current.CustomerID];
    }
    return acc;
  }, []).length;

  return total;
}


export default TotalCustomers;

