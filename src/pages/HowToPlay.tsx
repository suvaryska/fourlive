import React from 'react';
import { Download, Gamepad2, Users, Shield, Star, BookOpen, Play, Settings } from 'lucide-react';

const HowToPlay = () => {
  const steps = [
    {
      icon: Download,
      title: "1. GTA5 ve RAGE:MP İndirin",
      description: "GTA5 oyununu Steam'den satın alın ve RAGE:MP client'ını indirin.",
      details: [
        "GTA5 oyununu Steam'den satın alın",
        "RAGE:MP client'ını resmi siteden indirin",
        "GTA5'i en az bir kez çalıştırın"
      ],
      image: "https://xgamingserver.com/img/gta5-ragemp-server-hosting.jpg",
      downloadLink: "https://cdn.rage.mp/public/files/RAGEMultiplayer_Setup.exe"
    },
    {
      icon: Settings,
      title: "2. RAGE:MP Kurulumu",
      description: "RAGE:MP client'ını kurun ve GTA5 ile bağlayın.",
      details: [
        "RAGE:MP installer'ını çalıştırın",
        "GTA5 klasörünü seçin",
        "Kurulumu tamamlayın"
      ],
      image: "https://i.imgur.com/GQJnp0o.png"
    },
    {
      icon: Gamepad2,
      title: "3. Sunucuya Bağlanın",
      description: "FourLive RP sunucusuna bağlanın ve karakterinizi oluşturun.",
      details: [
        "RAGE:MP'i açın",
        "Sunucu listesinde 'FourLive RP' arayın",
        "Bağlan butonuna tıklayın"
      ],
      image: "https://media.discordapp.net/attachments/1386692963668590758/1389037092067217438/image.png?ex=68632919&is=6861d799&hm=8262eb0018499df8746b674194a068577680cd3105bbe1b1ab33cc8f89d951a1&=&format=webp&quality=lossless"
    },
    {
      icon: Users,
      title: "4. Karakter Oluşturun",
      description: "Karakterinizi özelleştirin ve roleplay'e başlayın.",
      details: [
        "Karakter adınızı belirleyin",
        "Görünümünüzü özelleştirin",
        "İlk işinizi seçin"
      ],
      image: "https://i.imgur.com/GQJnp0o.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-purple-500/10"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Nasıl Oynanır
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              FourLive RP'ye hoş geldiniz! Bu rehber ile GTA5 roleplay dünyasına adım atın.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Kurulum Adımları
            </h2>
            <p className="text-gray-400 text-lg">
              Bu adımları takip ederek FourLive RP'ye katılabilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-amber-400/30 hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all">
                      <step.icon className="h-8 w-8 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Download Button for RAGE:MP */}
                      {step.downloadLink && (
                        <a
                          href={step.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                        >
                          <Download className="h-4 w-4" />
                          <span>RAGE:MP İndir</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Step Image */}
                  {step.image && (
                    <div className="mt-6">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-64 object-contain rounded-xl border border-gray-600/50 bg-gray-900/50"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default HowToPlay; 