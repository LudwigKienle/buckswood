"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { AIFilm } from '../../../lib/types';

// Proper Icon Components (replace emoji with proper icons)
import { ArrowLeft, Play, Clock, User, Calendar, Eye, Share2, Film, ExternalLink } from 'lucide-react';

export default function FilmDetailPage() {
  const params = useParams();
  const [film, setFilm] = useState<AIFilm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedFilms, setRelatedFilms] = useState<AIFilm[]>([]);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const filmId = params.id as string;
        
        // Fetch the specific film
        const { data: filmData, error: filmError } = await supabase
          .from('films')
          .select('*')
          .eq('id', filmId)
          .single();

        if (filmError) {
          setError('Film nicht gefunden');
          setLoading(false);
          return;
        }

        setFilm(filmData);

        // Fetch related films (same category, different film)
        const { data: relatedData } = await supabase
          .from('films')
          .select('*')
          .eq('category', filmData.category)
          .neq('id', filmId)
          .limit(3);

        if (relatedData) {
          setRelatedFilms(relatedData);
        }

        // Increment view count
        await supabase
          .from('films')
          .update({ views: (filmData.views || 0) + 1 })
          .eq('id', filmId);

      } catch (err) {
        setError('Fehler beim Laden des Films');
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
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
          alert('Link kopiert!');
        } catch (err) {
          console.error('Fehler beim Kopieren:', err);
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

  if (error || !film) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || 'Film nicht gefunden'}
          </h1>
          <Link 
            href="/films" 
            className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Übersicht
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
          Zurück zur Übersicht
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
                  <p className="text-lg">Video nicht verfügbar</p>
                  {film.video_url && (
                    <a 
                      href={film.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-amber-400 hover:text-amber-300"
                    >
                      Video extern öffnen <ExternalLink className="w-4 h-4 ml-2" />
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
                  <span>{new Date(film.created_at).toLocaleDateString('de-DE')}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{(film.views || 0).toLocaleString()} Views</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Beschreibung</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {film.description}
              </p>
            </div>

            {/* Share Buttons */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Teilen
              </h2>
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={() => shareFilm('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors flex items-center"
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
                  Link kopieren
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tools */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">KI-Tools verwendet</h2>
              <div className="space-y-3">
                {film.ai_tools?.map((tool, index) => (
                  <div key={index} className="bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-600/30 rounded-lg p-3">
                    <span className="text-amber-400 font-medium">{tool}</span>
                  </div>
                )) || <p className="text-gray-400">Keine Tools angegeben</p>}
              </div>
            </div>

            {/* Category & Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Kategorie:</span>
                  <span className="text-amber-400 font-medium">{film.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Dauer:</span>
                  <span className="text-white">{film.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Featured:</span>
                  <span className="text-white">{film.featured ? '⭐ Ja' : 'Nein'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400 capitalize">{film.status || 'approved'}</span>
                </div>
              </div>
            </div>

            {/* Related Films */}
            {relatedFilms.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">Ähnliche Filme</h2>
                <div className="space-y-4">
                  {relatedFilms.map((relatedFilm) => (
                    <Link 
                      key={relatedFilm.id} 
                      href={`/films/${relatedFilm.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img 
                          src={relatedFilm.thumbnail_url} 
                          alt={relatedFilm.title}
                          className="w-16 h-9 object-cover rounded group-hover:opacity-80 transition-opacity"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors line-clamp-2">
                            {relatedFilm.title}
                          </h3>
                          <p className="text-gray-400 text-xs mt-1">{relatedFilm.creator}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}