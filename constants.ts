import { PassOption, EventItem } from './types';

// =========================================================================
// 🎨 LOGO CONFIGURATION
// Place your logo file in the project root and update the filename here.
// Supports: .png, .jpg, .svg
// =========================================================================
export const LOGO_URL = "./ubar-logo.png";
// =========================================================================

// =========================================================================
// 🎙️ PODCAST CONFIGURATION
// Paste your Castos (or any podcast host) RSS Feed URL here.
// Example: "https://feeds.castos.com/12345"
// =========================================================================
export const CASTOS_RSS_URL = ""; 
// =========================================================================

export const PASS_OPTIONS: PassOption[] = [
  {
    id: 'day-pass',
    title: 'U BAR DAY PASS',
    description: 'Digital Pass. Daytime access to the ultimate mobile lounge.',
    price: '$35.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'night-pass',
    title: 'U BAR NIGHT PASS',
    description: 'Digital Pass. Experience the nightlife on the move.',
    price: '$65.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
    isPopular: true,
  },
  {
    id: 'couples-day',
    title: 'U BAR COUPLES DAY PASS',
    description: 'Physical Pass. Daytime vibes for two.',
    price: '$60.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'couples-night',
    title: 'U BAR COUPLES NIGHT PASS',
    description: 'Digital Pass. The perfect date night ride.',
    price: '$100.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'na-pass',
    title: 'U BAR NON ALCOHOLIC PASS',
    description: 'Digital Pass. Experience the vibe, sans the buzz.',
    price: '$35.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'gp-13',
    title: 'JAVA HOUSE GRAND PRIX ARLINGTON 13TH',
    description: 'Physical Pass. Exclusive transport for the Grand Prix.',
    price: '$300.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'gp-14',
    title: 'JAVA HOUSE GRAND PRIX ARLINGTON 14TH',
    description: 'Digital Pass. Exclusive transport for the Grand Prix.',
    price: '$300.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'gp-15',
    title: 'JAVA HOUSE GRAND PRIX ARLINGTON 15TH',
    description: 'Digital Pass. Exclusive transport for the Grand Prix.',
    price: '$300.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
  },
  {
    id: 'fifa-full',
    title: 'FIFA WORLD CUP FULL PASS',
    description: 'Digital Pass. The ultimate World Cup experience.',
    price: '$1,500.00',
    features: [
      'Must Be 21 to ride',
      'No Outside food or drink',
      'No weapons',
      '1 Ride Access',
      'Complimentary Drink/Shot'
    ],
    isPopular: true,
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: "Valentine's Day Single Pass",
    date: '2.14.26',
    location: 'All Day Affair',
    imageUrl: 'https://storage.googleapis.com/msgsndr/DGQtullATQRfPaFbP0kV/media/698a918967d74942a72d6c68.png'
  },
  {
    id: 'e2',
    title: 'Java House Grand Prix of Arlington',
    date: 'March 13 - 15',
    location: 'Arlington, Texas',
    imageUrl: 'https://storage.googleapis.com/msgsndr/DGQtullATQRfPaFbP0kV/media/698a93037f6dcf6a5ba158a1.png'
  },
  {
    id: 'e3',
    title: 'FIFA World Cup 2026 Reserved',
    date: 'June 14 - July 14',
    location: 'Dallas, TX',
    imageUrl: 'https://storage.googleapis.com/msgsndr/DGQtullATQRfPaFbP0kV/media/698a93cca41b8722c82d34d9.png'
  }
];

// Fallback data if no RSS feed is provided
export const PODCAST_EPISODES = [
  { id: 1, title: "Ep 42: The Future of Nightlife", duration: "45 min" },
  { id: 2, title: "Ep 41: Mixing Drinks @ 60mph", duration: "32 min" },
  { id: 3, title: "Ep 40: Founder Stories", duration: "50 min" },
];