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
      challenge: 'Client needed a fast, secure platform to handle 10K+ daily transactions with real-time inventory tracking.',
      approach: 'Built with React and Next.js for performance, Node.js backend, PostgreSQL database, and integrated Stripe for payments.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      result: 'Achieved 40% increase in conversion rate, 99.9% uptime, and handled Black Friday traffic spike of 50K concurrent users.',
      clientQuote: 'Matrix Nexus delivered beyond expectations. Our sales tripled in the first quarter.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      title: 'NGO Donor Portal',
      category: 'Non-Profit',
      tags: ['React', 'Django', 'Payment Gateway'],
      shortDescription: 'Transparent donation platform with impact tracking dashboard',
      challenge: 'Organization required a transparent system for donors to track project impact and make recurring contributions.',
      approach: 'Custom Django backend with React frontend, integrated payment processing, and real-time impact reporting dashboard.',
      tech: ['React', 'Django', 'PostgreSQL', 'AWS', 'Payment APIs'],
      result: 'Increased donor retention by 65%, processed $2M+ in donations, and improved transparency ratings by 80%.',
      clientQuote: 'The platform transformed how we engage with our donors. Transparency has never been easier.',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      title: 'EdTech Learning Platform',
      category: 'Education',
      tags: ['React', 'Video Streaming', 'LMS'],
      shortDescription: 'Interactive online learning platform with live classes',
      challenge: 'Educational institution needed a robust LMS supporting live video, assessments, and student progress tracking.',
      approach: 'Built comprehensive LMS with React, integrated video streaming, quiz engine, and analytics dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS S3'],
      result: 'Enrolled 5,000+ students, 95% completion rate, and expanded to 15 countries within 6 months.',
      clientQuote: 'Our online presence is now stronger than our physical campuses. Thank you Matrix Nexus!',
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 4,
      title: 'Restaurant Management System',
      category: 'Hospitality',
      tags: ['React', 'Real-time', 'POS Integration'],
      shortDescription: 'End-to-end restaurant operations and online ordering',
      challenge: 'Restaurant chain needed unified system for POS, inventory, staff management, and online ordering.',
      approach: 'Developed integrated solution with real-time synchronization across locations, mobile apps, and web dashboard.',
      tech: ['React Native', 'React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      result: 'Reduced order errors by 75%, increased online orders by 120%, and cut operational costs by 30%.',
      clientQuote: 'Game-changer for our operations. We can now manage 20 locations from a single dashboard.',
      image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      title: 'Real Estate Listing Platform',
      category: 'Real Estate',
      tags: ['React', 'Maps', 'Search'],
      shortDescription: 'Property marketplace with advanced search and virtual tours',
      challenge: 'Agency required modern platform with map-based search, virtual tours, and CRM integration.',
      approach: 'Created immersive experience with Google Maps integration, 360° tours, and intelligent search algorithms.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Google Maps API'],
      result: 'Listed 2,000+ properties, generated 500+ qualified leads monthly, and reduced time-to-sale by 40%.',
      clientQuote: 'Our clients love the virtual tours. We are closing deals faster than ever.',
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      title: 'Healthcare Patient Portal',
      category: 'Healthcare',
      tags: ['React', 'HIPAA', 'Telemedicine'],
      shortDescription: 'Secure patient portal with telemedicine capabilities',
      challenge: 'Hospital needed HIPAA-compliant portal for appointments, medical records, and virtual consultations.',
      approach: 'Built secure, encrypted system with video consultations, e-prescriptions, and EHR integration.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'Encryption'],
      result: 'Served 10,000+ patients, reduced no-shows by 50%, and enabled 5,000+ virtual consultations.',
      clientQuote: 'Patient satisfaction scores increased dramatically. The portal is intuitive and secure.',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
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
