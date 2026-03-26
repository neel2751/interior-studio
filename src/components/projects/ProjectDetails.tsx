import { MapPin, Calendar, User, Tag } from 'lucide-react';
import { Project } from '@/types/project';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import Badge from '@/components/common/Badge';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{project.completionDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{project.client}</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              title="Design Concept"
              subtitle="The creative vision behind this transformation"
            />
            <p className="text-gray-600 leading-relaxed">
              {project.designConcept}
            </p>
          </div>

          <div>
            <SectionHeading
              title="Scope of Work"
              subtitle="Comprehensive services delivered"
            />
            <ul className="space-y-2">
              {project.scopeOfWork.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              title="Materials & Finishes"
              subtitle="Premium materials used in this project"
            />
            <div className="flex flex-wrap gap-2">
              {project.materials.map((material, index) => (
                <Badge key={index} variant="default" size="md">
                  {material}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500 mb-1">Category</dt>
                <dd className="font-medium text-gray-900 capitalize">
                  <Badge 
                    variant={project.category === 'residential' ? 'residential' : 'commercial'} 
                    size="sm"
                  >
                    {project.category}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 mb-1">Location</dt>
                <dd className="font-medium text-gray-900">{project.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 mb-1">Client</dt>
                <dd className="font-medium text-gray-900">{project.client}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 mb-1">Completion</dt>
                <dd className="font-medium text-gray-900">{project.completionDate}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Services Provided</h3>
            <ul className="space-y-2">
              {project.scopeOfWork.map((service, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center space-y-4">
            <h3 className="font-semibold text-gray-900">Inspired by this project?</h3>
            <Button href="/contact" className="w-full" size="lg">
              Start Your Project
            </Button>
            <Button variant="secondary" href="/projects" className="w-full" size="lg">
              View More Projects
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-xl p-8 text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Transform Your Space Like This
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Let's create something extraordinary together. Schedule a consultation to discuss your vision.
        </p>
        <Button href="/contact" className="bg-white text-gray-900 hover:bg-gray-100" size="lg">
          Book Consultation
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetails;
