import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientData } from '../services/apiService';

function Customer() {
  const { id } = useParams(); 
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData(id);
        setCustomer(data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      }
    };

    fetchData();
  }, [id]); 

  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customer Details</h1>
      <p>Name: {customer.Name}</p>
      <p>Email: {customer.Email}</p>
    </div>
  );
}

export default Customer;
