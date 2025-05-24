"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Supabase direkt einbauen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
interface AIFilm {
  id: string;
  title: string;
  creator: string;
  thumbnail_url: string;
  duration: string;
  description: string;
  ai_tools: string[];
  category: string;
  views: number;
  featured: boolean;
  uploadDate: string;
}

// Emoji Icons (konsistent mit Homepage)
const Search = ({ className }: { className?: string }) => <span className={className}>🔍</span>;
const Filter = ({ className }: { className?: string }) => <span className={className}>⚙️</span>;
const Play = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const User = ({ className }: { className?: string }) => <span className={className}>👤</span>;
const Tag = ({ className }: { className?: string }) => <span className={className}>🏷️</span>;
const Film = ({ className }: { className?: string }) => <span className={className}>🎬</span>;

export default function FilmsPage() {
  const [films, setFilms] = useState<AIFilm[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<AIFilm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState('all');

  const categories = ['all', 'Sci-Fi', 'Abstract', 'Documentary', 'Experimental', 'Animation'];
  const aiTools = ['all', 'Runway ML', 'Pika Labs', 'Sora', 'MidJourney', 'Stable Video'];

  // Mock data - später durch Supabase ersetzen
 // Echte Daten von Supabase laden
useEffect(() => {
  const fetchFilms = async () => {
    try {
      const { data, error } = await supabase
        .from('films')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase Error:', error);
        return;
      }
      
      if (data) {
        setFilms(data);
        setFilteredFilms(data);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };
  
  fetchFilms();
}, []);

  // Filter-Logik
  useEffect(() => {
    let filtered = films;

    if (searchTerm) {
      filtered = filtered.filter(
        film =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(film => film.category === selectedCategory);
    }

    if (selectedTool !== 'all') {
      filtered = filtered.filter(film => film.ai_tools.includes(selectedTool));
    }

    setFilteredFilms(filtered);
  }, [films, searchTerm, selectedCategory, selectedTool]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">KI-Film Bibliothek</h1>
          <p className="text-gray-300 text-lg">
            Entdecken Sie {films.length} kuratierte KI-generierte Filme von talentierten Künstlern weltweit.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Filme, Künstler oder Beschreibungen durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category === 'all' ? 'Alle Kategorien' : category}
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
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {aiTools.map(tool => (
                  <option key={tool} value={tool} className="bg-slate-800">
                    {tool === 'all' ? 'Alle KI-Tools' : tool}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            {filteredFilms.length} {filteredFilms.length === 1 ? 'Film gefunden' : 'Filme gefunden'}
          </p>
        </div>

        {/* Films Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFilms.map((film) => (
            <Link 
              key={film.id} 
              href={`/films/${film.id}`}
              className="group block"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="relative">
                  <img 
                    src={film.thumbnail_url} 
                    alt={film.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-white text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {film.duration}
                  </div>
                  {film.featured && (
                    <div className="absolute top-3 left-3 bg-amber-600 px-2 py-1 rounded text-white text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {film.title}
                  </h3>
                  <div className="flex items-center text-amber-400 text-sm mb-3">
                    <User className="w-4 h-4 mr-1" />
                    {film.creator}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {film.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-gray-400">{film.views.toLocaleString()} Views</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300">
                      {film.category}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {film.ai_tools.slice(0, 3).map((tool, index) => (
                      <span key={index} className="bg-white/5 px-2 py-1 rounded text-xs text-gray-400">
                        {tool}
                      </span>
                    ))}
                    {film.ai_tools.length > 3 && (
                      <span className="bg-white/5 px-2 py-1 rounded text-xs text-gray-400">
                        +{film.ai_tools.length - 3}
                      </span>
                    )}
                  </div>
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
              <h3 className="text-xl font-semibold text-white mb-2">Keine Filme gefunden</h3>
              <p>Versuchen Sie andere Suchbegriffe oder Filter.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTool('all');
              }}
              className="mt-4 bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg text-white transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}