import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  // Default credentials
  const defaultUsername = 'balaji';
  const defaultPassword = '2002';

  // State for form inputs and login status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Check credentials
    if (username === defaultUsername && password === defaultPassword) {
      setIsLoggedIn(true);
      navigate('/data-table', { state: { username } }); // Navigate and pass the username
    } else {
      alert('Invalid credentials!');
    }
  };

  // Handle input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <h2 className="welcome-message">Welcome, {username}!</h2>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
