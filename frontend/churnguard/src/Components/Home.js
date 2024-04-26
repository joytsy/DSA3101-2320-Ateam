import React, { useState, useEffect } from 'react';
import { testHealth, deleteDatabase, uploadFile } from './services/apiService'; 
import './Home.css';
import Navbar from './Navbar.jsx';

function Home () {
    return (
        <div className='home_body'>
             <Navbar />
             <div className="home-background">
                <div className="header">
                    <h1>Welcome to Churnguard!</h1>
                    <h3>Your dedicated solution for predicting and preventing customer churn.</h3>
                </div>
                <div className="navigation-text">
                    <p>Navigate to the Dashboard for customer churn prediction analysis and metrics.</p>
                    <p className="space-between-texts">Navigate to the Customer Table for detailed information about each customer.</p>
                </div>
            </div>
        </div>
    );
};


export default Home; 
