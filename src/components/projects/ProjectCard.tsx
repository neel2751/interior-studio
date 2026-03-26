import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, Eye } from 'lucide-react';
import { Project } from '@/types/project';
import Badge from '@/components/common/Badge';
import OptimizedImage from '@/components/common/OptimizedImage';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
        <OptimizedImage
          src={project.images[0]}
          alt={project.title}
          fill
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-4 left-4">
          <Badge 
            variant={project.category === 'residential' ? 'residential' : 'commercial'} 
            size="sm"
          >
            {project.category}
          </Badge>
        </div>
        
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge variant="featured" size="sm">
              Featured
            </Badge>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{project.completionDate}</span>
            </div>
          </div>
          <div className="flex items-center mt-3 text-sm font-medium">
            <Eye size={16} className="mr-1" />
            <span>View Details</span>
            <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
            {project.title}
          </h3>
          
          <p className="text-gray-600 line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{project.completionDate}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <span>View details</span>
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
