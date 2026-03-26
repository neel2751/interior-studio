'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';
import ProjectCard from '@/components/projects/ProjectCard';
import Section from '@/components/common/Section';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesFeatured = !showFeaturedOnly || project.featured;
    return matchesCategory && matchesFeatured;
  });

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
  ];

  return (
    <div className="space-y-12">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of transformative interior design projects, from modern residences to innovative commercial spaces.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value as typeof filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === category.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700">Featured only</span>
          </label>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="text-sm text-gray-500 mb-4">
            Showing {filteredProjects.length} of {PROJECTS.length} projects
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Have a Project in Mind?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let&#39;s collaborate to create a space that reflects your vision and exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 inline-block text-center"
            >
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="border border-gray-900 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300 inline-block text-center"
            >
              Our Services
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
