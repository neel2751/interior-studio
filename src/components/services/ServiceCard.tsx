import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types/service';
import Badge from '@/components/common/Badge';
import OptimizedImage from '@/components/common/OptimizedImage';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-16/10 bg-gray-200 overflow-hidden relative">
        <OptimizedImage
          src={service.image}
          alt={service.title}
          fill
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium mb-2">{service.title}</p>
          <div className="flex items-center text-sm">
            <span>Learn more</span>
            <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={service.icon}
              alt={service.title}
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
            {service.title}
          </h3>
        </div>
        
        <p className="text-gray-600 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
