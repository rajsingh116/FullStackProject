import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div><strong>Project Management</strong></div>
      <div className="nav-links">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <span style={{marginRight:12}}>Hi, {user.name}</span>}
        {user && <button onClick={logout} className="btn btn-outline">Logout</button>}
      </div>
    </div>
  );
}

export default Navbar;
