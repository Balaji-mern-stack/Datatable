import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Person, BoxArrowRight } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; // Import the CSS file for the NavBar

const Layout = () => {
  const navigate = useNavigate();
  const username = "User"; // You may want to fetch this dynamically or pass it via context

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/client">Client</Link>
          </li>
          <li className="navbar-item">
            <Person size={20} color="black" className="navbar-icon" />
            <span className="navbar-welcome">Welcome, {username}!</span>
          </li>
          <li>
            <BoxArrowRight
              size={20}
              color="red"
              className="navbar-icon"
              onClick={handleLogout}
            />
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default Layout;
