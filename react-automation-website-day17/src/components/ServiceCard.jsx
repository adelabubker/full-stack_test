import React from 'react';

const ServiceCard = ({ service, topService, onServiceClick }) => {
  const isTopService = service.id === topService.id;

  return (
    <div className="col-md-6 col-lg-4">
      <div
        className={`service-card ${isTopService ? 'top-service' : ''}`}
        data-service={service.title}
        data-category={service.category}
      >
        {isTopService && <div className="top-badge">Most Popular</div>}
        <div className="card-body">
          <h5 className="card-title">{service.title}</h5>
          <p className="card-text">{service.description}</p>
          <button 
            className="service-cta"
            onClick={() => onServiceClick(service.title)}
          >
            Get the service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
