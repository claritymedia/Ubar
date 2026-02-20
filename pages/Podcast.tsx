import React, { useEffect, useState } from 'react';
import { PODCAST_EPISODES, CASTOS_RSS_URL } from '../constants';
import { Play, Mic2, Headphones, Pause, Loader2, AlertCircle } from 'lucide-react';

interface FeedItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: {
    link: string;
    type: string;
    length: number;
    duration?: number;
  };
}

interface FeedData {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: FeedItem[];
}

const Podcast: React.FC = () => {
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeEpisodeUrl, setActiveEpisodeUrl] = useState<string | null>(null);

  // Fetch Podcast Data
  useEffect(() => {
    if (!CASTOS_RSS_URL) return;

    setLoading(true);
    // Use rss2json to convert RSS XML to JSON easily in the browser
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(CASTOS_RSS_URL)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setFeed(data);
        } else {
          setError('Could not load podcast feed.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to connect to podcast service.');
        setLoading(false);
      });
  }, []);

  const toggleAudio = (url: string) => {
    const audio = document.getElementById('ubar-audio-player') as HTMLAudioElement;
    if (!audio) return;

    if (activeEpisodeUrl === url) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        setActiveEpisodeUrl(null); // Simple toggle off UI state
      }
    } else {
      audio.src = url;
      audio.play();
      setActiveEpisodeUrl(url);
    }
  };

  // -----------------------------------------------------------------
  // Fallback UI (If no RSS URL is configured in constants.ts)
  // -----------------------------------------------------------------
  if (!CASTOS_RSS_URL && !feed) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-midnight text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="w-64 h-64 bg-gradient-to-br from-cobalt to-black rounded-3xl border-2 border-electric flex items-center justify-center shadow-2xl shadow-electric/20 shrink-0">
               <Mic2 className="w-24 h-24 text-electric" />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric text-xs font-bold mb-4">
                <div className="w-2 h-2 bg-electric rounded-full animate-pulse"></div>
                SETUP REQUIRED
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">The Ubar <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-400">Podcast</span></h1>
              <p className="text-frost text-lg max-w-lg mb-6">Connect your RSS feed in the code to automatically populate this page.</p>
            </div>
          </div>
          <div className="space-y-4 opacity-50">
            <h3 className="font-bold text-xl mb-6 border-b border-white/10 pb-4">Latest Episodes (Preview)</h3>
            {PODCAST_EPISODES.map((ep) => (
              <div key={ep.id} className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-electric font-mono font-bold">{ep.id}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{ep.title}</h4>
                  <p className="text-sm text-gray-500">Hosted by The Ubar Team</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // Main UI (Dynamic Data)
  // -----------------------------------------------------------------
  return (
    <div className="min-h-screen pt-24 pb-12 bg-midnight text-white">
      {/* Hidden Global Audio Player */}
      <audio id="ubar-audio-player" className="hidden" onEnded={() => setActiveEpisodeUrl(null)} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-electric animate-spin mb-4" />
            <p className="text-frost">Syncing with Castos...</p>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-white font-bold">{error}</p>
            <p className="text-gray-500 text-sm mt-2">Check your RSS URL in constants.ts</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center gap-10 mb-16 animate-in fade-in duration-700">
              {/* Dynamic Artwork */}
              <div className="w-64 h-64 bg-black rounded-3xl border-2 border-electric shadow-2xl shadow-electric/20 shrink-0 overflow-hidden relative group">
                 {feed?.feed.image ? (
                   <img src={feed.feed.image} alt={feed.feed.title} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cobalt to-black">
                     <Mic2 className="w-24 h-24 text-electric" />
                   </div>
                 )}
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-electric text-midnight rounded-full p-4">
                       <Headphones className="w-8 h-8" />
                    </div>
                 </div>
              </div>

              {/* Dynamic Info */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric text-xs font-bold mb-4">
                  <div className="w-2 h-2 bg-electric rounded-full animate-pulse"></div>
                  NOW STREAMING
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {feed?.feed.title || "The Ubar Podcast"}
                </h1>
                <p className="text-frost text-base md:text-lg max-w-xl mb-6 line-clamp-3">
                  {feed?.feed.description || "Conversations from the backseat. We talk nightlife, tech, and the future of social mobility."}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                   <a 
                    href={feed?.feed.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                   >
                     <Headphones className="w-5 h-5" /> Visit Website
                   </a>
                   <button className="bg-transparent border border-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                     Subscribe
                   </button>
                </div>
              </div>
            </div>

            {/* Episode List */}
            <div className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-100">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h3 className="font-bold text-xl">Latest Episodes</h3>
                <span className="text-sm text-gray-400">{feed?.items.length} Episodes Available</span>
              </div>
              
              {feed?.items.map((ep, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl flex items-center gap-4 transition-all group cursor-pointer border ${
                    activeEpisodeUrl === ep.enclosure.link 
                      ? 'bg-electric/10 border-electric' 
                      : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-electric/30'
                  }`}
                  onClick={() => toggleAudio(ep.enclosure.link)}
                >
                  <div className="relative w-16 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={ep.thumbnail || feed?.feed.image || ''} 
                      alt="Ep Art" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {activeEpisodeUrl === ep.enclosure.link ? (
                         <div className="w-8 h-8 bg-electric rounded-full flex items-center justify-center animate-pulse">
                           <Pause className="w-4 h-4 text-midnight fill-current" />
                         </div>
                      ) : (
                         <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-electric transition-colors">
                           <Play className="w-4 h-4 text-white group-hover:text-midnight fill-current ml-0.5" />
                         </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-lg truncate ${activeEpisodeUrl === ep.enclosure.link ? 'text-electric' : 'text-white group-hover:text-electric transition-colors'}`}>
                      {ep.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-gray-500">{new Date(ep.pubDate).toLocaleDateString()}</p>
                      {ep.author && <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">{ep.author}</span>}
                    </div>
                  </div>

                  {activeEpisodeUrl === ep.enclosure.link && (
                    <div className="hidden md:flex items-center gap-2 text-electric text-xs font-bold animate-pulse">
                      <div className="w-2 h-2 bg-electric rounded-full"></div>
                      PLAYING
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Podcast;