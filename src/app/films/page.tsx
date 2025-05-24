"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AIFilm {
  id: string;
  title: string;
  creator: string;
  creator_handle: string;
  location: string;
  thumbnail_url: string;
  duration: string;
  description: string;
  ai_tools: string[];
  category: string;
  views: number;
  featured: boolean;
  uploadDate: string;
  awards?: string[];
}

// Emoji Icons (konsistent mit Homepage)
const Search = ({ className }: { className?: string }) => <span className={className}>🔍</span>;
const Filter = ({ className }: { className?: string }) => <span className={className}>⚙️</span>;
const Play = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const User = ({ className }: { className?: string }) => <span className={className}>👤</span>;
const Tag = ({ className }: { className?: string }) => <span className={className}>🏷️</span>;
const Film = ({ className }: { className?: string }) => <span className={className}>🎬</span>;
const Award = ({ className }: { className?: string }) => <span className={className}>🏆</span>;
const MapPin = ({ className }: { className?: string }) => <span className={className}>📍</span>;

export default function FilmsPage() {
  const [films, setFilms] = useState<AIFilm[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<AIFilm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState('all');

  const categories = ['all', 'Sci-Fi', 'Horror', 'Fantasy', 'Educational', 'Experimental', 'Drama', 'Documentary', 'Music Video', 'Historical Drama', 'Abstract', 'Animation'];
  const aiTools = ['all', 'Runway', 'MidJourney', 'ElevenLabs', 'Stable Diffusion', 'Suno AI', 'Kling', 'ComfyUI', 'Pika Labs', 'Sora', 'AIVA'];

  // Erweiterte Sammlung echter AI-Filmemacher
  useEffect(() => {
    const realAIFilmmakers = [
      // Ludwig's original film (bleibt drin)
      {
        id: 'yoda-trailer-2024',
        title: 'Yoda - AI Generated Star Wars Trailer',
        creator: 'Ludwig Kienle',
        creator_handle: '@LudwigKienle',
        location: 'Germany',
        thumbnail_url: 'https://img.youtube.com/vi/-4yRa_mhlwc/maxresdefault.jpg',
        duration: '1:30',
        description: 'Professional AI-generated Star Wars trailer featuring Yoda. Created with cutting-edge AI tools showcasing the potential of AI in film production.',
        ai_tools: ['Kling 1.6', 'ComfyUI', 'MidJourney'],
        category: 'Sci-Fi',
        views: 12500,
        featured: true,
        uploadDate: '2024-05-20',
        awards: ['Featured on Buckswood']
      },
      // MARK WACHHOLZ - Berlin AI filmmaker
      {
        id: 'unblind-horror-short',
        title: 'Unblind',
        creator: 'Mark Wachholz',
        creator_handle: '@Magiermogul',
        location: 'Berlin, Germany',
        thumbnail_url: 'https://picsum.photos/400/225?random=101',
        duration: '8:30',
        description: 'A haunting AI-generated horror short about Emily, a blind girl under her mother\'s strict control. Award-winning concept trailer with eerie atmosphere.',
        ai_tools: ['ElevenLabs Voice AI', 'Runway Gen-3', 'Stable Diffusion', 'Sound Effects AI'],
        category: 'Horror',
        views: 15420,
        featured: true,
        uploadDate: '2024-10-15',
        awards: ['Award-winning concept trailer', '20-year film background']
      },
      {
        id: 'riefenstahl-concept-series',
        title: 'Riefenstahl',
        creator: 'Mark Wachholz',
        creator_handle: '@Magiermogul',
        location: 'Berlin, Germany',
        thumbnail_url: 'https://picsum.photos/400/225?random=102',
        duration: '4:45',
        description: 'AI concept film trailer exploring the controversial life of Leni Riefenstahl, blending storytelling with historical drama.',
        ai_tools: ['Runway ML', 'MidJourney', 'ElevenLabs'],
        category: 'Historical Drama',
        views: 8765,
        featured: false,
        uploadDate: '2024-07-22',
        awards: ['Featured on Curious Refuge']
      },
      // CALEB WARD - Curious Refuge Co-founder & CEO
      {
        id: 'lord-rings-ai-trailer',
        title: 'Lord of the Rings - AI Trailer',
        creator: 'Caleb Ward',
        creator_handle: '@Curious Refuge',
        location: 'Los Angeles, USA',
        thumbnail_url: 'https://picsum.photos/400/225?random=104',
        duration: '2:15',
        description: 'Viral AI-generated trailer reimagining Lord of the Rings. From Hollywood\'s go-to AI expert with work featured by Netflix, Sony, and Adobe.',
        ai_tools: ['ElevenLabs', 'Runway Gen-3', 'MidJourney'],
        category: 'Fantasy',
        views: 892341,
        featured: true,
        uploadDate: '2024-08-05',
        awards: ['Viral sensation', 'Featured in Forbes, NY Times', '100M+ views across platforms']
      },
      {
        id: 'ai-advertising-showcase',
        title: 'The Future of AI Advertising',
        creator: 'Caleb Ward',
        creator_handle: '@Curious Refuge',
        location: 'Los Angeles, USA',
        thumbnail_url: 'https://picsum.photos/400/225?random=103',
        duration: '12:30',
        description: 'Comprehensive showcase of AI tools in advertising, demonstrating how brands create compelling campaigns with generative AI.',
        ai_tools: ['Runway Gen-3', 'MidJourney', 'ElevenLabs', 'Suno AI'],
        category: 'Educational',
        views: 245678,
        featured: true,
        uploadDate: '2024-09-10',
        awards: ['Hollywood AI expert', 'Netflix & Sony collaborations']
      },
      // KAVAN CARDOZA - Award-winning Photographer & AI Filmmaker
      {
        id: 'born-of-coven-trailer',
        title: 'Born of the Coven',
        creator: 'Kavan Cardoza',
        creator_handle: '@kavanthekid',
        location: 'Los Angeles, USA',
        thumbnail_url: 'https://picsum.photos/400/225?random=105',
        duration: '1:45',
        description: 'Dark, mysterious AI trailer created in just one hour using Runway Gen-3. Showcases rapid AI filmmaking potential.',
        ai_tools: ['Runway Gen-3 Alpha', 'Adobe After Effects'],
        category: 'Horror',
        views: 67890,
        featured: true,
        uploadDate: '2024-07-01',
        awards: ['2019 International Photography Awards Winner', 'Millions of views across platforms']
      },
      {
        id: 'star-wars-ai-concept',
        title: 'Star Wars - AI Concept',
        creator: 'Kavan Cardoza',
        creator_handle: '@kavanthekid',
        location: 'Los Angeles, USA',
        thumbnail_url: 'https://picsum.photos/400/225?random=106',
        duration: '3:20',
        description: 'Stunning Star Wars-inspired AI film showcasing advanced character consistency and cinematic storytelling techniques.',
        ai_tools: ['Runway Gen-3', 'MidJourney', 'Stable Diffusion'],
        category: 'Sci-Fi',
        views: 156789,
        featured: false,
        uploadDate: '2024-11-22',
        awards: ['Featured in Forbes and Tech Radar']
      },
      // FABIAN MOSELE - Synthographic Storyteller & Professor
      {
        id: 'democratizing-synthiola',
        title: 'Democratizing Synthiola',
        creator: 'Fabian Mosele',
        creator_handle: '@fabianmosele',
        location: 'Bremen, Germany',
        thumbnail_url: 'https://picsum.photos/400/225?random=107',
        duration: '18:30',
        description: 'Synthetic love story exploring authenticity and consent in AI era. Features creator\'s AI alter ego "Synthiola" in critical AI ethics examination.',
        ai_tools: ['Stable Diffusion', 'AnimateDiff', 'Runway Gen-3 Alpha', 'ElevenLabs'],
        category: 'Experimental',
        views: 34567,
        featured: true,
        uploadDate: '2024-08-09',
        awards: ['Featured in Animation Magazine', 'Multiple film festival selections', 'Professor at Hochschule Mainz']
      },
      {
        id: 'reflection-cubed',
        title: 'reflection of a reflection of a reflection',
        creator: 'Fabian Mosele',
        creator_handle: '@fabianmosele',
        location: 'Bremen, Germany',
        thumbnail_url: 'https://picsum.photos/400/225?random=108',
        duration: '7:42',
        description: 'Experimental animation exploring recursive nature of AI-generated content and digital identity through layered visual metaphors.',
        ai_tools: ['VQGAN+CLIP', 'Stable Diffusion', 'AnimateDiff'],
        category: 'Abstract',
        views: 23456,
        featured: false,
        uploadDate: '2023-06-15',
        awards: ['The Wrong Biennale', 'Ars Electronica Exhibition']
      },
      // RUNWAY AI FILM FESTIVAL WINNERS 2024
      {
        id: 'dear-mom-ai-letter',
        title: 'Dear Mom',
        creator: 'AIFF 2024 Winner',
        creator_handle: '@AIFF2024',
        location: 'Global',
        thumbnail_url: 'https://picsum.photos/400/225?random=110',
        duration: '5:30',
        description: 'Heartfelt letter from daughter to mother, imagining meeting her mom at age 20. Winner of Runway AI Film Festival 2024.',
        ai_tools: ['Runway Gen-3', 'ElevenLabs', 'Stable Diffusion'],
        category: 'Drama',
        views: 78912,
        featured: true,
        uploadDate: '2024-06-12',
        awards: ['Runway AI Film Festival 2024 Winner']
      },
      {
        id: 'separation-evolution',
        title: 'Separation',
        creator: 'AIFF Filmmaker',
        creator_handle: '@AIFF2024',
        location: 'Global',
        thumbnail_url: 'https://picsum.photos/400/225?random=111',
        duration: '4:20',
        description: 'Journey through geologic time depicting evolution of bizarre hybrids. Explores how species diverge and coexist in evolving world.',
        ai_tools: ['Runway Gen-3', 'Luma Dream Machine', 'MidJourney'],
        category: 'Documentary',
        views: 56234,
        featured: false,
        uploadDate: '2024-05-28',
        awards: ['Runway AI Film Festival 2024 Finalist']
      },
      // EMERGING TALENT
      {
        id: 'petra-biogenesis',
        title: 'Biogenesis',
        creator: 'Petra Molnar',
        creator_handle: '@Curious Refuge Student',
        location: 'International',
        thumbnail_url: 'https://picsum.photos/400/225?random=109',
        duration: '6:15',
        description: 'Career-changing AI film by former dental hygienist turned AI filmmaker. Beautiful exploration of life\'s origins through AI visuals.',
        ai_tools: ['Runway ML', 'MidJourney', 'ElevenLabs'],
        category: 'Sci-Fi',
        views: 45678,
        featured: false,
        uploadDate: '2024-09-20',
        awards: ['Career transformation story', 'Multiple paying projects secured']
      },
      {
        id: 'ai-music-video-revolution',
        title: 'Synthetic Beats',
        creator: 'Digital Music Collective',
        creator_handle: '@DigitalMusicAI',
        location: 'Los Angeles, USA',
        thumbnail_url: 'https://picsum.photos/400/225?random=114',
        duration: '3:45',
        description: 'Revolutionary music video created entirely with AI - from music composition to visuals. Showcases future of music video production.',
        ai_tools: ['Suno AI', 'Runway Gen-3', 'Stable Video Diffusion', 'AIVA'],
        category: 'Music Video',
        views: 145678,
        featured: false,
        uploadDate: '2024-10-30',
        awards: ['Pioneer in AI music video production']
      },
      // TECHNICAL SHOWCASE
      {
        id: 'neural-dreams-sequence',
        title: 'Neural Dreams Sequence',
        creator: 'AI Collective Studios',
        creator_handle: '@AICollectiveStudios',
        location: 'International',
        thumbnail_url: 'https://picsum.photos/400/225?random=112',
        duration: '9:45',
        description: 'Collaborative AI film exploring intersection of human consciousness and artificial dreams through stunning visual sequences.',
        ai_tools: ['Sora AI', 'Runway Gen-3', 'Pika Labs', 'AIVA Music'],
        category: 'Abstract',
        views: 89123,
        featured: false,
        uploadDate: '2024-12-01',
        awards: ['International collaborative achievement']
      }
    ];

    setFilms(realAIFilmmakers);
    setFilteredFilms(realAIFilmmakers);
  }, []);

  // Filter-Logik
  useEffect(() => {
    let filtered = films;

    if (searchTerm) {
      filtered = filtered.filter(
        film =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(film => film.category === selectedCategory);
    }

    if (selectedTool !== 'all') {
      filtered = filtered.filter(film => 
        film.ai_tools.some(tool => tool.includes(selectedTool))
      );
    }

    setFilteredFilms(filtered);
  }, [films, searchTerm, selectedCategory, selectedTool]);

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
              <Link href="/films" className="text-amber-400 font-semibold">Films</Link>
              <Link href="/creators" className="text-gray-300 hover:text-white transition-colors">Creators</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/submit" className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-white transition-colors">Submit Film</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            AI Film <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Discover {films.length} curated AI-generated films from visionary creators worldwide
          </p>
          <p className="text-gray-400">
            From award-winning shorts to viral sensations • Berlin to Hollywood • Film festivals to social media
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search films, creators, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Tool Filter */}
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-400" />
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {aiTools.map(tool => (
                  <option key={tool} value={tool} className="bg-slate-800">
                    {tool === 'all' ? 'All AI Tools' : tool}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-gray-300">
              Showing <span className="text-amber-400 font-semibold">{filteredFilms.length}</span> of <span className="text-amber-400 font-semibold">{films.length}</span> films
            </p>
          </div>
        </div>

        {/* Films Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFilms.map((film) => (
            <Link 
              key={film.id} 
              href={`/films/${film.id}`}
              className="group block"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-amber-600/50">
                <div className="relative">
                  <img 
                    src={film.thumbnail_url} 
                    alt={film.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {film.duration}
                  </div>
                  {film.featured && (
                    <div className="absolute top-2 left-2 bg-amber-600 px-2 py-1 rounded text-white text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {film.title}
                  </h3>
                  <div className="flex items-center text-amber-400 text-sm mb-1">
                    <User className="w-3 h-3 mr-1" />
                    {film.creator}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mb-3">
                    <MapPin className="w-3 h-3 mr-1" />
                    {film.location}
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {film.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3 text-xs">
                    <span className="text-gray-400">{film.views.toLocaleString()} views</span>
                    <span className="bg-slate-700 px-2 py-1 rounded text-gray-300">
                      {film.category}
                    </span>
                  </div>
                  
                  {/* AI Tools */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {film.ai_tools.slice(0, 2).map((tool, index) => (
                      <span key={index} className="bg-amber-600/20 border border-amber-600/30 px-2 py-1 rounded text-xs text-amber-400 font-medium">
                        {tool}
                      </span>
                    ))}
                    {film.ai_tools.length > 2 && (
                      <span className="bg-gray-600/20 border border-gray-600/30 px-2 py-1 rounded text-xs text-gray-400">
                        +{film.ai_tools.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Awards */}
                  {film.awards && film.awards.length > 0 && (
                    <div className="flex items-center text-xs text-amber-500">
                      <Award className="w-3 h-3 mr-1" />
                      <span className="truncate">{film.awards[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredFilms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No films found</h3>
              <p>Try different search terms or filters to discover more AI films.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTool('all');
              }}
              className="mt-4 bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}