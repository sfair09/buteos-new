import { Inter } from "next/font/google";
import "./globals.css";
import "./ads.css";
import LayoutClient from './layout.client';
import CookieBanner from '@/components/CookieBanner';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://buteossystems.com'),
  title: {
    default: 'Buteos Systems - Custom Software Development, AI Agents & Digital Marketing Solutions',
    template: '%s | Buteos Systems'
  },
  description: 'Custom software development, AI agents, and SaaS solutions company specializing in digital marketing automation. Houston-based with global reach, offering Buteos Nest (digital foundation), Buteos Flight (growth partnership), and Buteos Talon (AI transformation) for businesses worldwide.',
  keywords: ['custom software development', 'AI agents', 'SaaS development', 'AI development', 'software development', 'artificial intelligence agents', 'custom AI solutions', 'machine learning development', 'Houston software development', 'Texas AI development', 'custom software solutions', 'AI automation', 'intelligent agents', 'conversational AI', 'AI chatbots', 'business automation software', 'enterprise software development', 'SaaS platform development', 'AI-powered software', 'digital transformation', 'Houston digital marketing', 'Texas hospitality marketing', 'marketing automation', 'AI marketing tools', 'custom CRM development', 'business intelligence software', 'data analytics solutions', 'cloud software development', 'API development', 'web application development', 'mobile app development', 'AI integration services', 'software consulting', 'technology solutions', 'digital innovation'],
  openGraph: {
    title: 'Buteos Systems - Custom Software Development & AI Agents',
    description: 'Custom software development, AI agents, and SaaS solutions with global reach. Specializing in AI development, custom software, and digital marketing automation for businesses worldwide.',
    url: '/',
    siteName: 'Buteos Systems',
    images: [
      {
        url: '/bs_logo_nobg.png',
        width: 800,
        height: 600,
        alt: 'Buteos Systems Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buteos Systems - Custom Software Development & AI Agents',
    description: 'Custom software development, AI agents, SaaS solutions. Global software development company specializing in AI development and business automation.',
    images: ['/bs_logo_nobg.png'],
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
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-STDJ6RHJDJ"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-STDJ6RHJDJ');
            `}
          </Script>
          {/* Facebook SDK */}
          
          <Script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0"
            strategy="lazyOnload"
          />
          {/* AdSense: insert raw script tag (avoid Next.js Script to prevent data-nscript attribute) */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5237952856914802"
            crossOrigin="anonymous"
            data-ad-client="ca-pub-5237952856914802"
          ></script>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <meta name="author" content="Buteos Systems" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Houston" />
        <meta name="ICBM" content="29.7604, -95.3698" />
        <meta name="DC.title" content="Buteos Systems - Custom Software Development & AI Agents" />
        <meta name="DC.subject" content="Custom Software Development, AI Agents, SaaS Development, AI Development" />
        <meta name="language" content="en" />
        <meta name="distribution" content="global" />
      </head>
      <body className={inter.className}>
        <LayoutClient />
        <CookieBanner />
        <div className="logo-container">
          <a href="/">
            <img src="/bs_logo_nobg.png" alt="Buteos Systems Logo" className="logo-image" />
          </a>
        </div>
        <div className="main-layout">
          <main className="main-content">
            {children}
          </main>
        </div>
        <footer>
          <div className="container">
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} Buteos Systems. All Rights Reserved.</p>
              <div 
                className="fb-share-button" 
                data-href="https://buteossystems.com" 
                data-layout="" 
                data-size=""
              >
                <a 
                  target="_blank" 
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbuteossystems.com%2F&src=sdkpreparse" 
                  className="fb-xfbml-parse-ignore"
                  rel="noreferrer"
                >
                  Share
                </a>
              </div>
            </div>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/book">Book an Appointment</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </footer>

        
        {/* Structured data for organization */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'SoftwareApplication', 'TechnologyCompany'],
              '@id': 'https://buteossystems.com/#business',
              name: 'Buteos Systems',
              image: '/bs_logo_nobg.png',
              telephone: '',
              email: 'info@buteossystems.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                addressLocality: 'Houston',
                addressRegion: 'TX',
                postalCode: '77001',
                addressCountry: 'US'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 29.7604,
                longitude: -95.3698
              },
              url: 'https://buteossystems.com',
              sameAs: [
                'https://twitter.com/buteossystems',
                'https://www.linkedin.com/company/buteos-systems',
                'https://www.facebook.com/buteossystems'
              ],
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '17:00'
              },
              priceRange: '$$',
              servedCuisine: null,
              acceptsReservations: true
            })
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Buteos Systems',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://buteossystems.com',
              logo: '/bs_logo_nobg.svg',
              description: 'Custom software development and AI agents company specializing in SaaS solutions, AI development, and digital marketing automation with global reach',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Houston',
                addressRegion: 'TX',
                addressCountry: 'US',
                postalCode: '77001'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '',
                contactType: 'customer service',
                email: 'info@buteossystems.com',
                areaServed: ['Houston', 'Texas', 'US', 'North America', 'Global'],
                availableLanguage: 'English'
              },
              sameAs: [
                'https://twitter.com/buteossystems',
                'https://www.linkedin.com/company/buteos-systems',
                'https://www.facebook.com/buteossystems'
              ],
              serviceType: [
                'Custom Software Development',
                'AI Agent Development',
                'SaaS Development',
                'AI Development',
                'Software Development',
                'Artificial Intelligence Solutions',
                'Machine Learning Development',
                'Business Automation Software',
                'API Development',
                'Web Application Development',
                'Digital Marketing',
                'Marketing Automation',
                'AI Chatbot Development',
                'Enterprise Software Solutions',
                'Cloud Software Development'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Software Development & AI Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Buteos Nest - Digital Foundation',
                      description: 'Complete digital foundation with custom software development, AI integration, and digital marketing setup'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Buteos Flight - Growth Partnership',
                      description: 'Comprehensive growth partnership with custom software solutions, AI agents, and marketing automation'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Buteos Talon - AI Transformation',
                      description: 'Full AI transformation with custom AI agents, SaaS development, and intelligent automation systems'
                    }
                  }
                ]
              }
            })
          }}
        />
      </body>
    </html>
  );
}