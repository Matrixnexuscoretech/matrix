import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import Button from './Button';

interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  shortDescription: string;
  challenge: string;
  approach: string;
  tech: string[];
  result: string;
  clientQuote: string;
  image: string;
  liveUrl?: string;
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'E-Commerce',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      shortDescription: 'Scalable online marketplace with real-time inventory management',
      challenge: 'Client needed a fast, secure platform to handle 1K+ daily transactions with real-time inventory tracking.',
      approach: 'Built with React and Next.js for performance, Node.js backend, PostgreSQL database, and integrated Stripe for payments.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      result: 'Achieved 40% increase in conversion rate, 99.9% uptime, and handled Black Friday traffic spike of 2K concurrent users.',
      clientQuote: 'Matrix Nexus delivered beyond expectations. Our sales tripled in the first quarter.',
      image: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357134/Screenshot_2025-10-02_010653_juizyl.png?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      title: 'Restaurant Website',
      category: 'Hospitality',
      tags: ['React', 'Django', 'Payment Gateway'],
      shortDescription: 'Elegant online presence with reservations and food ordering system',
      challenge: 'The restaurant needed a modern website to showcase their menu, allow online reservations, and support food delivery orders.',
      approach: 'Developed a Django backend with a React frontend, integrated secure payment processing, and built an intuitive menu and reservation dashboard.',
      tech: ['React', 'Django', 'PostgreSQL', 'AWS', 'Payment APIs'],
      result: 'Boosted online reservations by 70%, increased delivery orders by 50%, and improved customer engagement with a sleek, mobile-friendly design.',
      clientQuote: 'Our new website has completely changed how customers interact with us. Online reservations and orders are seamless.',
      image: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357141/Screenshot_2025-10-02_011329_bbrjrq.png?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      title: 'Forex Trader And Tutor Website',
      category: 'Education',
      tags: ['React', 'Video Streaming', 'LMS'],
      shortDescription: 'Forex learning hub with live trading sessions and student mentorship',
      challenge: 'The client needed a professional platform to teach forex trading, host live sessions, share resources, and mentor students globally.',
      approach: 'Developed a React-based site with integrated video streaming for live trading classes, built a custom course module, and added mentorship tracking features.',
      tech: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS S3'],
      result: 'Attracted 5,000+ learners worldwide, improved engagement with 95% course completion rates, and scaled mentorship programs across 15 countries.',
      clientQuote: 'This platform has elevated my forex tutoring business — students can now learn, trade, and interact in real time. It’s a complete game changer.',
      image: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357131/Screenshot_2025-10-02_010855_agyo2m.png',
    },
    {
      id: 4,
      title: 'Rentals Management Website Dashboard',
      category: 'Real Estate',
      tags: ['React', 'Real-time', 'Payments Integration'],
      shortDescription: 'Complete rental property management platform with tenant and landlord dashboards',
      challenge: 'The client needed a centralized system to manage tenants, collect rent online, track maintenance requests, and generate reports for multiple rental properties.',
      approach: 'Built a responsive React dashboard with real-time notifications, secure online payments, tenant portals, and automated lease/maintenance tracking.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Stripe API'],
      result: 'Cut rent collection delays by 80%, improved tenant satisfaction with instant maintenance logging, and helped landlords manage 200+ units efficiently.',
      clientQuote: 'Managing our rental properties has never been this smooth. Payments, tenants, and reports — all in one place!',
      image: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357132/Screenshot_2025-10-02_011550_ewe9pz.png?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      title: 'Bar, Party Zone and Restaurant',
      category: 'Hospitality',
      tags: ['React', 'Next.js', 'Booking', 'E-commerce'],
      shortDescription: 'Vibrant hospitality website with reservations, menu showcase, and event bookings',
      challenge: 'The client needed a modern platform to manage restaurant reservations, promote party events, showcase menus, and enable online orders.',
      approach: 'Designed an engaging React + Next.js website with table booking, event ticketing, digital menu integration, and e-commerce for food & drinks.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe API'],
      result: 'Increased reservations by 60%, boosted event attendance by 45%, and streamlined online food & drink sales.',
      clientQuote: 'This platform completely elevated our business. Customers can now book tables, buy event tickets, and order online with ease.',
      image: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357140/Screenshot_2025-10-02_011249_cmt5uu.png?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      title: 'Electro Compare and Best Electronics Deals',
      category: 'E-Commerce',
      tags: ['React', 'Next.js', 'Price Comparison', 'E-commerce'],
      shortDescription: 'Smart electronics marketplace with price comparison and exclusive deals',
      challenge: 'Client needed a modern platform to compare electronics prices, showcase deals from multiple vendors, and allow direct purchases.',
      approach: 'Developed a React + Next.js platform with product search, price comparison engine, vendor integration, and secure checkout system.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe API'],
      result: 'Attracted 50,000+ monthly visitors, increased partner vendor sales by 70%, and processed 10,000+ secure transactions.',
      clientQuote: 'Shoppers love the price comparison feature. Our sales skyrocketed, and customers trust the platform for the best deals.',
      image: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357126/Screenshot_2025-10-02_011713_muyaad.png?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <>
      <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-white to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-electric-pink/5 via-vivid-purple/5 to-cyan-electric/5 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-neon-cyan/10 to-matrix-green/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-navy mb-6">
              Our <span className="text-cyan-electric">Portfolio</span>
            </h2>
            <p className="text-charcoal text-lg leading-relaxed">
              Real projects. Real results. Explore how we've helped businesses transform their digital presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-cyan-electric/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/0 via-matrix-green/0 to-electric-yellow/0 group-hover:from-cyan-electric/5 group-hover:via-matrix-green/5 group-hover:to-electric-yellow/5 transition-all duration-300"></div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/20 via-transparent to-electric-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block bg-gradient-to-r from-cyan-electric to-matrix-green text-navy text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="relative p-6 z-10">
                  <h3 className="text-navy mb-2 group-hover:text-cyan-electric transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-charcoal/80 mb-4 leading-relaxed text-sm">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-cyan-electric bg-cyan-electric/10 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                    className="w-full"
                  >
                    See Case Study
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full my-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full focus-visible-ring"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-navy" />
              </button>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-navy">{selectedProject.title}</h2>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-electric hover:text-cyan-light focus-visible-ring rounded p-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-cyan-electric bg-cyan-electric/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-navy mb-3">Challenge</h3>
                <p className="text-charcoal leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-navy mb-3">Approach</h3>
                <p className="text-charcoal leading-relaxed">
                  {selectedProject.approach}
                </p>
              </div>

              <div>
                <h3 className="text-navy mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-navy text-white text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-navy mb-3">Result</h3>
                <p className="text-charcoal leading-relaxed">
                  {selectedProject.result}
                </p>
              </div>

              <div className="bg-soft-white rounded-xl p-6 border-l-4 border-cyan-electric">
                <p className="text-charcoal italic leading-relaxed">
                  "{selectedProject.clientQuote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
