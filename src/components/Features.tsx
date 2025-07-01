import React from 'react';
import { Car, Briefcase, Users, Shield, Zap, Crown, Home, Gamepad2 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Car,
      title: 'Gerçekçi Araç Sistemi',
      description: 'Modifiye edilebilir araçlar, gerçekçi hasar sistemi ve özel araç mağazaları.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Briefcase,
      title: 'Zengin İş İmkanları',
      description: 'Polis, EMT, mekanik, taksi şoförü ve daha fazla meslek seçeneği.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Users,
      title: 'Aktif Topluluk',
      description: '24/7 aktif oyuncu kitlesi ve sürekli gelişen roleplay ortamı.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Anti-Cheat Koruması',
      description: 'Gelişmiş güvenlik sistemi ile hile-free oyun deneyimi.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Zap,
      title: 'Yüksek Performans',
      description: 'Optimize edilmiş sunucu altyapısı ile lag-free oyun deneyimi.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Crown,
      title: 'VIP Avantajları',
      description: 'Özel araçlar, evler ve exclusive roleplay imkanları.',
      color: 'from-amber-400 to-amber-600'
    },
    {
      icon: Home,
      title: 'Emlak Sistemi',
      description: 'Satın alınabilir evler, apartmanlar ve ticari mülkler.',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: Gamepad2,
      title: 'Özel Eventler',
      description: 'Düzenli etkinlikler, yarışlar ve topluluk organizasyonları.',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Neden FourLive RP?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Türkiye'nin en gelişmiş GTA5 roleplay sunucusunda sizi bekleyen eşsiz özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-800/70 min-h-[280px] flex flex-col">
                <div className="space-y-4 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Features;