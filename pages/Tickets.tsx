import React from 'react';
import { PASS_OPTIONS } from '../constants';
import { Check, ArrowRight, ExternalLink, Crown, LayoutDashboard } from 'lucide-react';

// =========================================================================
// 🔗 CONFIGURATION: PASTE YOUR GHL (GO HIGH LEVEL) MEMBERSHIP LINK BELOW
// =========================================================================
const GHL_MEMBERSHIP_LINK = "https://app.gohighlevel.com/"; 
// =========================================================================

const Passes: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-midnight text-white">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          <span className="text-electric">Access</span> The Experience
        </h2>
        <p className="text-frost text-lg mb-8">Choose your pass to the most exclusive mobile bar in the city.</p>
        
        {/* GHL Membership Link Section */}
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
           <a 
             href={GHL_MEMBERSHIP_LINK}
             target="_blank"
             rel="noopener noreferrer"
             className="group bg-electric/10 hover:bg-electric text-electric hover:text-midnight border border-electric/50 px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(132,182,244,0.2)] hover:shadow-[0_0_25px_rgba(132,182,244,0.5)] transform hover:-translate-y-0.5"
           >
             <LayoutDashboard className="w-4 h-4" />
             <span>Member Login / Sign Up</span>
             <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
           </a>
           <p className="text-xs text-gray-500 mt-3">Managed via our secure Partner Portal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Auth Section / Membership Tile */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-cobalt/10 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full blur-3xl group-hover:bg-electric/10 transition-colors"></div>
            
            <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-electric to-cobalt rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-electric/20">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-white mb-3">Ubar Membership</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Already a member? Log in to your dashboard to manage subscriptions, view ride history, and access exclusive VIP perks.
                </p>

                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-3 text-sm text-gray-300">
                     <div className="w-2 h-2 rounded-full bg-electric shadow-[0_0_5px_rgba(132,182,244,0.8)]"></div>
                     Manage Payment Methods
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-300">
                     <div className="w-2 h-2 rounded-full bg-electric shadow-[0_0_5px_rgba(132,182,244,0.8)]"></div>
                     Track Ride Credits
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-300">
                     <div className="w-2 h-2 rounded-full bg-electric shadow-[0_0_5px_rgba(132,182,244,0.8)]"></div>
                     Member-Only Event Invites
                   </div>
                </div>

                <a 
                   href={GHL_MEMBERSHIP_LINK}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full bg-white hover:bg-gray-100 text-midnight font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
                >
                  Go to Member Portal <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
            </div>
          </div>
        </div>

        {/* Passes Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PASS_OPTIONS.map((pass) => (
            <div 
              key={pass.id}
              className={`relative bg-gradient-to-b from-white/5 to-transparent border ${pass.isPopular ? 'border-electric shadow-[0_0_20px_rgba(132,182,244,0.15)]' : 'border-white/5'} rounded-2xl p-6 hover:border-white/20 transition-all group`}
            >
              {pass.isPopular && (
                <div className="absolute top-0 right-0 bg-electric text-midnight text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                  POPULAR
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-white mb-2">{pass.title}</h3>
              <div className="text-3xl font-bold text-electric mb-1">{pass.price}</div>
              <p className="text-sm text-gray-400 mb-6 h-10">{pass.description}</p>
              
              <ul className="space-y-3 mb-8">
                {pass.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <Check className="w-4 h-4 text-electric mr-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button links to GHL Membership Portal */}
              <a 
                href={GHL_MEMBERSHIP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-lg border border-white/20 hover:bg-electric hover:border-electric hover:text-midnight font-semibold transition-all duration-300 cursor-pointer"
              >
                Purchase Pass
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Passes;