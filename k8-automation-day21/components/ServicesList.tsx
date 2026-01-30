'use client';

import { useContext } from 'react';
import { FilterContext } from './SearchAndFilter';
import ServiceCard from './ServiceCard';
import type { Service } from '@/app/services/page';

type Props = {
  initialServices: Service[];
};

export default function ServicesList({ initialServices }: Props) {
  const { searchQuery, activeFilter } = useContext(FilterContext);

  // Client-side filtering based on search and category
  const filteredServices = initialServices.filter((service) => {
    const matchesSearch =
      searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' || service.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No services found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
