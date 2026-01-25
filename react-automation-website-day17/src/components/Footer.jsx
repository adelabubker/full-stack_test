import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="developer-credit">
            <h3>K8</h3>
            <p>Automation Solutions Developer | n8n Specialist</p>
          </div>
        </div>
        <div className="copyright">
          <p>
            &copy; <span id="currentYear">{currentYear}</span> K8 Automation Solutions. 
            All rights reserved. | Developed with by <a href="#">K8</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
