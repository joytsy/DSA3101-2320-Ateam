import React, { useState, useEffect } from 'react';
import './LoginSignUp.css';
import Axios from 'axios';
import { registerUser } from '../services/apiService';
import { loginUser } from '../services/apiService';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignUp = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [canLogin, setCanLogin] = useState(false);

    const isFormFilled = () => {
        return action === "Login" ? name.trim() !== "" && password.trim() !== "" :
                                   name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
    }

    const toggleAction = () => {
        setAction(currentAction => currentAction === "Login" ? "Sign Up" : "Login");
    }

    const redirectToHome = () => {
        window.location.href = '/home';
    }

    const handleRegister = async () => {
        if (isFormFilled()) {
            try {
                const result = await registerUser(name, password);
                alert('Registration successful, you can now login.');
                toggleAction();  // Switch to login after successful registration
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleLogin = async () => {
        if (isFormFilled()) {
            try {
                const result = await loginUser(name, password);
                if (result.message === "Login successful") {
                    setCanLogin(true);
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        if (canLogin === true) {
            redirectToHome(); // Call redirectToHome if action changes from false to true
        }
    }, [canLogin]); // useEffect will trigger whenever 'canLogin' state changes


    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="user icon" />
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                {action !== "Login" && (
                    <div className="input">
                        <img src={email_icon} alt="email icon" />
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                )}
                <div className="input">
                    <img src={password_icon} alt="password icon" />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="submit-container">
                {action === "Sign Up" && (
                    <button className={isFormFilled()? "submit": "submit gray"} onClick={handleRegister} disabled={!isFormFilled()} style={{ opacity: isFormFilled() ? 1 : 0.5 }}>
                        Sign Up
                    </button>
                )}
                {action === "Login" && (
                    <button className={isFormFilled()? "submit": "submit gray"}  onClick={handleLogin} disabled={!isFormFilled()} style={{ opacity: isFormFilled() ? 1 : 0.5 }}>
                        Login to Churnguard
                    </button>
                )}
                <button className="switch" onClick={toggleAction}>
                    {action === "Login" ? "Create Account" : "Login Page"}
                </button>
            </div>
        </div>
    );
}

export default LoginSignUp;
