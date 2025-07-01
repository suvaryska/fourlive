import React, { useState, useEffect } from 'react';
import { Play, Users, Clock, Star, Search, HelpCircle } from 'lucide-react';
import arkaplan from '../resim/arkaplan.png';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, value: '5000+', label: 'Kayıtlı Oyuncu' },
    { icon: Clock, value: '24/7', label: 'Aktif Sunucu' },
    { icon: Star, value: '4.9', label: 'Oyuncu Puanı' },
    { icon: Play, value: '99%', label: 'Uptime' },
  ];

  // Mouse pozisyonuna göre dönüş hesaplama
  const getRotation = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;
    const angleX = (deltaY / centerY) * 10; // Y ekseni için dönüş
    const angleY = (deltaX / centerX) * 10; // X ekseni için dönüş
    return { x: angleX, y: angleY };
  };

  const rotation = getRotation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={arkaplan} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-purple-500/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4 mt-16 md:mt-0">
            <h1 className="text-5xl md:text-8xl font-bold flex items-center justify-center gap-4">
              <span className="text-white">
                {'FourLive'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block animate-letter-glow"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span className="text-white">
                {'Roleplay'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block animate-letter-glow"
                    style={{
                      animationDelay: `${(index + 8) * 0.2}s`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Türkiye'nin en büyük ve en gerçekçi GTA5 roleplay deneyimi. 
              Profesyonel yönetim, zengin içerik ve eşsiz roleplay atmosferi.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25">
              <span className="relative z-10">Şimdi Katıl</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="group px-8 py-4 text-lg font-semibold text-white border-2 border-gray-600 rounded-full hover:border-amber-400 hover:text-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              Sunucuyu Keşfet
            </button>
            
            <a
              href="/nasil-oynanir"
              className="group px-8 py-4 text-lg font-semibold text-white border-2 border-gray-600 rounded-full hover:border-amber-400 hover:text-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
            >
              Nasıl Oynanır
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all">
                      <stat.icon className="h-6 w-6 text-amber-400" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;