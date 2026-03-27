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
import FadeInSection from '@/components/common/FadeInSection';
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

      <FadeInSection direction="up" delay={0} duration={0.6}>
        <ServicesPreview />
      </FadeInSection>

      <FadeInSection direction="left" delay={0.1} duration={0.7}>
        <ServicesGrid />
      </FadeInSection>

      <FadeInSection direction="scale" delay={0} duration={0.8}>
        <FeaturedProjects />
      </FadeInSection>

      <FadeInSection direction="right" delay={0.1} duration={0.7}>
        <AboutSection />
      </FadeInSection>

      <FadeInSection direction="up" delay={0} duration={0.6}>
        <AwardsSection />
      </FadeInSection>

      <FadeInSection direction="left" delay={0.1} duration={0.7}>
        <FurnitureSlider />
      </FadeInSection>

      <FadeInSection direction="rotate" delay={0} duration={0.8}>
        <ContactCallback />
      </FadeInSection>

      <FadeInSection direction="up" delay={0.1} duration={0.6}>
        <LatestPosts />
      </FadeInSection>
    </div>
  );
}