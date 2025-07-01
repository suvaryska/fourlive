import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Crown, Users, User, LogOut, Settings } from 'lucide-react';
import logo from '../resim/logo.png';

function ServerStatus() {
  const [status, setStatus] = useState<{ online: boolean, players: number, maxplayers: number } | null>(null);

  useEffect(() => {
    fetch('https://cdn.rage.mp/master/')
      .then(res => res.json())
      .then(masterList => {
        const server = masterList['91.132.49.7:22005'];
        if (server) {
          setStatus({
            online: true,
            players: server.players,
            maxplayers: server.maxplayers
          });
        } else {
          setStatus({
            online: false,
            players: 0,
            maxplayers: 0
          });
        }
      })
      .catch(() => setStatus(null));
  }, []);

  if (!status) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-gray-500/20 rounded-full border border-gray-500/30">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-400">Yükleniyor...</span>
      </div>
    );
  }

  if (status.online) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-green-400">Online</span>
        <span className="text-sm text-gray-400">{status.players}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-red-400">Offline</span>
        <span className="text-sm text-gray-400">0</span>
      </div>
    );
  }
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser');
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserDropdown(false);
    navigate('/');
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  };

  const navItems = [
    { path: '/', label: 'Ana Sayfa' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img src={logo} alt="FourLive RP Logo" className="h-8 md:h-10 w-auto" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-300/30 transition-colors"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors group flex items-center space-x-2 ${
                  location.pathname === item.path
                    ? 'text-amber-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <i className="fas fa-home text-lg"></i>
                <span>{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transform transition-transform ${
                  location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
            
            {/* Discord Link */}
            <a
              href="https://discord.gg/fourlive"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group flex items-center space-x-2"
            >
              <i className="fab fa-discord text-lg"></i>
              <span>Discord</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </a>
            
            {/* How to Play Link */}
            <Link
              to="/nasil-oynanir"
              className={`relative px-3 py-2 text-sm font-medium transition-colors group flex items-center space-x-2 ${
                location.pathname === '/nasil-oynanir'
                  ? 'text-amber-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <i className="fas fa-question-circle text-lg"></i>
              <span>Nasıl Oynanır</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transform transition-transform ${
                location.pathname === '/nasil-oynanir' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            
            {/* Donate Link */}
            <Link
              to="/donate"
              className={`relative px-3 py-2 text-sm font-medium transition-colors group flex items-center space-x-2 ${
                location.pathname === '/donate'
                  ? 'text-amber-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <i className="fas fa-heart text-lg"></i>
              <span>Bağış Yap</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transform transition-transform ${
                location.pathname === '/donate' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          </nav>

          {/* Server Status & User */}
          <div className="hidden md:flex items-center space-x-4">
            <ServerStatus />
            {/* <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Users className="h-4 w-4" />
              <span>247/300</span>
            </div> */}
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform"
                >
                  <User className="h-4 w-4" />
                  <span>{getCurrentUser()?.username}</span>
                </button>
                
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>

                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform"
              >
                <User className="h-4 w-4" />
                <span>Giriş</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors flex items-center space-x-2 ${
                  location.pathname === item.path
                    ? 'text-amber-400 bg-gray-800'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <i className="fas fa-home text-lg"></i>
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Discord Link Mobile */}
            <a
              href="https://discord.gg/fourlive"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 flex items-center space-x-2"
            >
              <i className="fab fa-discord text-lg"></i>
              <span>Discord</span>
            </a>
            
            {/* How to Play Link Mobile */}
            <Link
              to="/nasil-oynanir"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors flex items-center space-x-2 ${
                location.pathname === '/nasil-oynanir'
                  ? 'text-amber-400 bg-gray-800'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <i className="fas fa-question-circle text-lg"></i>
              <span>Nasıl Oynanır</span>
            </Link>
            
            {/* Donate Link Mobile */}
            <Link
              to="/donate"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === '/donate'
                  ? 'text-amber-400 bg-gray-800'
                  : 'text-gray-300 hover:text-amber-400 hover:bg-gray-800'
              }`}
            >
              <i className="fas fa-heart text-lg"></i>
              <span>Bağış Yap</span>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-black mt-4"
              >
                Giriş Yap
              </Link>
            )}
            
            <div className="flex items-center justify-between px-3 py-2 mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-400">Sunucu Online</span>
              </div>
              {/* <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Users className="h-4 w-4" />
                <span>247/300</span>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;