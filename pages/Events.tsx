import React from 'react';
import { UPCOMING_EVENTS } from '../constants';
import { Calendar, MapPin, Plus } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-midnight text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold text-white">Upcoming <span className="text-electric">Events</span></h2>
            <p className="text-gray-400 mt-2">Where Ubar is heading next.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10">
            <Plus className="w-4 h-4" /> Add Event Request
          </button>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.id} className="group bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-electric/50 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-midnight/80 backdrop-blur text-electric px-3 py-1 rounded text-xs font-bold border border-electric/20">
                  FEATURED
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-electric transition-colors">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-electric" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-6">
                  <MapPin className="w-4 h-4 mr-2 text-electric" />
                  {event.location}
                </div>
                <button className="w-full py-2 rounded border border-white/20 hover:bg-white hover:text-black transition-colors text-sm uppercase font-bold tracking-wider">
                  RSVP Ride
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Gallery Section */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">The <span className="text-electric">Vibe</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
             <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden">
                <img src="https://picsum.photos/800/800?random=10" className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Gallery 1" />
             </div>
             <div className="relative rounded-2xl overflow-hidden">
                <img src="https://picsum.photos/400/400?random=11" className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Gallery 2" />
             </div>
             <div className="relative rounded-2xl overflow-hidden">
                <img src="https://picsum.photos/400/400?random=12" className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Gallery 3" />
             </div>
             <div className="col-span-2 relative rounded-2xl overflow-hidden">
                <img src="https://picsum.photos/800/400?random=13" className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="Gallery 4" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;