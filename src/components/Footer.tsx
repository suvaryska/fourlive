import React from 'react';
import { Crown, Disc as Discord, Youtube, Twitter, Instagram } from 'lucide-react';
import logo from '../resim/logo.png';

const Footer = () => {
  const socialLinks = [
    { icon: Discord, href: '#', label: 'Discord' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Sunucu Bilgileri', href: '/sunucu' },
    { name: 'Topluluk', href: '/topluluk' },
    { name: 'Ekip', href: '/ekip' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  const serverInfo = [
    { name: 'Kurallar', href: '#' },
    { name: 'Başvuru Formu', href: '#' },
    { name: 'Ban Sorgulama', href: '#' },
    { name: 'Whitelist', href: '#' },
    { name: 'Destek', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={logo} alt="FourLive RP Logo" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Türkiye'nin en büyük ve en gerçekçi GTA5 roleplay sunucusu. 
              Profesyonel yönetim ve eşsiz deneyim.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Server Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Sunucu</h3>
            <ul className="space-y-2">
              {serverInfo.map((info) => (
                <li key={info.name}>
                  <a
                    href={info.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {info.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="text-gray-400">
                <strong className="text-white">Sunucu IP:</strong><br />
                connect fourliverp.com
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Discord:</strong><br />
                discord.gg/fourliverp
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Destek:</strong><br />
                destek@fourliverp.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 FourLive RP. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sunucu Online</span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            Bu sunucu Take-Two Interactive Software, Inc. veya Rockstar Games, Inc. ile bağlantılı değildir.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;