import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import CustomerTable from './Components/CustomerTable/CustomerTable';
import Customer from './Components/Customer/Customer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginSignUp /> } />
        <Route path="/Home" element={ <Home /> } />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CustomerTable" element={<CustomerTable />} />
        <Route path="/customer/:id" element={<Customer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;