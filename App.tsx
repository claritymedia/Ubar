import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Ride from './pages/Ride';
import Passes from './pages/Tickets'; // Importing the Passes component from the existing file path
import Sponsorships from './pages/Sponsorships';
import Events from './pages/Events';
import Podcast from './pages/Podcast';
import Driver from './pages/Driver';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.RIDE);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.RIDE:
        return <Ride />;
      case Tab.PASSES:
        return <Passes />;
      case Tab.SPONSORSHIPS:
        return <Sponsorships />;
      case Tab.EVENTS:
        return <Events />;
      case Tab.PODCAST:
        return <Podcast />;
      case Tab.DRIVER:
        return <Driver />;
      default:
        return <Ride />;
    }
  };

  return (
    <div className="bg-midnight min-h-screen text-frost font-sans selection:bg-electric selection:text-midnight">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="animate-in fade-in duration-500">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;