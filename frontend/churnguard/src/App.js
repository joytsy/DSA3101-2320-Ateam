import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginSignUp /> } />
        <Route path="/Home" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
