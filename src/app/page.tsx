"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Emoji Icons definieren
const Play = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const Film = ({ className }: { className?: string }) => <span className={className}>🎬</span>;
const Users = ({ className }: { className?: string }) => <span className={className}>👥</span>;
const Award = ({ className }: { className?: string }) => <span className={className}>🏆</span>;
const ArrowRight = ({ className }: { className?: string }) => <span className={className}>→</span>;

interface AIFilm {
  id: string;
  title: string;
  creator: string;
  thumbnail_url: string;
  duration: string;
  description: string;
  ai_tools: string[];
  featured: boolean;
}

export default function HomePage() {
  const [featuredFilms, setFeaturedFilms] = useState<AIFilm[]>([]);

  // Featured films - Mix of Ludwig + Real AI filmmakers
  useEffect(() => {
    const featuredFilmsCollection = [
      // Ludwig's original film
      {
        id: 'yoda-trailer-2024',
        title: 'Yoda - AI Generated Star Wars Trailer',
        creator: 'Ludwig Kienle',
        thumbnail_url: 'https://img.youtube.com/vi/-4yRa_mhlwc/maxresdefault.jpg',
        duration: '1:30',
        description: 'Professional AI-generated Star Wars trailer featuring Yoda. Created with cutting-edge AI tools showcasing the potential of AI in film production.',
        ai_tools: ['Kling 1.6', 'ComfyUI', 'MidJourney'],
        featured: true
      },
      // Real AI filmmakers
      {
        id: 'unblind-horror-short',
        title: 'Unblind',
        creator: 'Mark Wachholz (@Magiermogul)',
        thumbnail_url: 'https://picsum.photos/400/225?random=101',
        duration: '8:30',
        description: 'A haunting AI-generated horror short about Emily, a blind girl under her mother\'s strict control. Award-winning concept trailer from Berlin-based filmmaker.',
        ai_tools: ['ElevenLabs Voice AI', 'Runway Gen-3', 'Stable Diffusion'],
        featured: true
      },
      {
        id: 'lord-rings-ai-trailer',
        title: 'Lord of the Rings - AI Trailer',
        creator: 'Caleb Ward (@Curious Refuge)',
        thumbnail_url: 'https://picsum.photos/400/225?random=104',
        duration: '2:15',
        description: 'Viral AI-generated trailer reimagining Lord of the Rings. From Hollywood\'s go-to AI expert with work featured by Netflix, Sony, and Adobe.',
        ai_tools: ['ElevenLabs', 'Runway Gen-3', 'MidJourney'],
        featured: true
      },
      {
        id: 'born-of-coven-trailer',
        title: 'Born of the Coven',
        creator: 'Kavan Cardoza (@kavanthekid)',
        thumbnail_url: 'https://picsum.photos/400/225?random=105',
        duration: '1:45',
        description: 'Dark, mysterious AI trailer created in just one hour using Runway Gen-3. From award-winning photographer with millions of views across platforms.',
        ai_tools: ['Runway Gen-3 Alpha', 'Adobe After Effects'],
        featured: true
      },
      {
        id: 'democratizing-synthiola',
        title: 'Democratizing Synthiola',
        creator: 'Fabian Mosele (@fabianmosele)',
        thumbnail_url: 'https://picsum.photos/400/225?random=107',
        duration: '18:30',
        description: 'A synthetic love story exploring authenticity and consent in the era of generative AI. Features the creator\'s AI alter ego "Synthiola" in a critical examination of AI ethics.',
        ai_tools: ['Stable Diffusion', 'AnimateDiff', 'Runway Gen-3 Alpha', 'ElevenLabs'],
        featured: true
      },
      {
        id: 'dear-mom-ai-letter',
        title: 'Dear Mom',
        creator: 'AIFF 2024 Winner',
        thumbnail_url: 'https://picsum.photos/400/225?random=110',
        duration: '5:30',
        description: 'A heartfelt letter from daughter to mother, imagining meeting her mom at age 20. Winner of Runway AI Film Festival 2024 - a touching exploration of unconditional love.',
        ai_tools: ['Runway Gen-3', 'ElevenLabs', 'Stable Diffusion'],
        featured: true
      }
    ];
    
    // Show random 3 featured films each time
    const shuffled = featuredFilmsCollection.sort(() => 0.5 - Math.random());
    setFeaturedFilms(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Buckswood</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/films" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">Films</Link>
              <Link href="/creators" className="text-gray-300 hover:text-white transition-colors">Creators</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/submit" className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-white transition-colors">Submit Film</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Where AI Meets{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Cinema
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the future of filmmaking. Curated AI-generated films from visionary artists around the world. 
              Experience how artificial intelligence is redefining the boundaries of creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/films" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Explore Films
              </Link>
              <Link href="/about" className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Films */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-white">Featured Films</h3>
            <Link href="/films" className="text-amber-400 hover:text-amber-300 flex items-center transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFilms.map((film) => (
              <Link 
                key={film.id} 
                href={`/films/${film.id}`}
                className="block group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-amber-600/50">
                  <div className="relative overflow-hidden">
                    <img 
                      src={film.thumbnail_url} 
                      alt={film.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm">
                      {film.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {film.title}
                    </h4>
                    <p className="text-amber-400 text-sm mb-3 font-medium">by {film.creator}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {film.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {film.ai_tools.map((tool, index) => (
                        <span key={index} className="bg-amber-600/20 border border-amber-600/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Updated with real data */}
      <section className="py-16 bg-gradient-to-r from-black/20 to-black/10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <Film className="w-12 h-12 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">85+</h3>
              <p className="text-gray-300">Curated AI Films</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <Users className="w-12 h-12 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">45+</h3>
              <p className="text-gray-300">Creative Artists</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <Award className="w-12 h-12 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">25+</h3>
              <p className="text-gray-300">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your AI Creation?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join our growing community and showcase your work to a global audience of AI film enthusiasts.
          </p>
          <Link 
            href="/submit" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all transform hover:scale-105 inline-block"
          >
            Submit Your Film
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">Buckswood</h4>
              </Link>
              <p className="text-gray-400 text-sm">
                The platform for AI-generated films and visual storytelling.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/films" className="hover:text-amber-400 transition-colors">Films</Link></li>
                <li><Link href="/creators" className="hover:text-amber-400 transition-colors">Creators</Link></li>
                <li><Link href="/submit" className="hover:text-amber-400 transition-colors">Submit Film</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Community</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
                <li><Link href="/events" className="hover:text-amber-400 transition-colors">Events</Link></li>
                <li><Link href="/newsletter" className="hover:text-amber-400 transition-colors">Newsletter</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-amber-400 transition-colors">Help</Link></li>
                <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Buckswood. Showcase for AI-generated films.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}