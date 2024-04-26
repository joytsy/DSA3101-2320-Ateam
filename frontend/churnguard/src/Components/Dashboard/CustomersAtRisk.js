// Calculation logic: customer falls into one of the personas that is expected to churn, but has not churned yet. 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Code for "Customers At Risk" visual in Dashboard page
function CustomersAtRisk() {
    const [data, setData] = useState([]);

    // fetch data
    useEffect(() => {
      axios.get("/data")
        .then(res => res.data) 
        .then(data => setData(data.filter(customer => 
          customer.Churn === 0 &&                              // filter condition: have not churned
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