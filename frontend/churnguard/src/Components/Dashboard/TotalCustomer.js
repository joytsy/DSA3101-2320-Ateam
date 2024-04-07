// TotalCustomers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalCustomers = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data'); // API call to fetch customer data
        const transformedData = transformData(response.data); // Transform fetched data
        onDataFetched(transformedData); // Pass transformed data to parent component
      } catch (error) {
        console.error('Error fetching customer stats:', error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, [onDataFetched]); // Run effect whenever onDataFetched prop changes

  const transformData = (data) => {
    // Perform data transformation here if needed
    // For example, you can calculate total number of customers
    const totalCustomers = data.length;
    return { totalCustomers }; // Return transformed data
  };

  return null;
};

export default TotalCustomers;

