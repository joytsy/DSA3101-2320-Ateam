import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const [data,setData] =useState([{}])

  useEffect(() => {
    fetch("/data").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ <LoginSignUp /> } />
        <Route path="/Home" element={ <Home /> } /> */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;