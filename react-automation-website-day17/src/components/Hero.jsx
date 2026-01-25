import React from 'react';

const Hero = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero py-5">
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-7">
            <h1>
              Automate.<br />
              Orchestrate.<br />
              Scale.
            </h1>
            <p className="lead">
              Enterprise-grade workflow automation powered by n8n and AI.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a 
                href="#services" 
                className="btn btn-light rounded-pill px-4"
                onClick={(e) => handleSmoothScroll(e, '#services')}
              >
                View Services
              </a>
              <a 
                href="#success-dashboard" 
                className="btn btn-outline-light rounded-pill px-4"
                onClick={(e) => handleSmoothScroll(e, '#success-dashboard')}
              >
                See Success Stories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
