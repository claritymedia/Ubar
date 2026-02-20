import React, { useState, useRef, useEffect } from 'react';
import { Navigation, Sparkles, Send, Loader2, ExternalLink, Map as MapIcon, Crosshair, Car, Phone, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Suggestion {
  name: string;
  address: string;
  description: string;
  url?: string;
}

const Ride: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [mapQuery, setMapQuery] = useState('Nightlife Seattle WA');
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Suggestion[]>([]);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  
  // Booking State
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'searching' | 'confirmed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Simulated Driver Tracking State
  const [driverPos, setDriverPos] = useState({ x: 10, y: 10 }); // Percentages
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isLocating, setIsLocating] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isAiLoading]);

  // Update map when dropoff changes significantly
  useEffect(() => {
    if (dropoff && dropoff.length > 5) {
      setMapQuery(dropoff);
    }
  }, [dropoff]);

  // Simulate Driver Movement (This effectively mimics the data socket connection)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (bookingStatus === 'confirmed') {
      // Start the car far away
      setDriverPos({ x: 80, y: 20 });
      
      interval = setInterval(() => {
        setDriverPos(prev => {
          // Move towards center screen (approx 50, 50)
          const targetX = 50;
          const targetY = 50;
          
          const dx = targetX - prev.x;
          const dy = targetY - prev.y;
          
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return prev; // Arrived

          return {
            x: prev.x + dx * 0.05,
            y: prev.y + dy * 0.05
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [bookingStatus]);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Geolocation is not supported by your browser." }]);
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordsString = `${latitude},${longitude}`;
        setPickup("Current Location");
        setMapQuery(coordsString); // Updates the background map
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location", error);
        setIsLocating(false);
        setChatHistory(prev => [...prev, { role: 'model', text: "I couldn't get your location. Please check your browser permissions." }]);
      }
    );
  };

  const handleRequestRide = () => {
    if (!pickup.trim() || !dropoff.trim()) {
      setErrorMessage("Please enter both pickup and drop-off locations.");
      return;
    }
    setErrorMessage("");
    setBookingStatus('searching');

    // Simulate API network request
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 2500);
  };

  const handleAiConsult = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsAiLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user wants to find a nightlife destination. User input: "${userMessage}". 
                  Based on this, suggest 2-3 specific bars, clubs, or event venues. 
                  Return your response as a JSON array of objects with keys: name, address, description, and url.
                  Focus on venues that would fit a "Mobile Bar" vibe (high energy, social, premium).`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        },
      });

      const rawText = response.text || '[]';
      const suggestions: Suggestion[] = JSON.parse(rawText);
      
      setAiSuggestions(suggestions);
      setChatHistory(prev => [...prev, { 
        role: 'model', 
        text: `I've found some premium spots for you tonight. Which one feels like the right vibe?` 
      }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the nightlife grid. Try again in a moment?" }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const selectDestination = (s: Suggestion) => {
    const fullAddress = `${s.name}, ${s.address}`;
    setDropoff(fullAddress);
    // Map will automatically update via the useEffect hook on 'dropoff'
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row relative bg-midnight overflow-hidden">
      
      {/* Background Map - Styled for Midnight Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(95%) contrast(90%) brightness(95%)' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=m&z=14&output=embed&iwloc=near`}
          className="w-full h-full opacity-40 transition-opacity duration-1000"
          title="Ubar Dynamic Map"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-transparent to-midnight pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent pointer-events-none"></div>

        {/* SIMULATED LIVE DRIVER MARKER */}
        {bookingStatus === 'confirmed' && (
          <div 
            className="absolute transition-all duration-1000 ease-in-out z-20 flex flex-col items-center"
            style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
          >
            <div className="bg-electric text-midnight text-[10px] font-bold px-2 py-1 rounded mb-1 whitespace-nowrap shadow-lg">
              Neon Dave (3 min)
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-electric/20 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-12 h-12 bg-black border-2 border-electric rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(132,182,244,0.6)] relative z-10 transform -rotate-45">
                 <Car className="w-6 h-6 text-electric" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Left Column: Booking UI */}
      <div className="relative z-10 w-full lg:w-[450px] p-4 sm:p-6 flex flex-col justify-center lg:h-[calc(100vh-80px)]">
        
        {/* Dynamic Panel Content - Opacity decreased from 80% to 60% as requested */}
        <div className="bg-midnight/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50 overflow-hidden relative transition-all duration-500">
          
          {/* STATE: IDLE (Booking Form) */}
          {bookingStatus === 'idle' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-electric/20 rounded-xl flex items-center justify-center">
                  <MapIcon className="text-electric w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-white leading-tight uppercase tracking-wide">
                    U DRINK. WE DRIVE.
                  </h1>
                  <p className="text-electric/80 text-sm font-bold mt-1">
                    Where to?
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Pickup Input */}
                <div className="relative group">
                  <button 
                    onClick={handleLocateMe}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-electric/50 hover:text-electric hover:scale-110 transition-all z-20 cursor-pointer"
                    title="Use Current Location"
                  >
                    {isLocating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Crosshair className="w-5 h-5" />
                    )}
                  </button>
                  <input 
                    type="text" 
                    placeholder="Pickup Location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-frost/30 focus:outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/20 transition-all"
                  />
                </div>

                {/* Dropoff Input */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-frost/50 group-focus-within:text-electric transition-colors">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Destination"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-frost/30 focus:outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/20 transition-all"
                  />
                </div>

                {errorMessage && (
                  <div className="text-red-400 text-xs px-2">{errorMessage}</div>
                )}

                <div className="pt-2">
                  <button 
                    onClick={handleRequestRide}
                    className="w-full bg-electric hover:bg-white hover:scale-[1.01] active:scale-[0.99] text-midnight font-bold py-4 rounded-xl shadow-lg shadow-electric/20 transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                  >
                    Request Ubar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE: SEARCHING */}
          {bookingStatus === 'searching' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-electric border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Car className="w-8 h-8 text-electric" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Finding your driver...</h3>
              <p className="text-frost/50 text-sm">Connecting you to the nearest Ubar Lounge.</p>
            </div>
          )}

          {/* STATE: CONFIRMED (Tracking) */}
          {bookingStatus === 'confirmed' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
               {/* Driver Header */}
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h2 className="text-xl font-bold text-white">Driver En Route</h2>
                   <p className="text-electric text-sm font-bold mt-1">Arriving in 3 mins</p>
                 </div>
                 <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                   UBAR-X1
                 </div>
               </div>

               {/* Progress Bar */}
               <div className="w-full bg-white/5 h-1.5 rounded-full mb-8 overflow-hidden">
                 <div className="h-full bg-electric w-2/3 animate-pulse"></div>
               </div>

               {/* Driver Info */}
               <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-2xl border border-white/5">
                 <div className="relative">
                   <img 
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Driver" 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/10" 
                   />
                   <div className="absolute -bottom-1 -right-1 bg-electric text-midnight text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                     4.9 <Star className="w-2 h-2 fill-current" />
                   </div>
                 </div>
                 <div>
                   <div className="text-white font-bold text-lg">Neon Dave</div>
                   <div className="text-frost/50 text-sm">Sprinter VIP Lounge</div>
                 </div>
                 <div className="ml-auto">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                 </div>
               </div>

               {/* Actions */}
               <div className="grid grid-cols-2 gap-3">
                 <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition-colors font-medium text-sm">
                   <MessageSquare className="w-4 h-4" /> Message
                 </button>
                 <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition-colors font-medium text-sm">
                   <Phone className="w-4 h-4" /> Call
                 </button>
                 <button 
                  onClick={() => setBookingStatus('idle')}
                  className="col-span-2 mt-2 text-xs text-red-400 hover:text-red-300 py-2"
                 >
                   Cancel Ride
                 </button>
               </div>
            </div>
          )}
        </div>

      </div>

      {/* Right Column: AI Concierge - Opacity decreased from 90% to 70% as requested */}
      <div className="hidden lg:flex relative z-10 flex-1 p-6 flex-col justify-end items-end h-[calc(100vh-80px)] pointer-events-none">
        <div className="bg-midnight/70 backdrop-blur-xl border border-white/10 rounded-[2rem] w-full max-w-md pointer-events-auto shadow-2xl flex flex-col max-h-[600px]">
          
          {/* AI Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-[2rem]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-electric rounded-full flex items-center justify-center shadow-lg shadow-electric/20">
                <Sparkles className="text-midnight w-4 h-4" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm">Need suggestions?</h2>
                <p className="text-[10px] text-frost/50">Powered by Gemini</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {chatHistory.length === 0 && (
              <div className="text-center py-8 opacity-50">
                <p className="text-sm text-white">Ask me for the best spots tonight.</p>
              </div>
            )}
            
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-electric text-midnight font-medium rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex justify-start">
                 <Loader2 className="w-5 h-5 text-electric animate-spin m-2" />
              </div>
            )}

            {/* AI Suggestion Cards (Compact) */}
            {aiSuggestions.length > 0 && (
              <div className="space-y-2 mt-2">
                {aiSuggestions.map((s, i) => (
                  <div 
                    key={i} 
                    className="bg-black/40 border border-white/10 rounded-xl p-3 hover:border-electric/50 transition-all cursor-pointer flex justify-between items-center group"
                    onClick={() => selectDestination(s)}
                  >
                    <div>
                       <h4 className="text-white text-sm font-bold group-hover:text-electric transition-colors">{s.name}</h4>
                       <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{s.address}</p>
                    </div>
                    <button className="text-[10px] bg-white/10 hover:bg-electric hover:text-midnight px-2 py-1 rounded transition-colors">
                      GO
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a club..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiConsult()}
                className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-electric transition-all"
              />
              <button 
                onClick={handleAiConsult}
                disabled={!chatInput.trim() || isAiLoading}
                className="absolute right-1 top-1 w-8 h-8 bg-electric rounded-full flex items-center justify-center text-midnight hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;