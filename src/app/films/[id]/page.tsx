"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  uploadDate: string;
}

// Emoji Icons
const ArrowLeft = ({ className }: { className?: string }) => <span className={className}>←</span>;
const Play = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const User = ({ className }: { className?: string }) => <span className={className}>👤</span>;
const Calendar = ({ className }: { className?: string }) => <span className={className}>📅</span>;
const Eye = ({ className }: { className?: string }) => <span className={className}>👁️</span>;
const Share = ({ className }: { className?: string }) => <span className={className}>🔗</span>;
const Film = ({ className }: { className?: string }) => <span className={className}>🎬</span>;

export default function FilmDetailPage() {
  const params = useParams();
  const [film, setFilm] = useState<AIFilm | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock-Daten (gleiche wie in anderen Pages)
  const mockFilms: AIFilm[] = [
    {
      id: 'yoda-trailer-2024',
      title: 'Yoda - KI-generierter Star Wars Trailer',
      creator: 'Ludwig Kienle',
      thumbnail_url: 'https://img.youtube.com/vi/-4yRa_mhlwc/maxresdefault.jpg',
      video_url: 'https://youtu.be/-4yRa_mhlwc',
      duration: '1:30',
      description: 'Professioneller KI-generierter Star Wars Trailer mit Yoda im Fokus. Erstellt mit modernsten AI-Tools und zeigt das Potenzial von KI in der Filmproduktion. Dieser Trailer demonstriert die beeindruckenden Möglichkeiten von Kling 1.6 für Video-Generation, kombiniert mit der Präzision von ComfyUI-Workflows und den hochwertigen visuellen Konzepten aus MidJourney.',
      ai_tools: ['Kling 1.6', 'ComfyUI', 'MidJourney'],
      category: 'Sci-Fi',
      views: 0,
      featured: true,
      uploadDate: '2024-12-01'
    },
    {
      id: '2',
      title: 'Synthetic Memories',
      creator: 'Alex Rivera',
      thumbnail_url: 'https://picsum.photos/400/225?random=2',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '5:18',
      description: 'Eine poetische Reise durch künstliche Erinnerungen in einer post-digitalen Welt.',
      ai_tools: ['Pika Labs', 'Stable Video', 'Adobe Firefly'],
      category: 'Sci-Fi',
      views: 1876,
      featured: true,
      uploadDate: '2024-01-20'
    },
    {
      id: '3',
      title: 'The Last Algorithm',
      creator: 'Maya Patel',
      thumbnail_url: 'https://picsum.photos/400/225?random=3',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '7:23',
      description: 'Science Fiction Drama über die letzte KI und ihre Beziehung zur Menschheit.',
      ai_tools: ['Sora', 'Claude', 'DALL-E 3'],
      category: 'Sci-Fi',
      views: 3421,
      featured: true,
      uploadDate: '2024-01-12'
    }
  ];

  useEffect(() => {
    const filmId = params.id as string;
    const foundFilm = mockFilms.find(f => f.id === filmId);
    setFilm(foundFilm || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Film nicht gefunden</h1>
          <Link href="/films" className="text-amber-400 hover:text-amber-300">
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  // YouTube Video ID extrahieren
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(film.video_url);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/films" 
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zurück zur Übersicht
        </Link>

        {/* Video Player */}
        <div className="mb-8">
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                title={film.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Video Player</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Film Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{film.title}</h1>
            
            {/* Film Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span className="text-amber-400">{film.creator}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{film.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(film.uploadDate).toLocaleDateString('de-DE')}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>{film.views.toLocaleString()} Views</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Beschreibung</h2>
              <p className="text-gray-300 leading-relaxed">{film.description}</p>
            </div>

            {/* Share Buttons */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Share className="w-5 h-5 mr-2" />
                Teilen
              </h2>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
                  Twitter
                </button>
                <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg text-white transition-colors">
                  LinkedIn
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white transition-colors">
                  Link kopieren
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tools */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">KI-Tools verwendet</h2>
              <div className="space-y-3">
                {film.ai_tools.map((tool, index) => (
                  <div key={index} className="bg-amber-600/20 border border-amber-600/30 rounded-lg p-3">
                    <span className="text-amber-400 font-medium">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category & Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Kategorie:</span>
                  <span className="text-white">{film.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Dauer:</span>
                  <span className="text-white">{film.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Featured:</span>
                  <span className="text-white">{film.featured ? 'Ja' : 'Nein'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}