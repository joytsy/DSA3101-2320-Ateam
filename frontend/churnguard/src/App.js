import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import CustomerData from './Components/CustomerData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginSignUp /> } />
        <Route path="/Home" element={ <Home /> } />
        <Route path="/Dashboard" element={ <Dashboard /> } /> 
        <Route path="/CustomerData" element={ <CustomerData /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
