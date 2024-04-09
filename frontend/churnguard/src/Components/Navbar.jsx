import React, {useState} from 'react'
import './Navbar.css';

function Navbar() {
    const [active, setActive] = useState("nav__menu");
  return (
    <nav className="nav">
        <a href="#" className="nav__brand">Churnguard</a>
        <ul className={active}>
            <li className="nav__item"><a href="#" className="nav__link">Home</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Dashboard</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Chatbot</a></li>
        </ul>
        <div className="nav__toggler">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </nav>
  )
}

export default Navbar;
