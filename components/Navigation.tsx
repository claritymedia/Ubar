import React, { useState } from 'react';
import { Tab } from '../types';
import { Menu, X, CarFront } from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Ride', value: Tab.RIDE },
    { label: 'Buy Passes', value: Tab.PASSES },
    { label: 'Sponsorships', value: Tab.SPONSORSHIPS },
    { label: 'Events', value: Tab.EVENTS },
    { label: 'Podcast', value: Tab.PODCAST },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setActiveTab(Tab.RIDE)}>
            <div className="relative w-20 h-20 hover:scale-105 transition-transform duration-300">
               {/* Custom SVG Logo with White Center */}
               <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_10px_rgba(132,182,244,0.3)]">
                  <defs>
                    <path id="upperCurve" d="M 30,100 A 70,70 0 1, 1 170,100" fill="none" />
                  </defs>

                  {/* 1. Outer Ring (Light Blue) */}
                  <circle cx="100" cy="100" r="98" fill="#84B6F4" />
                  
                  {/* 2. Text Ring Background (Dark) */}
                  <circle cx="100" cy="100" r="94" fill="#0A0E14" />

                  {/* 3. Inner Circle (White - High Contrast) */}
                  <circle cx="100" cy="100" r="60" fill="#FFFFFF" />

                  {/* 4. Upper Text */}
                  <text fontSize="12" fontWeight="800" letterSpacing="2" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" style={{textTransform: 'uppercase'}}>
                    <textPath href="#upperCurve" startOffset="50%" textAnchor="middle">
                      Ride Share Mobile Bar
                    </textPath>
                  </text>

                  {/* 5. Icon: Cocktail (Cobalt Blue for contrast on White) */}
                  <g transform="translate(100, 95)">
                    {/* Glass */}
                    <path d="M -22 -15 L 0 18 L 22 -15" fill="none" stroke="#2B3D7A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Stem */}
                    <path d="M 0 18 L 0 45" fill="none" stroke="#2B3D7A" strokeWidth="5" strokeLinecap="round" />
                    {/* Base */}
                    <line x1="-15" y1="45" x2="15" y2="45" stroke="#2B3D7A" strokeWidth="5" strokeLinecap="round" />
                    {/* Straw */}
                    <line x1="-8" y1="-15" x2="-18" y2="-30" stroke="#2B3D7A" strokeWidth="4" strokeLinecap="round" />
                    {/* Garnish */}
                    <circle cx="18" cy="-15" r="6" stroke="#2B3D7A" strokeWidth="4" fill="none" />
                  </g>

                  {/* 6. Bottom Text (U-BAR) */}
                  <text x="100" y="175" textAnchor="middle" fontSize="28" fontWeight="900" fill="#84B6F4" fontFamily="Montserrat, sans-serif" letterSpacing="2">
                    U-BAR
                  </text>
               </svg>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeTab === item.value
                      ? 'text-electric scale-105 drop-shadow-[0_0_8px_rgba(132,182,244,0.5)]'
                      : 'text-frost hover:text-white hover:scale-105'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            
            <button
              onClick={() => setActiveTab(Tab.DRIVER)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === Tab.DRIVER
                  ? 'bg-electric text-midnight border-electric'
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-electric hover:text-white'
              }`}
            >
              <CarFront className="w-4 h-4" />
              Driver
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-electric hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="block w-6 h-6" /> : <Menu className="block w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-midnight border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActiveTab(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-4 rounded-md text-base font-medium w-full text-left ${
                   activeTab === item.value
                      ? 'bg-cobalt/30 text-electric'
                      : 'text-frost hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button
                onClick={() => {
                  setActiveTab(Tab.DRIVER);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-4 rounded-md text-base font-medium w-full text-left mt-2 border-t border-white/5 ${
                   activeTab === Tab.DRIVER
                      ? 'text-electric'
                      : 'text-gray-400 hover:text-white'
                }`}
              >
                <CarFront className="w-4 h-4" /> Driver Portal
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;