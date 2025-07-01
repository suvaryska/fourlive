import React from 'react';
import { MessageCircle, Users, Calendar, Trophy, ExternalLink } from 'lucide-react';

const Community = () => {
  const communityStats = [
    { icon: Users, value: '15,000+', label: 'Discord Üyesi' },
    { icon: MessageCircle, value: '500+', label: 'Günlük Mesaj' },
    { icon: Calendar, value: '50+', label: 'Aylık Event' },
    { icon: Trophy, value: '100+', label: 'Aktif Yarışmacı' },
  ];

  const socialPlatforms = [
    {
      name: 'Discord Sunucusu',
      description: 'Ana topluluk merkezi, duyurular ve sohbet',
      icon: MessageCircle,
      link: '#',
      color: 'from-indigo-400 to-purple-500',
      members: '15,000+ üye'
    },
    {
      name: 'YouTube Kanalı',
      description: 'Event kayıtları, tutorial videolar',
      icon: ExternalLink,
      link: '#',
      color: 'from-red-400 to-red-600',
      members: '5,000+ abone'
    },
    {
      name: 'Twitch Yayınları',
      description: 'Canlı eventler ve admin yayınları',
      icon: ExternalLink,
      link: '#',
      color: 'from-purple-400 to-purple-600',
      members: '2,000+ takipçi'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Haftalık Drift Yarışı',
      date: '15 Aralık 2024',
      time: '21:00',
      description: 'Los Santos Drift pisti için haftalık yarış etkinliği',
      prize: '₺500,000'
    },
    {
      title: 'Polis Akademisi',
      date: '18 Aralık 2024',
      time: '20:00',
      description: 'Yeni polis adayları için eğitim programı',
      prize: 'Sertifika'
    },
    {
      title: 'Topluluk Buluşması',
      date: '22 Aralık 2024',
      time: '19:00',
      description: 'Aylık topluluk etkinliği ve sohbet',
      prize: 'Hediyeler'
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Topluluk
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            15,000+ üyeli büyük ailemize katıl, eventlere katıl ve yeni arkadaşlıklar edin
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 text-center hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl w-fit mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Sosyal </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Platformlar
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Bizi takip edin ve hiçbir etkinliği kaçırmayın</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} p-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <platform.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">
                        {platform.description}
                      </p>
                      <div className="text-amber-400 font-medium mb-4">
                        {platform.members}
                      </div>
                      <a
                        href={platform.link}
                        className="inline-block px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform"
                      >
                        Katıl
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Yaklaşan </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Etkinlikler
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Bu hafta düzenlenecek olan heyecan verici etkinlikler</p>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300 mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-amber-400" />
                        <span className="text-gray-400">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-400">🕒</span>
                        <span className="text-gray-400">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-amber-400" />
                        <span className="text-amber-400">{event.prize}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform">
                      Katılım
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              Tüm etkinlik duyuruları Discord sunucumuzda paylaşılır
            </p>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors">
              Discord'a Katıl
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;