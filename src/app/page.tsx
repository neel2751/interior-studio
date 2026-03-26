import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import ServicesGrid from '@/components/home/ServicesGrid';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import AboutSection from '@/components/home/AboutSection';
import AwardsSection from '@/components/home/AwardsSection';
import FurnitureSlider from '@/components/home/FurnitureSlider';
import ContactCallback from '@/components/home/ContactCallback';
import LatestPosts from '@/components/home/LatestPosts';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Luxury Interior Design in Ahmedabad, India`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <div>
      <Hero />

      <ServicesPreview />

      <ServicesGrid />

      <FeaturedProjects />

      <AboutSection />

      <AwardsSection />

      <FurnitureSlider />

      <ContactCallback />

      <LatestPosts />
    </div>
  );
}