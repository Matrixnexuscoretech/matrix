import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MagicSection from './components/MagicSection';
import StatsCounter from './components/StatsCounter';
import Services from './components/Services';
import InteractiveFeatures from './components/InteractiveFeatures';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ProcessTimeline from './components/ProcessTimeline';
import Training from './components/Training';
import Application from './components/Application';
import VideoGallery from './components/VideoGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParallaxBackground from './components/ParallaxBackground';
import AdminPage from './components/AdminPage';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const isAdminRoute = window.location.pathname === '/admin' || window.location.hash === '#admin';
    setShowAdmin(isAdminRoute);

    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />
      <Navigation />
      <main>
        <Hero />
        <StatsCounter />
        <MagicSection />
        <Services />
        <InteractiveFeatures />
        <Portfolio />
        <Testimonials />
        <ProcessTimeline />
        <Training />
        <Application />
        <VideoGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
