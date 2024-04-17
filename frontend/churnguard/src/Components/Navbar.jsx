import React, {useState} from 'react'
import './Navbar.css';
import logo from './../churnguard logo.png';

function Navbar() {
    const [active, setActive] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");
    const navToggle = () => {
      if (active === "nav__menu") {
        setActive("nav__menu nav__active");
      } else setActive("nav__menu");
  
      // Icon Toggler
      if (toggleIcon === "nav__toggler") {
        setToggleIcon("nav__toggler toggle");
      } else setToggleIcon("nav__toggler");
    };
    // Function to redirect to the home page
    const redirectToHome = () => {
      window.location.href = '/home';
    };
    // Function to redirect to dashboard page
    const redirectToDashboard = () => {
      window.location.href = '/Dashboard';
    }; 
    // Function to redirect to customer table page
    const redirectToCustomerTable = () => {
      window.location.href = '/CustomerTable';
      console.log("dashbaord")
    };
    // Function to redirect to login page
    const redirectToLogin = () => {
      window.location.href = '/';
    };
    return (
      <nav className="nav">
        <a href="#" className="nav__brand">Churnguard</a>
        <ul className={active}>
          <li className="nav__item"><a className="nav__link" onClick={redirectToHome} style={{cursor:'pointer'}}>Home</a></li>
          <li className="nav__item"><a className="nav__link" onClick={redirectToDashboard} style={{cursor:'pointer'}}>Dashboard</a></li>
          <li className="nav__item"><a className="nav__link" onClick={redirectToCustomerTable} style={{cursor:'pointer'}}>Customer Table</a></li>
          <li className="nav__item"><a className="nav__link" onClick={redirectToLogin} style={{cursor:'pointer'}}>Logout</a></li>
        </ul>
        <div onClick = {navToggle} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
  );
}

export default Navbar;
