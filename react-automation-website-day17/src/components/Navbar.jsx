import React from 'react';

const Navbar = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top nav-blur">
      <div className="container align-items-center">
        <a className="logo" href="#" onClick={(e) => handleSmoothScroll(e, '#')}>
          K8
        </a>
        <div className="mx-auto">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <a 
                className="nav-link active" 
                href="#"
                onClick={(e) => handleSmoothScroll(e, '#')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#services"
                onClick={(e) => handleSmoothScroll(e, '#services')}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#success-dashboard"
                onClick={(e) => handleSmoothScroll(e, '#success-dashboard')}
              >
                Success
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <a href="#audit" className="btn btn-outline-light rounded-pill px-4">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
