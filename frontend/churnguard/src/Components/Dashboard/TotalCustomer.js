import React, { useState, useEffect } from 'react';
import axios from 'axios';

// code for the Total active customers visual on the dashboard
function TotalCustomers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/data")
      .then(res => res.data)
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  // Calculate only total customers who are ACTIVE customers
  const total = data.filter(customer => customer.Churn !== 1)
  .reduce((acc, current) => {
    if (current.CustomerID && !acc.includes(current.CustomerID)) {
      return [...acc, current.CustomerID];
    }
    return acc;
  }, []).length;

  return total;
}

export default TotalCustomers;

