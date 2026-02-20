import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center gap-3">
           <div className="w-12 h-12 relative rounded-full overflow-hidden">
             <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path id="footerCurve" d="M 30,100 A 70,70 0 1, 1 170,100" fill="none" />
                  </defs>

                  {/* Background Layers */}
                  <circle cx="100" cy="100" r="98" fill="#84B6F4" />
                  <circle cx="100" cy="100" r="94" fill="#0A0E14" />
                  <circle cx="100" cy="100" r="60" fill="#FFFFFF" />

                  {/* Icon */}
                  <g transform="translate(100, 95)">
                    <path d="M -22 -15 L 0 18 L 22 -15" fill="none" stroke="#2B3D7A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 0 18 L 0 45" fill="none" stroke="#2B3D7A" strokeWidth="6" strokeLinecap="round" />
                    <line x1="-15" y1="45" x2="15" y2="45" stroke="#2B3D7A" strokeWidth="6" strokeLinecap="round" />
                  </g>
             </svg>
           </div>
          <div>
            <span className="font-display font-bold text-xl text-white tracking-widest">
              U-BAR
            </span>
            <p className="text-xs text-gray-500">© 2024 Ubar Mobile Rideshare.</p>
          </div>
        </div>
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-electric">Privacy Policy</a>
          <a href="#" className="hover:text-electric">Terms of Service</a>
          <a href="#" className="hover:text-electric">Drivers</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;