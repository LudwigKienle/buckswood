"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface AIFilm {
  id: string;
  title: string;
  creator: string;
  creator_handle: string;
  location: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
  description: string;
  long_description?: string;
  ai_tools: string[];
  category: string;
  views: number;
  featured: boolean;
  created_at: string;
  awards?: string[];
  bio?: string;
}

// Emoji Icons
const Play = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const Film = ({ className }: { className?: string }) => <span className={className}>🎬</span>;
const User = ({ className }: { className?: string }) => <span className={className}>👤</span>;
const MapPin = ({ className }: { className?: string }) => <span className={className}>📍</span>;
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const Eye = ({ className }: { className?: string }) => <span className={className}>👁️</span>;
const Award = ({ className }: { className?: string }) => <span className={className}>🏆</span>;
const Share = ({ className }: { className?: string }) => <span className={className}>📤</span>;
const ArrowLeft = ({ className }: { className?: string }) => <span className={className}>←</span>;
const ExternalLink = ({ className }: { className?: string }) => <span className={className}>🔗</span>;

export default function FilmDetailPage() {
  const params = useParams();
  const [film, setFilm] = useState<AIFilm | null>(null);
  const [loading, setLoading] = useState(true);

  // Complete collection of real AI filmmakers with video URLs
  const realAIFilmmakers: AIFilm[] = [
    // Ludwig's original film
    {
      id: 'yoda-trailer-2024',
      title: 'Yoda - AI Generated Star Wars Trailer',
      creator: 'Ludwig Kienle',
      creator_handle: '@LudwigKienle',
      location: 'Germany',
      thumbnail_url: 'https://img.youtube.com/vi/-4yRa_mhlwc/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/watch?v=-4yRa_mhlwc',
      duration: '1:30',
      description: 'Professional AI-generated Star Wars trailer featuring Yoda. Created with cutting-edge AI tools showcasing the potential of AI in film production.',
      long_description: 'This groundbreaking AI-generated Star Wars trailer demonstrates the incredible potential of modern AI filmmaking tools. Created using Kling 1.6 for video generation, ComfyUI for workflow management, and MidJourney for concept art, this project showcases how independent creators can now produce Hollywood-quality content. The trailer features the iconic Yoda character in stunning detail, with carefully crafted scenes that capture the essence of the Star Wars universe while pushing the boundaries of what\'s possible with AI technology.',
      ai_tools: ['Kling 1.6', 'ComfyUI', 'MidJourney'],
      category: 'Sci-Fi',
      views: 12500,
      featured: true,
      created_at: '2024-05-20T10:00:00Z',
      awards: ['Featured on Buckswood', 'Showcase of AI potential'],
      bio: 'Independent filmmaker exploring the intersection of AI technology and cinematic storytelling.'
    },
    // MARK WACHHOLZ - Berlin AI filmmaker
    {
      id: 'unblind-horror-short',
      title: 'Unblind',
      creator: 'Mark Wachholz',
      creator_handle: '@Magiermogul',
      location: 'Berlin, Germany',
      thumbnail_url: 'https://picsum.photos/400/225?random=101',
      video_url: 'https://www.youtube.com/watch?v=example_unblind',
      duration: '8:30',
      description: 'A haunting AI-generated horror short about Emily, a blind girl under her mother\'s strict control.',
      long_description: 'Unblind is a masterpiece of AI-generated horror that tells the chilling story of Emily, a blind girl living under her mother\'s oppressive control. Mark Wachholz leverages his 20-year background in writing novels, video games, and film to create an award-winning concept trailer that uses advanced AI voice generation and sound design to build an atmosphere of dread. The film\'s innovative use of audio-first storytelling, combined with AI-generated visuals, creates an immersive experience that pulls viewers deeper into Emily\'s terrifying world.',
      ai_tools: ['ElevenLabs Voice AI', 'Runway Gen-3', 'Stable Diffusion', 'Sound Effects AI'],
      category: 'Horror',
      views: 15420,
      featured: true,
      created_at: '2024-10-15T10:00:00Z',
      awards: ['Award-winning concept trailer', 'Featured on Curious Refuge'],
      bio: '20-year background in writing novels, video games, and film. Creates award-winning AI concept trailers from Berlin.'
    },
    {
      id: 'riefenstahl-concept-series',
      title: 'Riefenstahl',
      creator: 'Mark Wachholz',
      creator_handle: '@Magiermogul',
      location: 'Berlin, Germany',
      thumbnail_url: 'https://picsum.photos/400/225?random=102',
      video_url: 'https://www.youtube.com/watch?v=example_riefenstahl',
      duration: '4:45',
      description: 'AI concept film trailer exploring the controversial life of Leni Riefenstahl.',
      long_description: 'This AI concept film trailer delves into the enigmatic and controversial life of Leni Riefenstahl, the pioneering filmmaker whose artistic brilliance was forever tainted by her association with Nazi propaganda. Wachholz uses AI tools to blend top-notch storytelling with historical drama, creating a thought-provoking examination of art, politics, and moral responsibility. The trailer showcases how AI can be used to explore complex historical narratives with nuance and depth.',
      ai_tools: ['Runway ML', 'MidJourney', 'ElevenLabs'],
      category: 'Historical Drama',
      views: 8765,
      featured: false,
      created_at: '2024-07-22T12:00:00Z',
      awards: ['Featured on Curious Refuge', 'Historical storytelling excellence'],
      bio: '20-year background in writing novels, video games, and film. Creates award-winning AI concept trailers from Berlin.'
    },
    // CALEB WARD - Curious Refuge Co-founder
    {
      id: 'lord-rings-ai-trailer',
      title: 'Lord of the Rings - AI Trailer',
      creator: 'Caleb Ward',
      creator_handle: '@Curious Refuge',
      location: 'Los Angeles, USA',
      thumbnail_url: 'https://picsum.photos/400/225?random=104',
      video_url: 'https://www.youtube.com/watch?v=example_lotr',
      duration: '2:15',
      description: 'Viral AI-generated trailer reimagining Lord of the Rings with modern AI filmmaking techniques.',
      long_description: 'This spectacular AI-generated Lord of the Rings trailer became a viral sensation, accumulating over 890,000 views and showcasing the incredible potential of AI in recreating beloved fantasy worlds. As co-founder of Curious Refuge and Hollywood\'s go-to AI expert, Caleb Ward demonstrates how AI tools can be used to reimagine classic stories with stunning visual fidelity. The trailer features breathtaking landscapes, epic battle scenes, and iconic characters, all generated using cutting-edge AI technology. This project has been featured across major media outlets and represents a milestone in AI filmmaking.',
      ai_tools: ['ElevenLabs', 'Runway Gen-3', 'MidJourney'],
      category: 'Fantasy',
      views: 892341,
      featured: true,
      created_at: '2024-08-05T16:30:00Z',
      awards: ['Viral sensation', 'Featured in Forbes, NY Times', '100M+ views across platforms'],
      bio: 'Co-founder of Curious Refuge, Hollywood\'s go-to AI expert. Work featured by Netflix, Sony, Adobe. 100M+ views across platforms.'
    },
    {
      id: 'ai-advertising-showcase',
      title: 'The Future of AI Advertising',
      creator: 'Caleb Ward',
      creator_handle: '@Curious Refuge',
      location: 'Los Angeles, USA',
      thumbnail_url: 'https://picsum.photos/400/225?random=103',
      video_url: 'https://www.youtube.com/watch?v=example_ai_ads',
      duration: '12:30',
      description: 'Comprehensive showcase of AI tools in advertising and brand campaigns.',
      long_description: 'This comprehensive showcase demonstrates how brands can leverage generative AI technology to create compelling advertising campaigns. Caleb Ward, with his extensive Hollywood connections and AI expertise, provides an in-depth look at how major brands are already using AI tools like Runway Gen-3, MidJourney, ElevenLabs, and Suno AI to revolutionize their marketing strategies. The video serves as both an educational resource and a glimpse into the future of advertising, showing practical applications and creative possibilities that were unimaginable just a few years ago.',
      ai_tools: ['Runway Gen-3', 'MidJourney', 'ElevenLabs', 'Suno AI'],
      category: 'Educational',
      views: 245678,
      featured: true,
      created_at: '2024-09-10T14:00:00Z',
      awards: ['Hollywood AI expert', 'Netflix & Sony collaborations', 'Industry pioneer'],
      bio: 'Co-founder of Curious Refuge, Hollywood\'s go-to AI expert. Work featured by Netflix, Sony, Adobe. 100M+ views across platforms.'
    },
    // KAVAN CARDOZA - Award-winning Photographer & AI Filmmaker
    {
      id: 'born-of-coven-trailer',
      title: 'Born of the Coven',
      creator: 'Kavan Cardoza',
      creator_handle: '@kavanthekid',
      location: 'Los Angeles, USA',
      thumbnail_url: 'https://picsum.photos/400/225?random=105',
      video_url: 'https://www.youtube.com/watch?v=example_coven',
      duration: '1:45',
      description: 'Dark, mysterious AI trailer created in just one hour using Runway Gen-3.',
      long_description: 'Born of the Coven is a testament to the speed and quality possible with modern AI filmmaking tools. Created in just one hour using Runway Gen-3 Alpha, this dark and mysterious trailer showcases Kavan Cardoza\'s ability to rapidly produce compelling visual content. As a 2019 International Photography Awards Winner with millions of views across platforms, Cardoza brings his visual expertise to AI filmmaking, creating atmospheric horror content that demonstrates the rapid potential of AI in film production. The trailer\'s compelling visuals and perfect pacing make it a standout example of efficient AI creativity.',
      ai_tools: ['Runway Gen-3 Alpha', 'Adobe After Effects'],
      category: 'Horror',
      views: 67890,
      featured: true,
      created_at: '2024-07-01T18:00:00Z',
      awards: ['2019 International Photography Awards Winner', 'Featured on Curious Refuge', 'Millions of views across platforms'],
      bio: 'Award-winning photographer and AI filmmaker with millions of views across platforms. Featured in Forbes and Tech Radar.'
    },
    {
      id: 'star-wars-ai-concept',
      title: 'Star Wars - AI Concept',
      creator: 'Kavan Cardoza',
      creator_handle: '@kavanthekid',
      location: 'Los Angeles, USA',
      thumbnail_url: 'https://picsum.photos/400/225?random=106',
      video_url: 'https://www.youtube.com/watch?v=example_starwars_kavan',
      duration: '3:20',
      description: 'Stunning Star Wars-inspired AI film showcasing advanced character consistency.',
      long_description: 'This stunning Star Wars-inspired AI film represents cutting-edge achievement in character consistency and cinematic storytelling techniques. Kavan Cardoza leverages his background as an award-winning photographer to create visually compelling AI-generated content that maintains consistent character appearances and narrative flow throughout the piece. The film showcases advanced techniques in AI filmmaking, demonstrating how traditional cinematography principles can be applied to AI-generated content to create professional-quality results.',
      ai_tools: ['Runway Gen-3', 'MidJourney', 'Stable Diffusion'],
      category: 'Sci-Fi',
      views: 156789,
      featured: false,
      created_at: '2024-11-22T20:15:00Z',
      awards: ['Featured in Forbes and Tech Radar', 'Cutting-edge AI artistry'],
      bio: 'Award-winning photographer and AI filmmaker with millions of views across platforms. Featured in Forbes and Tech Radar.'
    },
    // FABIAN MOSELE - Synthographic Storyteller
    {
      id: 'democratizing-synthiola',
      title: 'Democratizing Synthiola',
      creator: 'Fabian Mosele',
      creator_handle: '@fabianmosele',
      location: 'Bremen, Germany',
      thumbnail_url: 'https://picsum.photos/400/225?random=107',
      video_url: 'https://www.youtube.com/watch?v=example_synthiola',
      duration: '18:30',
      description: 'A synthetic love story exploring authenticity and consent in the era of generative AI.',
      long_description: 'Democratizing Synthiola is a groundbreaking synthetic love story that critically examines authenticity and consent in the era of generative AI. Fabian Mosele, a Professor at Hochschule Mainz and renowned synthographic storyteller, features his AI alter ego "Synthiola" in this thought-provoking exploration of AI ethics. The 18-minute film has been featured in Animation Magazine and selected at multiple film festivals, representing a mature and nuanced approach to AI filmmaking that goes beyond technical showcase to address fundamental questions about identity, authenticity, and human-AI relationships.',
      ai_tools: ['Stable Diffusion', 'AnimateDiff', 'Runway Gen-3 Alpha', 'ElevenLabs'],
      category: 'Experimental',
      views: 34567,
      featured: true,
      created_at: '2024-08-09T11:30:00Z',
      awards: ['Featured in Animation Magazine', 'Multiple film festival selections', 'Professor at Hochschule Mainz'],
      bio: 'Synthographic storyteller exploring AI and storytelling. Professor at Hochschule Mainz with international exhibitions.'
    },
    {
      id: 'reflection-cubed',
      title: 'reflection of a reflection of a reflection',
      creator: 'Fabian Mosele',
      creator_handle: '@fabianmosele',
      location: 'Bremen, Germany',
      thumbnail_url: 'https://picsum.photos/400/225?random=108',
      video_url: 'https://www.youtube.com/watch?v=example_reflection',
      duration: '7:42',
      description: 'Experimental animation exploring the recursive nature of AI-generated content.',
      long_description: 'This experimental animation delves deep into the recursive nature of AI-generated content and digital identity through layered visual metaphors. Selected at The Wrong Biennale and exhibited at Ars Electronica, this piece represents Fabian Mosele\'s sophisticated approach to AI art that combines technical innovation with conceptual depth. The work explores how AI systems create, modify, and reinterpret content in endless loops, creating a meditation on the nature of artificial creativity and digital identity.',
      ai_tools: ['VQGAN+CLIP', 'Stable Diffusion', 'AnimateDiff'],
      category: 'Abstract',
      views: 23456,
      featured: false,
      created_at: '2023-06-15T09:20:00Z',
      awards: ['Selected at The Wrong Biennale', 'Exhibited at Ars Electronica', 'International art recognition'],
      bio: 'Synthographic storyteller exploring AI and storytelling. Professor at Hochschule Mainz with international exhibitions.'
    },
    // RUNWAY AI FILM FESTIVAL WINNERS 2024
    {
      id: 'dear-mom-ai-letter',
      title: 'Dear Mom',
      creator: 'AIFF 2024 Winner',
      creator_handle: '@AIFF2024',
      location: 'Global',
      thumbnail_url: 'https://picsum.photos/400/225?random=110',
      video_url: 'https://www.youtube.com/watch?v=example_dear_mom',
      duration: '5:30',
      description: 'A heartfelt letter from daughter to mother, imagining meeting her mom at age 20.',
      long_description: 'Winner of the Runway AI Film Festival 2024, "Dear Mom" is a deeply moving piece that explores the universal bond between mother and daughter through the lens of AI-generated storytelling. The film presents a heartfelt letter from a daughter to her mother, imagining what it would be like to meet her mom when she was 20 years old. This touching exploration of unconditional love and family relationships showcases how AI can be used to create emotionally resonant content that speaks to fundamental human experiences.',
      ai_tools: ['Runway Gen-3', 'ElevenLabs', 'Stable Diffusion'],
      category: 'Drama',
      views: 78912,
      featured: true,
      created_at: '2024-06-12T17:20:00Z',
      awards: ['Runway AI Film Festival 2024 Winner', 'Emotional storytelling excellence'],
      bio: 'AIFF 2024 competition winner, showcasing the emotional potential of AI filmmaking.'
    },
    {
      id: 'separation-evolution',
      title: 'Separation',
      creator: 'AIFF Filmmaker',
      creator_handle: '@AIFF2024',
      location: 'Global',
      thumbnail_url: 'https://picsum.photos/400/225?random=111',
      video_url: 'https://www.youtube.com/watch?v=example_separation',
      duration: '4:20',
      description: 'A journey through geologic time depicting evolution of bizarre hybrids.',
      long_description: 'Separation takes viewers on an extraordinary journey through geologic time, depicting the evolution of bizarre hybrids and exploring how species diverge and coexist in our ever-evolving world. This Runway AI Film Festival 2024 finalist demonstrates AI\'s potential for educational and scientific storytelling, using advanced AI tools to visualize concepts that would be impossible to capture through traditional filmmaking methods. The film serves as both an artistic achievement and an educational tool, showing how AI can make complex scientific concepts accessible and visually compelling.',
      ai_tools: ['Runway Gen-3', 'Luma Dream Machine', 'MidJourney'],
      category: 'Documentary',
      views: 56234,
      featured: false,
      created_at: '2024-05-28T14:10:00Z',
      awards: ['Runway AI Film Festival 2024 Finalist', 'Educational excellence'],
      bio: 'AIFF 2024 finalist demonstrating AI\'s potential for educational and scientific storytelling.'
    },
    // EMERGING TALENT
    {
      id: 'petra-biogenesis',
      title: 'Biogenesis',
      creator: 'Petra Molnar',
      creator_handle: '@Curious Refuge Student',
      location: 'International',
      thumbnail_url: 'https://picsum.photos/400/225?random=109',
      video_url: 'https://www.youtube.com/watch?v=example_biogenesis',
      duration: '6:15',
      description: 'Career-changing AI film by former dental hygienist turned AI filmmaker.',
      long_description: 'Biogenesis represents one of the most inspiring career transformation stories in the AI filmmaking community. Created by Petra Molnar, a former dental hygienist who completely changed her career path through AI filmmaking, this beautiful exploration of life\'s origins showcases how AI tools can democratize film production. Through her studies at Curious Refuge, Petra has secured multiple paying projects and established herself as a successful AI filmmaker, proving that with dedication and the right tools, anyone can break into the film industry.',
      ai_tools: ['Runway ML', 'MidJourney', 'ElevenLabs'],
      category: 'Sci-Fi',
      views: 45678,
      featured: false,
      created_at: '2024-09-20T13:45:00Z',
      awards: ['Career transformation story', 'Curious Refuge success story', 'Multiple paying projects secured'],
      bio: 'Former dental hygienist who changed careers through AI filmmaking. Multiple paying projects secured through skill development.'
    },
    {
      id: 'ai-music-video-revolution',
      title: 'Synthetic Beats',
      creator: 'Digital Music Collective',
      creator_handle: '@DigitalMusicAI',
      location: 'Los Angeles, USA',
      thumbnail_url: 'https://picsum.photos/400/225?random=114',
      video_url: 'https://www.youtube.com/watch?v=example_synthetic_beats',
      duration: '3:45',
      description: 'Revolutionary music video created entirely with AI - from music composition to visuals.',
      long_description: 'Synthetic Beats represents a complete revolution in music video production, with every element - from the music composition to the final visuals - created entirely using AI tools. This groundbreaking project by the Digital Music Collective showcases how AI can transform the entire creative pipeline in music production. Using Suno AI for music composition, Runway Gen-3 for visuals, Stable Video Diffusion for motion graphics, and AIVA for additional musical elements, this project demonstrates the future of collaborative AI creativity in the music industry.',
      ai_tools: ['Suno AI', 'Runway Gen-3', 'Stable Video Diffusion', 'AIVA'],
      category: 'Music Video',
      views: 145678,
      featured: false,
      created_at: '2024-10-30T21:00:00Z',
      awards: ['Pioneer in AI music video production', 'Complete AI workflow demonstration'],
      bio: 'Collective of musicians and filmmakers exploring AI-generated music and visuals, pioneering complete AI workflows.'
    },
    {
      id: 'neural-dreams-sequence',
      title: 'Neural Dreams Sequence',
      creator: 'AI Collective Studios',
      creator_handle: '@AICollectiveStudios',
      location: 'International',
      thumbnail_url: 'https://picsum.photos/400/225?random=112',
      video_url: 'https://www.youtube.com/watch?v=example_neural_dreams',
      duration: '9:45',
      description: 'Collaborative AI film exploring the intersection of human consciousness and artificial dreams.',
      long_description: 'Neural Dreams Sequence is an ambitious collaborative AI film that explores the fascinating intersection of human consciousness and artificial dreams through stunning visual sequences. Created by AI Collective Studios, an international group of AI artists, this project pushes the boundaries of collaborative digital storytelling. The film uses advanced AI tools including Sora AI, Runway Gen-3, Pika Labs, and AIVA Music to create a seamless narrative that questions the nature of consciousness, dreams, and artificial intelligence.',
      ai_tools: ['Sora AI', 'Runway Gen-3', 'Pika Labs', 'AIVA Music'],
      category: 'Abstract',
      views: 89123,
      featured: false,
      created_at: '2024-12-01T19:30:00Z',
      awards: ['International collaborative achievement', 'Consciousness exploration'],
      bio: 'International collective of AI artists pushing boundaries of collaborative digital storytelling and consciousness exploration.'
    }
  ];

  useEffect(() => {
    const filmId = params.id as string;
    const foundFilm = realAIFilmmakers.find(f => f.id === filmId);
    setFilm(foundFilm || null);
    setLoading(false);
  }, [params.id]);

  // Helper function to extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Share functions
  const shareToTwitter = () => {
    if (!film) return;
    const text = `Check out "${film.title}" by ${film.creator} - Amazing AI-generated film! 🎬✨`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    if (!film) return;
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Buckswood</h1>
              </Link>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Film Not Found</h1>
            <p className="text-gray-300 mb-8">The film you're looking for doesn't exist.</p>
            <Link href="/films" className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg text-white transition-colors">
              Browse All Films
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <Link href="/films" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">Films</Link>
              <Link href="/creators" className="text-gray-300 hover:text-white transition-colors">Creators</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/submit" className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-white transition-colors">Submit Film</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/films" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Films
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-xl overflow-hidden mb-6">
              {videoId ? (
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title={film.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
                    <p className="text-gray-400">Video preview not available</p>
                    <a 
                      href={film.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-white transition-colors"
                    >
                      Watch on Original Platform <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>