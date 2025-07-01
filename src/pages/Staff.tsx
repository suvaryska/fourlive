import React from 'react';
import { Crown, Shield, Users, Wrench, Star } from 'lucide-react';

const Staff = () => {
  const staffMembers = [
    {
      name: 'Emre Kaya',
      role: 'Sunucu Sahibi',
      icon: Crown,
      description: 'Sunucunun kurucusu ve genel yöneticisi',
      experience: '5+ yıl roleplay deneyimi',
      color: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Ahmet Demir',
      role: 'Baş Admin',
      icon: Shield,
      description: 'Genel yönetim ve admin koordinasyonu',
      experience: '4+ yıl yöneticilik',
      color: 'from-red-400 to-red-600'
    },
    {
      name: 'Zeynep Yılmaz',
      role: 'Event Koordinatörü',
      icon: Star,
      description: 'Etkinlik planlama ve organizasyon',
      experience: '3+ yıl etkinlik yönetimi',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Mustafa Özkan',
      role: 'Teknik Admin',
      icon: Wrench,
      description: 'Sunucu altyapısı ve teknik destek',
      experience: '6+ yıl sistem yönetimi',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Ayşe Çelik',
      role: 'Topluluk Yöneticisi',
      icon: Users,
      description: 'Discord yönetimi ve oyuncu ilişkileri',
      experience: '2+ yıl topluluk yönetimi',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Mehmet Şahin',
      role: 'Moderatör',
      icon: Shield,
      description: 'Oyun içi düzen ve kural uygulaması',
      experience: '3+ yıl moderasyon',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  const departments = [
    {
      name: 'Yönetim Ekibi',
      description: 'Sunucunun genel işleyişinden sorumlu üst düzey yöneticiler',
      memberCount: 3,
      color: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Admin Ekibi',
      description: 'Oyun içi düzen ve kural uygulamasından sorumlu adminler',
      memberCount: 8,
      color: 'from-red-400 to-red-600'
    },
    {
      name: 'Moderatör Ekibi',
      description: 'Discord ve forum moderasyonundan sorumlu ekip',
      memberCount: 12,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Event Ekibi',
      description: 'Etkinlik planlama ve düzenlemeden sorumlu ekip',
      memberCount: 5,
      color: 'from-purple-400 to-purple-600'
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
            <span className="text-white">Yönetim Ekibi</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            FourLive RP'yi yöneten deneyimli ve profesyonel ekip üyeleri ile tanışın
          </p>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Ekip </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Departmanları
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} mx-auto mb-4 flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{dept.memberCount}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{dept.name}</h3>
                  <p className="text-gray-400 text-sm">{dept.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Members */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Üst Düzey </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Yöneticiler
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Sunucumuzu yöneten deneyimli ekip üyeleri</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center space-y-4">
                    {/* Avatar placeholder */}
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} p-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <member.icon className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">
                        {member.name}
                      </h3>
                      <div className={`text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-3`}>
                        {member.role}
                      </div>
                      <p className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors">
                        {member.description}
                      </p>
                      <div className="text-xs text-amber-400">
                        {member.experience}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Staff Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-lg rounded-3xl p-8 border border-amber-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ekibimize Katılmak İster misiniz?
            </h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              FourLive RP ekibine katılarak sunucumuzun gelişimine katkıda bulunabilir, 
              roleplay deneyiminizi bir üst seviyeye taşıyabilirsiniz.
            </p>
            
            {/* Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-left">
                <h4 className="text-lg font-semibold text-amber-400 mb-3">Aranan Özellikler:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Minimum 18 yaş</li>
                  <li>• En az 6 ay sunucu deneyimi</li>
                  <li>• Temiz ceza kaydı</li>
                  <li>• İyi iletişim becerileri</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold text-amber-400 mb-3">Sağlanan Avantajlar:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Özel yetkiler ve araçlar</li>
                  <li>• Ekip Discord kanalları</li>
                  <li>• Aylık ekip etkinlikleri</li>
                  <li>• Değerli deneyim kazanımı</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform">
                Başvuru Formu
              </button>
              <button className="px-8 py-4 border border-amber-400 text-amber-400 font-semibold rounded-full hover:bg-amber-400 hover:text-black transition-all">
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;