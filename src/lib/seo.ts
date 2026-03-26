import { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SEO_DEFAULTS } from './constants';

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDescription = description || SITE_DESCRIPTION;
  const pageImage = image || SEO_DEFAULTS.ogImage;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'interior design',
      'residential design',
      'commercial design',
      'office design',
      'hospitality design',
      'Mumbai interior designer',
      'interior studio',
      'home renovation',
      'office renovation',
      'space planning',
      ...keywords,
    ],
    openGraph: {
      type,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard as 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export function generateJsonLd({
  type,
  data,
}: {
  type: 'Organization' | 'Service' | 'Article' | 'WebPage';
  data: any;
}) {
  switch (type) {
    case 'Organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description: SITE_DESCRIPTION,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Design District',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          postalCode: '400001',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91 98765 43210',
          contactType: 'customer service',
          availableLanguage: 'English',
        },
        sameAs: [
          'https://instagram.com/interiorstudioltd',
          'https://linkedin.com/company/interior-studio-ltd',
          'https://facebook.com/InteriorStudioLtd',
        ],
      };

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: {
          '@type': 'Place',
          name: 'Mumbai, Maharashtra, India',
        },
      };

    case 'Article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logo.png`,
          },
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        image: data.image,
        url: data.url,
      };

    case 'WebPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: data.url,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
        breadcrumb: data.breadcrumb,
        mainEntity: data.mainEntity,
      };

    default:
      return null;
  }
}

export function generateBreadcrumb(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateFAQ(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
