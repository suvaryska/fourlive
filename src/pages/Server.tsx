import React from 'react';
import { Shield, Users, Car, Briefcase, Home, Zap } from 'lucide-react';

const Server = () => {
  const rules = [
    'Roleplay karakterini her zaman koru',
    'Meta-gaming ve power-gaming yasak',
    'RDM (Random Deathmatch) yasak',
    'VDM (Vehicle Deathmatch) yasak',
    'Admin kararlarına saygı göster',
    'Küfür ve hakaret yasak',
    'Cheat/hack kullanımı yasak',
    'Trolling ve griefing yasak',
  ];

  const jobs = [
    {
      icon: Shield,
      name: 'FourLive Polis Departmanı',
      description: 'Şehrin güvenliğini sağla, suçlularla mücadele et',
      requirements: 'Minimum 18 yaş, temiz kayıt'
    },
    {
      icon: Users,
      name: 'Ambulans Servisi (EMS)',
      description: 'Hayat kurtar, tıbbi yardım sağla',
      requirements: 'Tıbbi bilgi, sorumluluk sahibi'
    },
    {
      icon: Car,
      name: 'Mekanik',
      description: 'Araç tamiri ve modifikasyonu',
      requirements: 'Teknik bilgi, deneyim'
    },
    {
      icon: Briefcase,
      name: 'İş Adamı',
      description: 'Şirket kur, ticaret yap',
      requirements: 'Girişimcilik ruhu, capital'
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              FourLive RP
            </span>
            <br />
            <span className="text-white">Sunucu Bilgileri</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            FourLive RP sunucusuna dair tüm detaylar, kurallar ve iş imkanları
          </p>
        </div>
      </section>

      {/* Server Stats */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center">
              <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">300 Slot</div>
              <div className="text-gray-400">Maksimum Oyuncu</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center">
              <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center">
              <Home className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Aktif Sunucu</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Sunucu </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Kuralları
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Kaliteli roleplay için uyulması gereken temel kurallar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-center space-x-4 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-gray-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">İş </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                İmkanları
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Sunucumuzda mevcut olan başlıca meslek grupları</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl">
                    <job.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{job.name}</h3>
                    <p className="text-gray-300 mb-3">{job.description}</p>
                    <div className="text-sm text-amber-400">
                      <strong>Gereksinimler:</strong> {job.requirements}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform">
              İş Başvurusu Yap
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Server;