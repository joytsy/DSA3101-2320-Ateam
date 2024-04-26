import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientData, getSuggestion } from '../services/apiService';
import Navbar from "./../Navbar.jsx";
import {tokens} from "../../theme.js";
import { Typography, useTheme } from "@mui/material";

function Customer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        <p key={key} style={{ color: 'white' }}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {customer[key]}</p>
      ))}
    </div>
  );

  return (
    
    <div className="customer_detail_page">
      <div class="left">
        <Navbar/ >
        <div className='customer-detail-container'>
          <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 10px 10px" }}
                >Customer Profile & Suggestions: {customer.Name}, {customer.Persona}
                </Typography> 
          <div className="customer-detail" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 50, marginLeft: "20px", marginRight: "20px"}}>
          <div>
            <Typography
            variant="h4"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 10px 0", textDecoration: "underline" }}>
              Personal Information
              </Typography>
              {renderDataColumn(personalInfo)}
            </div>
            <div>
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 10px 0", textDecoration: "underline" }}
              >
                Engagement Information
              </Typography>
              {renderDataColumn(engagementInfo)}
            </div>
            <div>
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 1px 0", textDecoration: "underline"}}
              >
                Support Information
              </Typography>
              {renderDataColumn(supportInfo)}
            </div>
            <div style={{ gridColumn: "1 / -1"}}> 
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0"}}
                >
                  Suggestions for the Customer
                </Typography>
              <textarea className="response-area" readOnly value={suggestions} placeholder="Loading suggestions..." style={{ height: '200px', width: '100%', backgroundColor: '#8d7cabb7' }}></textarea> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
