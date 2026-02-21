import React, { useState, useEffect } from 'react';
import { Power, Radio, MapPin, Navigation as NavIcon, DollarSign, Clock, Shield, Loader2, CheckCircle, Car, User, AlertCircle, LogOut, Star } from 'lucide-react';
import { checkCredentials, DriverProfile } from '../data/mockDb';

const Driver: React.FC = () => {
  // View State: 'loading' | 'login' | 'register' | 'dashboard'
  const [view, setView] = useState<'loading' | 'login' | 'registe' | 'dashboard'>('loading');
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState({ lat: 32.7767, lng: -96.7970 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Current Session Data
  const [currentDriver, setCurrentDriver] = useState<DriverProfile | null>(null);

  // Login Form State
  const [driverId, setDriverId] = useState('');
  const [password, setPassword] = useState('');

  // Registration Form State
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    vehicleModel: '',
    licensePlate: '',
  });
  const [isApplicationSent, setIsApplicationSent] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const savedSession = localStorage.getItem('ubar_driver_session');
      if (savedSession) {
        // In a real app, we would validate the token with the server.
        // Here we just re-hydrate the driver data if stored, or force re-login if data is missing
        const savedDriverData = localStorage.getItem('ubar_driver_data');
        if (savedDriverData) {
          setCurrentDriver(JSON.parse(savedDriverData));
          setView('dashboard');
        } else {
          setView('login');
        }
      } else {
        setView('login');
      }
    };
    // Simulate initial load check
    setTimeout(checkSession, 800);
  }, []);

  // Simulation of GPS polling
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isOnline && view === 'dashboard') {
      interval = setInterval(() => {
        // Simulate GPS drift/movement
        setLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0005,
          lng: prev.lng + (Math.random() - 0.5) * 0.0005
        }));
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isOnline, view]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      const driver = checkCredentials(driverId, password);
      
      if (driver) {
        localStorage.setItem('ubar_driver_session', 'active');
        localStorage.setItem('ubar_driver_data', JSON.stringify(driver));
        setCurrentDriver(driver);
        setView('dashboard');
      } else {
        setError('Invalid Credentials. Access Denied.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Application Submission
    setTimeout(() => {
      setIsApplicationSent(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('ubar_driver_session');
    localStorage.removeItem('ubar_driver_data');
    setIsOnline(false);
    setCurrentDriver(null);
    setView('login');
    setDriverId('');
    setPassword('');
  };

  // ----------------------------------------------------------------------
  // VIEW: LOADING
  // ----------------------------------------------------------------------
  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-midnight flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-electric animate-spin mb-4" />
        <p className="text-frost text-sm font-mono tracking-widest">CONNECTING TO FLEET NETWORK...</p>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW: LOGIN / REGISTER
  // ----------------------------------------------------------------------
  if (view === 'login' || view === 'register') {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-midnight flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
           
           {/* Header */}
           <div className="text-center mb-8 relative z-10">
             <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-electric/30 shadow-[0_0_15px_rgba(132,182,244,0.2)]">
               <Shield className="w-8 h-8 text-electric" />
             </div>
             <h2 className="text-2xl font-bold text-white font-display">
               {view === 'login' ? 'Driver Portal' : 'New Driver Application'}
             </h2>
             <p className="text-gray-400 text-sm">
               {view === 'login' ? 'Authorized Personnel Only' : 'Join the Elite Fleet'}
             </p>
           </div>

           {/* Toggle Tabs */}
           {!isApplicationSent && (
             <div className="flex bg-white/5 p-1 rounded-xl mb-6">
               <button 
                 onClick={() => { setView('login'); setError(''); }}
                 className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === 'login' ? 'bg-electric text-midnight shadow-lg' : 'text-gray-400 hover:text-white'}`}
               >
                 Login
               </button>
               <button 
                 onClick={() => { setView('register'); setError(''); }}
                 className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === 'register' ? 'bg-electric text-midnight shadow-lg' : 'text-gray-400 hover:text-white'}`}
               >
                 Apply
               </button>
             </div>
           )}

           {/* LOGIN FORM */}
           {view === 'login' && (
             <form onSubmit={handleLogin} className="space-y-4 relative z-10">
               {error && (
                 <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-200 text-xs">
                   <AlertCircle className="w-4 h-4" /> {error}
                 </div>
               )}
               
               <div>
                 <label className="text-[10px] text-electric uppercase font-bold tracking-wider mb-1 block">Driver ID</label>
                 <div className="relative">
                   <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                   <input 
                      type="text" 
                      value={driverId}
                      onChange={(e) => setDriverId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-colors font-mono uppercase"
                      placeholder="UB-ADMIN"
                   />
                 </div>
               </div>
               <div>
                 <label className="text-[10px] text-electric uppercase font-bold tracking-wider mb-1 block">Secure Pin</label>
                 <div className="relative">
                   <Shield className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                   <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-colors font-mono"
                      placeholder="••••"
                   />
                 </div>
               </div>
               <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-electric text-midnight font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest mt-4 shadow-[0_0_20px_rgba(132,182,244,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
               >
                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Access System'}
               </button>
               
               <div className="text-center mt-4">
                 <p className="text-xs text-gray-500">
                   System Status: <span className="text-green-400">ONLINE</span>
                 </p>
               </div>
             </form>
           )}

           {/* REGISTER FORM */}
           {view === 'register' && !isApplicationSent && (
             <form onSubmit={handleRegister} className="space-y-4 relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                 <label className="text-[10px] text-electric uppercase font-bold tracking-wider mb-1 block">Full Name</label>
                 <input 
                    required
                    type="text" 
                    value={regData.name}
                    onChange={(e) => setRegData({...regData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-electric outline-none transition-colors"
                    placeholder="Jane Doe"
                 />
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="text-[10px] text-electric uppercase font-bold tracking-wider mb-1 block">Vehicle Model</label>
                   <input 
                      required
                      type="text" 
                      value={regData.vehicleModel}
                      onChange={(e) => setRegData({...regData, vehicleModel: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-electric outline-none transition-colors"
                      placeholder="Mercedes Sprinter"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] text-electric uppercase font-bold tracking-wider mb-1 block">License Plate</label>
                   <input 
                      required
                      type="text" 
                      value={regData.licensePlate}
                      onChange={(e) => setRegData({...regData, licensePlate: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-electric outline-none transition-colors uppercase"
                      placeholder="XYZ-123"
                   />
                 </div>
               </div>
               <div>
                 <label className="text-[10px] text-electric uppercase font-bold tracking-wider mb-1 block">Email</label>
                 <input 
                    required
                    type="email" 
                    value={regData.email}
                    onChange={(e) => setRegData({...regData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-electric outline-none transition-colors"
                    placeholder="driver@example.com"
                 />
               </div>

               <div className="flex items-center gap-2 py-2">
                 <input type="checkbox" required className="accent-electric" id="terms" />
                 <label htmlFor="terms" className="text-xs text-gray-400">I agree to the background check & terms.</label>
               </div>

               <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-electric text-midnight font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest mt-2 shadow-[0_0_20px_rgba(132,182,244,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
               </button>
             </form>
           )}

           {/* SUCCESS STATE */}
           {view === 'register' && isApplicationSent && (
             <div className="text-center py-8 animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="w-10 h-10 text-green-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Application Received</h3>
               <p className="text-gray-400 text-sm mb-6">
                 Thanks {regData.name}. Our fleet manager will review your documents and contact you at {regData.email} within 24 hours.
               </p>
               <button 
                 onClick={() => { setIsApplicationSent(false); setView('login'); }}
                 className="text-electric hover:text-white text-sm font-bold underline underline-offset-4"
               >
                 Return to Login
               </button>
             </div>
           )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW: DASHBOARD (AUTHENTICATED)
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen pt-24 pb-12 bg-midnight text-white relative overflow-hidden">
      {/* Background Map Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grayscale invert">
         <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&t=m&z=15&output=embed`}
          title="Driver Map"
        ></iframe>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 h-full flex flex-col">
        
        {/* Status Header */}
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-6 shadow-lg animate-in slide-in-from-top-4 duration-500">
          
          {/* Driver Mini Profile */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="relative">
              <img src={currentDriver?.avatar} className="w-12 h-12 rounded-full border border-electric/50" alt="Profile" />
              <div className="absolute -bottom-1 -right-1 bg-electric text-midnight text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center">
                {currentDriver?.rating} <Star className="w-2 h-2 fill-current ml-0.5" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm">{currentDriver?.name}</h3>
              <p className="text-xs text-gray-400 truncate w-32">{currentDriver?.vehicle}</p>
            </div>
             <button 
              onClick={handleLogout}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Online Toggle */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <div>
                <h3 className="font-bold text-sm">{isOnline ? 'ONLINE' : 'OFFLINE'}</h3>
                <p className="text-xs text-gray-400">{isOnline ? 'Broadcasting location' : 'Invisible to riders'}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${isOnline ? 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'}`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-cobalt/20 backdrop-blur border border-white/10 p-4 rounded-xl">
             <DollarSign className="w-5 h-5 text-electric mb-2" />
             <div className="text-2xl font-bold">{currentDriver?.earnings}</div>
             <div className="text-xs text-gray-400">Tonight's Earnings</div>
          </div>
          <div className="bg-cobalt/20 backdrop-blur border border-white/10 p-4 rounded-xl">
             <Clock className="w-5 h-5 text-electric mb-2" />
             <div className="text-2xl font-bold">{currentDriver?.onlineTime}</div>
             <div className="text-xs text-gray-400">Online Time</div>
          </div>
        </div>

        {/* Live Data Feed Simulation */}
        <div className="flex-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col min-h-[300px]">
           <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
             <h3 className="font-bold flex items-center gap-2 text-sm">
               <Radio className={`w-4 h-4 ${isOnline ? 'text-electric animate-pulse' : 'text-gray-600'}`} />
               GPS Telemetry
             </h3>
             <span className="text-[10px] font-mono text-electric bg-electric/10 px-2 py-1 rounded">
               {isOnline ? 'TX: ACTIVE' : 'TX: STANDBY'}
             </span>
           </div>

           <div className="font-mono text-xs space-y-2 text-green-400/80 overflow-hidden flex-1">
             {isOnline ? (
               <>
                 <div className="flex justify-between">
                   <span>LAT:</span>
                   <span>{location.lat.toFixed(6)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>LNG:</span>
                   <span>{location.lng.toFixed(6)}</span>
                 </div>
                 <div className="flex justify-between text-gray-500">
                   <span>ACCURACY:</span>
                   <span>4.2m</span>
                 </div>
                 <div className="flex justify-between text-gray-500">
                   <span>SPEED:</span>
                   <span>{(Math.random() * 30 + 10).toFixed(1)} mph</span>
                 </div>
                 <div className="mt-4 pt-4 border-t border-white/5 text-gray-500">
                   <p className="animate-pulse">{'>'} Uploading packet #{(Date.now() / 1000).toFixed(0)}...</p>
                 </div>
               </>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                 <Radio className="w-8 h-8 opacity-20" />
                 <span className="italic">GPS Module Offline</span>
               </div>
             )}
           </div>

           {/* Incoming Request Simulation */}
           {isOnline && (
             <div className="mt-4 pt-4 border-t border-white/10">
                <div className="bg-electric/10 border border-electric/30 rounded-xl p-4 animate-in slide-in-from-bottom duration-700">
                   <div className="flex justify-between items-start mb-2">
                     <span className="bg-electric text-midnight text-[10px] font-bold px-2 py-0.5 rounded">NEW REQUEST</span>
                     <span className="text-xs text-gray-400">2 min away</span>
                   </div>
                   <div className="font-bold text-white text-lg mb-1">Pick up: The Ritz-Carlton</div>
                   <div className="text-sm text-gray-300 flex items-center gap-1">
                      <NavIcon className="w-3 h-3" /> 4.2 mi trip
                   </div>
                   <button className="w-full bg-electric hover:bg-white text-midnight font-bold py-3 rounded-lg mt-3 transition-colors text-sm">
                     ACCEPT RIDE
                   </button>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Driver;
