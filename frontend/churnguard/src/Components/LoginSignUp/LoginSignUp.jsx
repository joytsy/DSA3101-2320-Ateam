import React, { useState } from 'react';
import './LoginSignUp.css';
import Axios from 'axios';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignUp = () => {
    const [action, setAction] = useState("Login");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to check if all input fields are filled
    const isFormFilled = () => {
        if (action === "Login") {
            return email.trim() !== "" && password.trim() !== "";
        } else {
            return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
        }
    }

    // Function to handle toggling between sign up and login
    const toggleAction = () => {
        if (action === "Login") {
            if (isFormFilled()) {
                redirectToHome();
            } else {
                setAction("Sign Up");
            }
        } else {
            setAction("Login");
        }
    }

    // Function to redirect to the home page
    const redirectToHome = () => {
        window.location.href = '/home';
    }

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            name: setName,
            email: setEmail,
            password: setPassword,
        }).then((response) => {
            console.log(response);
        });
    } 

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
        });
    }   

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
            )}
            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={(e)=>{register(e);toggleAction(e);}}
                    disabled={!isFormFilled()}
                    style={{ opacity: isFormFilled() ? 1 : 0.5 }}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={(e)=>{login(e); toggleAction(e);}}
                >
                    Login
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp;
