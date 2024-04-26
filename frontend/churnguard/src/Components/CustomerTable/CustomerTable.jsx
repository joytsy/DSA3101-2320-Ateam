import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './CustomerTable.css';
import Navbar from "./../Navbar.jsx";
import {tokens} from "../../theme.js";
import { Typography, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';


function CustomerTable() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);

    // lookup tables for certain columns of data to be translated
    const employmentStatusLabel = {
        '1': 'Full-time',
        '0': 'Part-time/Unemployed'
      };
    const housingStatusLabel = {
        '1': 'Owned',
        '0': 'Rented/No property'
      };  
    const activeMemberStatusLabel = {
        '1': 'Active',
        '0': 'Inactive'
      };
    const debitCardLabel = {
        '1': 'Yes',
        '0': 'No'
      };
    const savingsAccountLabel = {
        '1': 'Yes',
        '0': 'No'
      };
    const flexiLoanLabel = {
        '1': 'Yes',
        '0': 'No'
      };
    

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/data");
            setData(response.data);
            setFilteredData(response.data.slice(0, rowsPerPage)); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [rowsPerPage]);
    


    // Create Customer ID search bar
    useEffect(() => {
        // Filter data based on search term
        const filtered = data.filter(user => {
            // Convert user.CustomerID to string before using includes
            const customerIdString = String(user.CustomerID);
            // Check if customerIdString contains the searchTerm
            return customerIdString.startsWith(searchTerm);
        });
        setFilteredData(filtered.slice(0, rowsPerPage)); // Update filtered data and reset to first page
        setCurrentPage(1); // Reset to first page
    }, [searchTerm, data,rowsPerPage]);
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        // Filter data based on search term when the form is submitted
        const filtered = data.filter(user => {
            // Convert user.CustomerID to string before using includes
            const customerIdString = String(user.CustomerID);
            // Check if customerIdString contains the searchTerm
            return customerIdString.includes(searchTerm);
        });
        setFilteredData(filtered);
    };
    
    // create pages for all customer records with 10 records per page
    useEffect(() => {
        // Update filtered data based on current page
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setFilteredData(data.slice(startIndex, endIndex));
    }, [currentPage, data, rowsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(data.length / rowsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
    <div className='cust_table_body'> 
        <div class="left">
        <Navbar/ >
        <div className='customer-table-container'>
            <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 3px 0" }}
            >
            Customer Details
            </Typography>
            <Typography variant="h4" color="#e0e0e0" mb="20px">
            Detailed breadown of customer details
            </Typography>
            <Typography variant="h5" color="#e0e0e0" mb="5px">
                Click on each customer ID number to view more details of each customer. 
                </Typography>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by Customer ID"
                />
                <button type="submit">Search</button>
            </form>
            <table className='customer-table'>
                    <thead>
                        <tr> 
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Persona</th> 
                            <th>Employment Status</th>
                            <th>Housing Status</th>
                            <th>Member Status</th>
                            <th>Country of Residence</th>
                            <th>Estimated Salary</th>
                            <th>Balance</th>
                            <th>Gender</th>
                            <th>Number of Products Used</th>
                            <th>Debit Card Subscription</th>
                            <th>Savings Account Opened</th>
                            <th>Has Flexi Loan from GXS</th>
                            <th>Tenure</th>
                            <th>Days Since Last Transaction</th>
                            <th>Customer Engagement Score</th>
                            <th>Tech Support Ticket Score</th>
                            <th>Number of App Crashes Faced</th>
                            <th>Navigation Difficulty</th>
                            <th>User Frustration</th>
                            <th>Customer Satisfaction Survey Score</th>
                            <th>Customer Service Calls</th>
                            <th>Net Promoter Score</th>
                            <th>Churn</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(user => (
                            <tr key={user.CustomerID}>
                                <td><Link to={`/customer/${user.CustomerID}`}>{user.CustomerID}</Link></td>
                                <td>{user.Name}</td>
                                <td>{user.Age}</td>
                                <td>{user.Email}</td>
                                <td>{user.Persona}</td>
                                <td>{employmentStatusLabel[user.EmploymentStatus]}</td>
                                <td>{housingStatusLabel[user.HousingStatus]}</td>
                                <td>{activeMemberStatusLabel[user.ActiveMember]}</td>
                                <td>{user.Country}</td>
                                <td>{user.EstimatedSalary}</td>
                                <td>{user.Balance}</td>
                                <td>{user.Gender}</td>
                                <td>{user.ProductsNumber}</td>
                                <td>{debitCardLabel[user.DebitCard]}</td>
                                <td>{savingsAccountLabel[user.SavingsAccount]}</td>
                                <td>{flexiLoanLabel[user.FlexiLoan]}</td>
                                <td>{user.Tenure}</td>
                                <td>{user.DaysSinceLastTransaction}</td>
                                <td>{user.CustomerEngagementScore}</td>
                                <td>{user.TechSupportTicketCount}</td>
                                <td>{user.NumberOfAppCrashes}</td>
                                <td>{user.NavigationDifficulty}</td>
                                <td>{user.UserFrustration}</td>
                                <td>{user.CustomerSatisfactionSurvey}</td>
                                <td>{user.CustomerServiceCalls}</td>
                                <td>{user.NPS}</td>
                                <td>{user.Churn}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            <div>
                <span>Page</span>
                <input
                    type="number"
                    min="1"
                    max={Math.ceil(data.length / rowsPerPage)}
                    value={currentPage}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setCurrentPage(value);
                    }}
                />
                <span>of {Math.ceil(data.length / rowsPerPage)}</span>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handleNextPage()} disabled={currentPage >= Math.ceil(data.length / rowsPerPage)}>
                    Next
                </button>
            </div>
        </div>
        </div>
    </div>       
    );
}

export default CustomerTable;

