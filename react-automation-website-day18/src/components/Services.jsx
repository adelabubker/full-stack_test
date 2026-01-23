import React from 'react';
import useServices from '../hooks/useServices';
import ServiceCard from './ServiceCard';

const Services = ({ onServiceClick }) => {
  const {
    services,
    topService,
    searchTerm,
    activeFilter,
    handleSearchChange,
    handleFilterChange
  } = useServices();

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI Services' },
    { id: 'workflow', label: 'Workflow' }
  ];

  return (
    <section id="services" className="services py-5">
      <div className="container">
        <h2 className="text-center mb-5">Our Automation Services</h2>
        
        <div className="search-filter-container">
          {/* Search Bar */}
          <div className="search-wrapper">
            <input
              type="text"
              id="searchInput"
              className="search-input"
              placeholder="Search services by name or description..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                data-filter={filter.id}
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Container */}
        <div className="row g-4" id="servicesContainer">
          {services.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted">
                No services found matching your criteria.
              </p>
            </div>
          ) : (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                topService={topService}
                onServiceClick={onServiceClick}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
