# Interior Studio Ltd Website

A modern, responsive portfolio and service platform for Interior Studio Ltd, built with Next.js, TypeScript, and Tailwind CSS.

## 🏢 Project Overview

Interior Studio Ltd is a comprehensive interior design website that showcases the company's portfolio, services, and design process while enabling potential clients to explore services and request consultations.

### Key Features

- **Homepage**: Hero section with featured projects, services preview, and design process overview
- **Services Pages**: Detailed service offerings for residential, commercial, office, and hospitality design
- **Portfolio Gallery**: Filterable project showcase with detailed case studies and image galleries
- **Design Process**: Step-by-step explanation of the design workflow
- **Contact Form**: Functional consultation request form with validation and API integration
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Meta tags, structured content, and search engine indexing

### Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Form Handling**: Next.js API Routes
- **Deployment**: Ready for Vercel, Netlify, or AWS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interior-studio-ltd
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
interior-studio-ltd/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   └── process/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage
│   │   ├── layout.tsx               # Root layout
│   │   ├── services/
│   │   │   ├── page.tsx            # Services listing
│   │   │   └── [slug]/page.tsx     # Individual service
│   │   ├── projects/
│   │   │   ├── page.tsx            # Projects gallery
│   │   │   └── [id]/page.tsx       # Project details
│   │   ├── process/page.tsx        # Design process
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── api/contact/route.ts    # Contact API
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── common/                 # Shared components
│   │   ├── home/                   # Homepage components
│   │   ├── services/               # Service components
│   │   ├── projects/               # Project components
│   │   ├── process/                # Process components
│   │   └── contact/                # Contact components
│   ├── lib/
│   │   └── constants.ts            # App constants & data
│   ├── types/                      # TypeScript definitions
│   └── styles/                     # Additional styles
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎨 Design System

### Colors
- **Primary**: Gray scale palette (gray-900 to gray-50)
- **Background**: White and gray-50 for sections
- **Text**: Gray-900 for headings, gray-600 for body text

### Typography
- **Font**: Inter (system-ui fallback)
- **Headings**: Bold weights with responsive sizing
- **Body**: Regular weight with optimal line height

### Components
- **Buttons**: Primary (filled) and Secondary (outlined) variants
- **Cards**: Hover effects with subtle shadows
- **Forms**: Focus states with gray-900 theme
- **Navigation**: Fixed header with mobile menu

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Contact form email (for production)
CONTACT_EMAIL=info@interiorstudioltd.com

# CRM integration (optional)
ZOHO_API_KEY=your_zoho_api_key
```

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations (fade-in, slide-up)
- Inter font family
- Responsive breakpoints

## 📱 Features Implementation

### Homepage
- Hero section with call-to-action buttons
- Featured projects carousel
- Services preview with icons
- Design process overview
- Contact form integration

### Services
- Service cards with hover effects
- Detailed service pages with process steps
- Feature highlights and project examples
- Call-to-action sections

### Portfolio
- Filterable project gallery
- Project detail pages with image lightbox
- Category filtering (residential/commercial)
- Project metadata display

### Contact Form
- Form validation
- API route integration
- Success/error handling
- Spam protection ready

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Performance

- **Page Load**: Under 3 seconds
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Mobile Optimized**: Responsive design with touch-friendly interactions
- **Image Optimization**: Next.js Image component ready

## 🔍 SEO Features

- Meta tags for all pages
- Open Graph tags
- Structured data
- Semantic HTML5
- Alt text for images
- Clean URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Interior Studio Ltd.

## 📞 Support

For technical support or questions:
- Email: info@interiorstudioltd.com
- Phone: +91 98765 43210

---

**Built with ❤️ for Interior Studio Ltd**
