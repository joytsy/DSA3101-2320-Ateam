import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    setErrorMessage('');  // Clear any existing error messages

    // Add login logic here (e.g., validation, API call)
    console.log('Username:', username);
    console.log('Password:', password);
        // Make an API call to the backend
    try {
      const response = await fetch('http://localhost:5000/login', {  // Make sure the URL matches your Flask app's URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Redirect to another page or update the state to show login is successful
      } else {
        // Display an error message from the server
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Failed to connect to the server.');
    }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
