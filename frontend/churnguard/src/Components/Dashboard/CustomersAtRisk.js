// calculations: fall into one of the personas churn is predicted for, but churn col is still not churn. 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomersAtRisk() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get("/data")
        .then(res => res.data) 
        .then(data => setData(data.filter(customer => 
          customer.Churn === 0 &&                              // not churned yet
          (customer.Persona === "CustomerServiceIssues" || 
          customer.Persona === "FinanciallyStrained" || 
          customer.Persona === "TechDifficulties")
        )))
        .catch(err => console.log(err));
    }, []);
  
    const total = data.reduce((acc, current) => {
      if (current.CustomerID && !acc.includes(current.CustomerID)) {
        return [...acc, current.CustomerID];
      }
      return acc;
    }, []).length;
  
    return total;
  }
export default CustomersAtRisk;