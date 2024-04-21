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

    // const formattedRevenueAtRisk = RevenueAtRisk.toFixed(2);
    // add commas between large numbers, max 2 decimal places
    const formattedRevenueAtRisk = RevenueAtRisk.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return ("$" + formattedRevenueAtRisk);
}

export default RevenueAtRisk;
