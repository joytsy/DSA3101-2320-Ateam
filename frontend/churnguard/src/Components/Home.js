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
                </div>
            </div>
        </div>
    );
} 


export default Home; 
