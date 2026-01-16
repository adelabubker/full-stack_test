import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">K8</a>
        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Services</a>
          <a href="#" className="nav-link">Success</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;