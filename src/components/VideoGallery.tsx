import { useState } from 'react';
import { Play, X } from 'lucide-react';

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      title: 'Who We Are — Matrix Nexus Coretech',
      thumbnail: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759358908/IMG_20250901_204106_905_h79pfg.jpg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: '',
      description: 'Discover our story, mission, and the team behind Matrix Nexus Coretech',
    },
    {
      title: 'Our Services — Web & Marketing',
      thumbnail: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759358901/IMG-20250720-WA0052_2_u3qvtp.jpg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dh1oznegj&public_id=services_and_web_marketing_jwgr20&profile=cld-default',
      description: 'Explore our comprehensive web development and digital marketing solutions',
    },
    {
      title: 'Training Highlights',
      thumbnail: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759357131/Screenshot_2025-10-02_010855_agyo2m.png?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dh1oznegj&public_id=training_highlight_mxmfgx&profile=cld-default',
      description: 'See our training programs in action and hear from our successful graduates',
    },
    {
      title: 'Case Study: E-Commerce Transformation',
      thumbnail: 'https://res.cloudinary.com/dh1oznegj/image/upload/v1759358901/ChatGPT_Image_May_31_2025_08_15_53_PM_skyzmy.png?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dh1oznegj&public_id=aaaaaaaaaaaaa_jj8mhm&profile=cld-default',
      description: 'How we helped a client triple their online sales in just 90 days',
    },
  ];

  return (
    <>
      <section className="py-20 lg:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-white mb-6">
              See Us <span className="text-cyan-electric">In Action</span>
            </h2>
            <p className="text-soft-white text-lg leading-relaxed">
              Watch our videos to learn more about our work, our team, and the impact we create for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.title}
                className="group relative bg-navy-dark rounded-2xl overflow-hidden border border-cyan-electric/20 hover:border-cyan-electric transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-electric/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/60 transition-colors duration-300"></div>

                  <button
                    onClick={() => setSelectedVideo(video.videoUrl)}
                    className="absolute inset-0 flex items-center justify-center focus-visible-ring"
                    aria-label={`Play ${video.title}`}
                  >
                    <div className="w-20 h-20 bg-cyan-electric rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover:bg-cyan-light">
                      <Play className="w-10 h-10 text-navy ml-1" fill="currentColor" />
                    </div>
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-white mb-2 group-hover:text-cyan-electric transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-soft-white/70 text-sm leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full focus-visible-ring"
              aria-label="Close video"
            >
              <X className="w-6 h-6 text-navy" />
            </button>

            <iframe
              src={selectedVideo}
              title="Video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
