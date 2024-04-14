// to work on: clicable option to show all dp, or how many dp they want
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RevenueAtRisk() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/data")
      .then(res => res.data) // Assuming the response directly contains the data array
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  // Calculate total revenue at risk
  const RevenueAtRisk = data
    .filter(customer => 
      customer.Persona && 
      ["CustomerServiceIssues", "FinanciallyStrained", "TechDifficulties"].includes(customer.Persona) &&
      customer.Churn === 0 &&
      customer.SavingsAccount === 1
    )
    .reduce((acc, customer) => {
      return acc + customer.Balance;
    }, 0);

  return ("$" + RevenueAtRisk);
}

export default RevenueAtRisk;
