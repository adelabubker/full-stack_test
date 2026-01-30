'use client';

import type { Service } from '@/app/services/page';

type Props = {
  service: Service;
};

export default function ServiceCard({ service }: Props) {
  const handleGetService = () => {
    // Client-side interaction
    alert(`Requesting service: ${service.title}`);
    // In production, this would navigate or open a modal
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-400 transition-all duration-300 relative overflow-hidden group">
      {/* Popular Badge */}
      {service.isPopular && (
        <div className="absolute top-4 right-4 bg-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      {/* Service Title */}
      <h3 className="text-xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors">
        {service.title}
      </h3>

      {/* Service Description */}
      <p className="text-gray-400 mb-6 min-h-[60px]">
        {service.description}
      </p>

      {/* CTA Button */}
      <button
        onClick={handleGetService}
        className="w-full bg-orange-400 hover:bg-orange-500 text-black font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105"
      >
        GET THE SERVICE
      </button>
    </div>
  );
}
