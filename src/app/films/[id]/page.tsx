"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Import Icons from lucide-react
import { ArrowLeft, Play, Clock, User, Calendar, Eye, Share2, Film, ExternalLink } from 'lucide-react';

interface AIFilm {
  id: string;
  title: string;
  creator: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
  description: string;
  ai_tools: string[];
  category: string;
  views: number;
  featured: boolean;
  created_at: string;
}

export default function FilmDetailPage() {
  const params = useParams();
  const [film, setFilm] = useState<AIFilm | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data that works without any external dependencies
  const mockFilms: AIFilm[] = [
    {
      id: 'yoda-trailer-2024',
      title: 'Yoda - AI Generated Star Wars Trailer',
      creator: 'Ludwig Kienle',
      thumbnail_url: 'https://img.youtube.com/vi/-4yRa_mhlwc/maxresdefault.jpg',
      video_url: 'https://youtu.be/-4yRa_mhlwc',
      duration: '1:30',
      description: 'Professional AI-generated Star Wars trailer featuring Yoda. Created with cutting-edge AI tools showcasing the potential of AI in film production. This trailer demonstrates the impressive capabilities of Kling 1.6 for video generation, combined with the precision of ComfyUI workflows and high-quality visual concepts from MidJourney.',
      ai_tools: ['Kling 1.6', 'ComfyUI', 'MidJourney'],
      category: 'Sci-Fi',
      views: 1250,
      featured: true,
      created_at: '2024-12-01T10:00:00Z'
    },
    {
      id: 'digital-dreams',
      title: 'Digital Dreams',
      creator: 'Sarah Chen',
      thumbnail_url: 'https://picsum.photos/400/225?random=1',
      video_url: 'https://www.youtube.com/watch?v=example1',
      duration: '3:42',
      description: 'A surreal short film exploring AI-generated dreams and digital worlds through stunning visuals.',
      ai_tools: ['Runway ML', 'MidJourney'],
      category: 'Abstract',
      views: 2840,
      featured: true,
      created_at: '2024-11-15T10:00:00Z'
    },
    {
      id: 'synthetic-memories',
      title: 'Synthetic Memories',
      creator: 'Alex Rivera',
      thumbnail_url: 'https://picsum.photos/400/225?random=2',
      video_url: 'https://www.youtube.com/watch?v=example2',
      duration: '5:18',
      description: 'A poetic journey through artificial memories in a digital future.',
      ai_tools: ['Pika Labs', 'Stable Video'],
      category: 'Sci-Fi',
      views: 1876,
      featured: true,
      created_at: '2024-11-20T10:00:00Z'
    }
  ];

  useEffect(() => {
    const filmId = params.id as string;
    
    // Simulate loading
    setTimeout(() => {
      const foundFilm = mockFilms.find(f => f.id === filmId);
      setFilm(foundFilm || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const shareFilm = async (platform: string) => {
    const url = window.location.href;
    const title = film?.title || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied!');
        } catch (err) {
          alert(`Link: ${url}`);
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Film not found</h1>
          <Link 
            href="/films" 
            className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Films
          </Link>
        </div>
      </div>
    );
  }

  // Extract YouTube Video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(film.video_url);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/films" 
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Films
        </Link>

        {/* Video Player */}
        <div className="mb-8">
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                title={film.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video not available</p>
                  {film.video_url && (
                    <a 
                      href={film.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-amber-400 hover:text-amber-300"
                    >
                      Open video externally <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Film Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{film.title}</h1>
              
              {/* Film Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-amber-400 font-medium">{film.creator}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{film.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(film.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{film.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {film.description}
              </p>
            </div>

            {/* Share Buttons */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </h2>
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={() => shareFilm('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors"
                >
                  Twitter
                </button>
                <button 
                  onClick={() => shareFilm('linkedin')}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white transition-colors"
                >
                  LinkedIn
                </button>
                <button 
                  onClick={() => shareFilm('copy')}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tools */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">AI Tools Used</h2>
              <div className="space-y-3">
                {film.ai_tools.map((tool, index) => (
                  <div key={index} className="bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-600/30 rounded-lg p-3">
                    <span className="text-amber-400 font-medium">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span className="text-amber-400 font-medium">{film.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Duration:</span>
                  <span className="text-white">{film.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Featured:</span>
                  <span className="text-white">{film.featured ? '⭐ Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}