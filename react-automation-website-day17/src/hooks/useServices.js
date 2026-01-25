import { useState, useCallback, useMemo } from 'react';
import servicesData from '../data/servicesData';

const useServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Find most popular service
  const topService = useMemo(() => {
    return servicesData.reduce((max, service) => 
      service.popularity > max.popularity ? service : max
    );
  }, []);

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let result = servicesData;

    // Filter by category
    if (activeFilter !== 'all') {
      result = result.filter(service => service.category === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(service =>
        service.title.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [searchTerm, activeFilter]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  return {
    services: filteredServices,
    topService,
    searchTerm,
    activeFilter,
    handleSearchChange,
    handleFilterChange
  };
};

export default useServices;
