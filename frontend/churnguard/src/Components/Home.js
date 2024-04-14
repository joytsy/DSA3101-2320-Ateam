import React from 'react';
import './Home.css';
import Navbar from './Navbar.jsx';

function Home () {
    return (
        <div>
             <Navbar />
             <div className="home-background">
                <div className="header">
                    <h1>Welcome to Churnguard!</h1>
                    <h3>Your dedicated solution for predicting and preventing customer churn.</h3>
                </div>
            </div>
        </div>
    );
} 


export default Home; 
