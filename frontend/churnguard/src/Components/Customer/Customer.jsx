import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientData, getSuggestion } from '../services/apiService';

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState('');  // Placeholder for LLM suggestions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData(id);
        setCustomer(data)
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      }
      try {
      const suggestions = await getSuggestion(id);
      setSuggestions(suggestions);
      } catch (error){
        
      }
    };

    fetchData();
  }, [id]); 

  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Loading...</div>;

  const personalInfo = ['Name', 'Gender', 'Age', 'Balance', 'Email', 'Country', 'CustomerID', 'DaysSinceLastTransaction', 'EstimatedSalary', 'HousingStatus',
                        'DebitCard', 'FlexiLoan', 'SavingsAccount'];
  const engagementInfo = ['CustomerEngagementScore', 'CustomerSatisfactionSurvey', 'CustomerServiceCalls', 'NPS'];
  const supportInfo = ['NavigationDifficulty', 'NumberOfAppCrashes', 'TechSupportTicketCount', 'UserFrustration'];

  const renderDataColumn = (keys) => (
    <div className="data-column">
      {keys.map(key => (
        <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {customer[key]}</p>
      ))}
    </div>
  );

  return (
    <div className="customer-profile">
      <h2>Customer Profile & Suggestions: {customer.Name} </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr) 3fr", gridGap: 50 }}>
        {renderDataColumn(personalInfo)}
        {renderDataColumn(engagementInfo)}
        {renderDataColumn(supportInfo)}
        <div style={{ gridColumn: "1 / -1" }}> 
          <h3>Suggestions for the Customer</h3>
          <textarea className="response-area" readOnly value={suggestions} placeholder="Loading suggestions..." style={{ height: '200px', width: '100%' }}></textarea> 
        </div>
      </div>
    </div>
  );
}

export default Customer;
