import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      quote: 'Matrix Nexus delivered beyond expectations. Our restaurant website boosted reservations and customer loyalty instantly.',
      author: 'Mary Wairimu',
      position: 'Owner, Taste of Nairobi Restaurant',
      rating: 5,
    },
    {
      quote: 'The donation platform transformed how we engage with our supporters. Transparency has never been easier, and trust keeps growing.',
      author: 'David Kimani',
      position: 'Director, Hope Foundation Kenya',
      rating: 5,
    },
    {
      quote: 'Our online academy is now stronger than our physical classrooms. The LMS is seamless, and our students across Africa love it.',
      author: 'Dr. Aisha Mwangi',
      position: 'Founder, Forex Tutors Kenya',
      rating: 5,
    },
    {
      quote: 'Total game-changer! We now manage rentals, tenants, and payments from one dashboard with real-time updates across branches.',
      author: 'Michael Ochieng',
      position: 'Property Manager, Ochieng Real Estate',
      rating: 5,
    },
    {
      quote: 'Shoppers love the comparison tool. Our electronics deals are flying off the shelves, and vendor sales have shot up dramatically.',
      author: 'Grace Wanjiru',
      position: 'CEO, ElectroDeals Kenya',
      rating: 5,
    },
  ];


  const stats = [
    { value: '20+', label: 'Projects Delivered' },
    { value: '100+', label: 'Students Trained' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 lg:py-32 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy mb-6">
            What Our <span className="text-cyan-electric">Clients Say</span>
          </h2>
          <p className="text-charcoal text-lg leading-relaxed">
            Don't just take our word for it. Here's what our clients and students have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-cyan-electric/10">
            <Quote className="w-12 h-12 text-cyan-electric mb-6" />

            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-charcoal text-lg lg:text-xl leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  <div>
                    <div className="font-semibold text-navy">{testimonial.author}</div>
                    <div className="text-charcoal/70">{testimonial.position}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible-ring ${
                      index === currentIndex ? 'bg-cyan-electric w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={goToPrev}
                  className="p-2 rounded-full bg-navy text-white hover:bg-cyan-electric hover:text-navy transition-colors focus-visible-ring"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full bg-navy text-white hover:bg-cyan-electric hover:text-navy transition-colors focus-visible-ring"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-navy mb-2">
                {stat.value}
              </div>
              <div className="text-charcoal/70 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
