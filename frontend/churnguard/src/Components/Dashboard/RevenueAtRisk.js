// to work on: clicable option to show all dp, or how many dp they want
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// code for "Revenue At Risk" visual in the dashboard
function RevenueAtRisk() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/data")
      .then(res => res.data) 
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

    // add commas between large numbers, set maxmimum 2 decimal places shown
    const formattedRevenueAtRisk = RevenueAtRisk.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return ("$" + formattedRevenueAtRisk);
}

export default RevenueAtRisk;
