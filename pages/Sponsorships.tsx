import React from 'react';
import { Camera, Maximize, Users, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const Sponsorships: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-midnight text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Partner with <span className="text-electric">Ubar</span>
          </h1>
          <p className="text-xl text-frost max-w-3xl mx-auto leading-relaxed">
            Connect your brand with the city's most vibrant Mobile Rideshare Bar and mobile night brand on wheels. High visibility, dynamic engagement.
          </p>
        </div>

        {/* Flagship Vehicle Showcase (Replaces Stats Grid) */}
        <div className="mb-20 relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {/* Neon Aura Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-electric/20 to-cobalt/20 rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          
          <div className="relative bg-midnight border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black">
            <div className="aspect-[21/9] w-full relative">
              {/* Main Ubar Photo */}
              <img 
                src="https://assets.cdn.filesafe.space/SVWsujT7qeJa4x497Bn4/media/698ff0d9899b88845d78622c.png" 
                alt="The Ubar Flagship Fleet" 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-midnight/60 via-transparent to-transparent"></div>

              {/* Content on Image */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric text-midnight text-[10px] font-black tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(132,182,244,0.4)]">
                    <Sparkles className="w-3 h-3" /> THE FLAGSHIP FLEET
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter leading-tight mb-4">
                    The Ultimate <br /> 
                    <span className="text-electric text-2xl md:text-4xl block mt-1">Mobile Rideshare Experience, Day and Night</span>
                  </h2>
                  <p className="text-frost/70 text-sm md:text-base max-w-lg hidden md:block font-medium">
                    The first Mobile Rideshare that has a bar and a DJ.
                  </p>
                </div>

                {/* Specs/Badges - Simplified */}
                <div className="flex gap-3 md:gap-4 self-start md:self-auto">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-3 md:p-5 rounded-3xl flex flex-col items-center min-w-[80px] md:min-w-[110px] hover:border-electric/40 transition-colors">
                    <ShieldCheck className="text-electric w-6 h-6 md:w-8 md:h-8 mb-1" />
                    <span className="text-gray-500 text-[9px] md:text-[10px] uppercase font-bold tracking-widest">VIP Sec.</span>
                  </div>
                </div>
              </div>

              {/* Floating Camera Button (UX Detail) */}
              <div className="absolute top-8 right-8 hidden lg:block">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all cursor-pointer">
                   <Maximize className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="font-display text-3xl font-bold text-electric">Brand Partnerships</h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Transform our fleet into your mobile billboard while supporting the city’s most sophisticated ride-share mission. At ubar, our first responsibility is to our riders: <span className="text-white font-semibold">U Drink! We Drive.</span> By partnering with us, your brand becomes an integral part of a service that traverses high-traffic districts during peak hours, ensuring safe, high-end transport for the community.
              </p>
              <p>
                We offer unique opportunities to weave your brand into the ubar experience through full vehicle wraps, interior digital screen takeovers, and curated road trip events. Beyond the ride, we specialize in special event pop-ups and collaborations with local business owners to create "The party before the party."
              </p>
              <p>
                Whether through a brand activation during a festival or a sponsored route, your message is delivered via a tech-forward lounge featuring a Live DJ, 24-hour karaoke, and a Mobile Podcast Studio. Join us in making the journey the destination—responsibly.
              </p>
            </div>
            <ul className="list-disc list-inside text-frost space-y-2 pt-2">
              <li>Full Vehicle Wraps & Digital Screen Takeovers</li>
              <li>Curated Road Trip Events & Sponsored Routes</li>
              <li>Special Event Pop-ups & Local Collaborations</li>
              <li>Tech-Forward Lounge: DJ, Karaoke, Podcast Studio</li>
            </ul>
          </div>
          <div className="relative h-64 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 group">
            <img 
              src="https://assets.cdn.filesafe.space/SVWsujT7qeJa4x497Bn4/media/69976d498d5b5a124989a623.png" 
              alt="Ubar Vehicle Wrap Detail" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-electric/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent"></div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cobalt to-midnight border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready to drive engagement?</h2>
          <button className="bg-electric hover:bg-white text-midnight font-bold py-4 px-12 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(132,182,244,0.3)] uppercase tracking-widest text-sm">
            Contact Sponsorship Team
          </button>
        </div>

      </div>
    </div>
  );
};

export default Sponsorships;