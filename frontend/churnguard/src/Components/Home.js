import React, { useState, useEffect } from 'react';
import { testHealth, deleteDatabase, uploadFile } from './services/apiService'; // Ensure the path matches your file structure
import './Home.css';
import Navbar from './Navbar.jsx';

function Home () {
    const [data, setData] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // for uploading data

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await testHealth();
                setData(result);
                console.log(result); // Check that 'Good' appears in console to check link to API
            } catch (error) {
                console.log('Error fetching data:', error);
                // Optionally handle the error in your UI
            }
        };

        loadData();
    }, []);

    const userDeleteDatabase = async () => {
        try {
            const confirmation = window.confirm('Are you sure you want to delete all data from the database? This action cannot be undone.');
            if (confirmation) {
                await deleteDatabase();
                alert('Database successfully deleted.');
                setData(null);
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Capture the selected file
    };
    
    const userUpload = async () => {
        if (!selectedFile) {
        alert('Please select a file first.');
        return;
        }
    
        try {
        const result = await uploadFile(selectedFile);
        alert(result); // Notify the user about the upload result
        setSelectedFile(null); // Reset/clear the file selection
        } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.'); // Notify the user about the failure
        }
    };

    return (
        <div>
             <Navbar />
             <div className="home-background">
                <div className="header">
                    <h1>Welcome to Churnguard!</h1>
                    <h3>Your dedicated solution for predicting and preventing customer churn.</h3>
                </div>
            </div>
            <button onClick={userDeleteDatabase}>Delete Database</button>
            <div>
                <input type="file" onChange={handleFileChange} accept=".xlsx" />
                <button onClick={userUpload}>Upload File</button>
            </div>
        </div>
    );
};


export default Home; 
