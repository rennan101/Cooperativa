import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { SearchResults } from './pages/SearchResults';
import { RideDetails } from './pages/RideDetails';
import { PublishRide } from './pages/PublishRide';
import { MyTrips } from './pages/MyTrips';
import { AdminDashboard } from './pages/AdminDashboard';
import { Profile } from './pages/Profile';
import { RideChat } from './pages/RideChat';
import { RideRating } from './pages/RideRating';

import { ToastContainer } from './components/ui/Toast';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
        <ToastContainer />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<SearchResults />} />
            <Route path="/buscar" element={<SearchResults />} />
            <Route path="/viagem/:id" element={<RideDetails />} />
            <Route path="/publicar" element={<PublishRide />} />
            <Route path="/nova-viagem" element={<PublishRide />} />
            <Route path="/minhas-viagens" element={<MyTrips />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/chat/:rideId" element={<RideChat />} />
            <Route path="/avaliar/:rideId" element={<RideRating />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <MobileNav />
      </div>
    </Router>
  );
};

export default App;
