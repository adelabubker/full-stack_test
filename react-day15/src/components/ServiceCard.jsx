import React from 'react';

function ServiceCard({ service }) {
  const { title, description, isPopular } = service;

  const handleClick = () => {
    alert(`Selected: ${title}\n\nWe'll contact you about this service soon!`);
  };

  return (
    <div className="service-card">

      {isPopular && <div className="popular-badge">Most Popular</div>}

      <h3 className="card-title">
        {title}
      </h3>

      <p className="card-description">{description}</p>
      

      <button className="card-btn" onClick={handleClick}>
        GET THE SERVICE
      </button>
    </div>
  );
}

export default ServiceCard;