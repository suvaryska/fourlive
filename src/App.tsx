import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Server from './pages/Server';
import Community from './pages/Community';
import Staff from './pages/Staff';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import DynamicPage from './pages/DynamicPage';
import HowToPlay from './pages/HowToPlay';
import Donate from './pages/Donate';
import Success from './pages/Success';
import Error from './pages/Error';
import Callback from './pages/Callback';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nasil-oynanir" element={<HowToPlay />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/success" element={<Success />} />
            <Route path="/error" element={<Error />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/sunucu" element={<Server />} />
            <Route path="/topluluk" element={<Community />} />
            <Route path="/ekip" element={<Staff />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Dynamic pages route - must be last */}
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;