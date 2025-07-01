import React from 'react';
import { MessageCircle, Mail, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Discord Sunucusu',
      description: 'En hızlı iletişim yöntemi',
      value: 'discord.gg/losantosrp',
      color: 'from-indigo-400 to-purple-500',
      action: 'Katıl'
    },
    {
      icon: Mail,
      title: 'E-posta',
      description: 'Resmi başvurular ve öneriler için',
      value: 'info@losantosrp.com',
      color: 'from-blue-400 to-blue-600',
      action: 'Gönder'
    },
    {
      icon: ExternalLink,
      title: 'Destek Sistemi',
      description: 'Ticket sistemi ile profesyonel destek',
      value: 'destek.losantosrp.com',
      color: 'from-green-400 to-green-600',
      action: 'Aç'
    }
  ];

  const serverInfo = [
    { label: 'Sunucu IP', value: 'connect losantosrp.com' },
    { label: 'Port', value: '30120' },
    { label: 'Versiyon', value: 'FiveM Latest' },
    { label: 'Konum', value: 'Türkiye' },
  ];

  const supportHours = [
    { day: 'Pazartesi - Cuma', hours: '09:00 - 24:00' },
    { day: 'Cumartesi - Pazar', hours: '12:00 - 24:00' },
    { day: 'Acil Durumlar', hours: '7/24 Discord' },
  ];

  const faqItems = [
    {
      question: 'Sunucuya nasıl bağlanırım?',
      answer: 'FiveM\'i indirin, F8\'e "connect losantosrp.com" yazın ve enter\'a basın.'
    },
    {
      question: 'Whitelist başvurusu nasıl yapılır?',
      answer: 'Discord sunucumuzda #whitelist-başvuru kanalından formu doldurun.'
    },
    {
      question: 'Yaş sınırı var mı?',
      answer: 'Sunucumuz 16+ yaş sınırına sahiptir. Mature content bulunmaktadır.'
    },
    {
      question: 'Nasıl para kazanabilirim?',
      answer: 'Legal işler, illegal aktiviteler, business kurma gibi çeşitli yollar mevcuttur.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              İletişim
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">İletişim </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Kanalları
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                    {method.description}
                  </p>
                  <div className="text-amber-400 font-mono text-sm mb-4 bg-gray-900/50 rounded-lg p-2">
                    {method.value}
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform">
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Info & Support Hours */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Server Connection Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                <span className="text-white">Sunucu </span>
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Bilgileri
                </span>
              </h3>
              <div className="space-y-4">
                {serverInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <span className="text-gray-300 font-medium">{info.label}:</span>
                    <span className="text-amber-400 font-mono">{info.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
                <p className="text-gray-300 text-sm">
                  <strong className="text-amber-400">Not:</strong> Sunucuya bağlanmak için FiveM client'ı indirmiş olmanız gerekmektedir.
                </p>
              </div>
            </div>

            {/* Support Hours */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                <span className="text-white">Destek </span>
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Saatleri
                </span>
              </h3>
              <div className="space-y-4">
                {supportHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="text-gray-300 font-medium">{schedule.day}</span>
                    </div>
                    <span className="text-amber-400">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Şu anda destek ekibimiz online!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Sıkça Sorulan </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Sorular
              </span>
            </h2>
            <p className="text-gray-300 text-lg">En çok merak edilen sorular ve cevapları</p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-start">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  {faq.question}
                </h4>
                <p className="text-gray-300 ml-9 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              Sorunuz burada yok mu? Discord sunucumuzdan sorabilirsiniz.
            </p>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors">
              Discord'da Sor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;