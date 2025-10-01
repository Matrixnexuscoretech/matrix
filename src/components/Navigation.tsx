import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const LOGO_URL = 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759335115/matrix_nexus_logo_wk1cij.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Training', href: '#training' },
    { label: 'Apply', href: '#apply' },
    { label: 'About', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/95 backdrop-blur-xl shadow-2xl border-b-2 border-cyan-electric/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center space-x-3 focus-visible-ring rounded"
            aria-label="Matrix Nexus Coretech Home"
          >
            <img
              src={LOGO_URL}
              alt="Matrix Nexus Logo"
              className="h-12 w-auto"
            />
            <span className="text-white font-heading font-bold text-xl hidden sm:block">
              Matrix Nexus
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-soft-white hover:text-cyan-electric transition-colors duration-200 font-medium focus-visible-ring rounded px-2 py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('#contact')}
            >
              Contact
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('#apply')}
            >
              Apply Now
            </Button>
          </div>

          <button
            className="md:hidden text-white focus-visible-ring rounded p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navy border-t border-cyan-electric/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-soft-white hover:text-cyan-electric transition-colors duration-200 font-medium py-2 focus-visible-ring rounded px-2"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 space-y-3">
              <Button
                variant="ghost"
                size="md"
                onClick={() => scrollToSection('#contact')}
                className="w-full"
              >
                Contact
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollToSection('#apply')}
                className="w-full"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
