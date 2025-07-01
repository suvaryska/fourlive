import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Car, 
  Home, 
  Briefcase, 
  DollarSign, 
  Trophy,
  Clock, 
  MapPin, 
  Phone, 
  Shield,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  Users,
  Star,
  Activity,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { getUserVehicles, getUserHouses } from '../services/api.ts';

function formatPlayTime(secondsOrTimestamp: number): string {
  // Eğer değer 10 haneli ise timestamp, değilse toplam saniye
  // 10 haneli ise (ör: 1748874697) => toplam saniye olarak kullan
  let totalSeconds = secondsOrTimestamp;
  if (String(secondsOrTimestamp).length >= 10) {
    // timestamp ise, toplam saniye olarak kullan
    totalSeconds = secondsOrTimestamp;
  }
  
  // Eğer çok büyük bir sayı ise (muhtemelen dakika cinsinden), saniyeye çevir
  if (totalSeconds > 86400) { // 1 günden fazla saniye
    totalSeconds = totalSeconds * 60; // dakikayı saniyeye çevir
  }
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days} gün ${remainingHours} saat`;
  }
  
  return `${hours} saat ${minutes} dakika`;
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [houses, setHouses] = useState<any[]>([]);
  const [housesLoading, setHousesLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı verilerini localStorage'dan al
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData({
        name: user.username || 'Oyuncu',
        characterName: user.characterName || 'Karakter Adı',
        level: user.level || 1,
        experience: user.experience || 0,
        nextLevelExp: user.nextLevelExp || 1000,
        money: user.money || 0,
        bank: user.bank || 0,
        job: user.job || 'İşsiz',
        faction: user.faction || 'Factionsız',
        playTime: user.playTime || '0 saat',
        joinDate: user.joinDate || 'Yeni',
        lastSeen: user.lastSeen || 'Şimdi',
        reputation: user.reputation || 0,
        avatar: user.avatar || '/api/placeholder/100/100'
      });
      
      // Kullanıcının araçlarını ve evlerini çek
      if (user.id) {
        fetchUserVehicles(user.id);
        fetchUserHouses(user.id);
      }
    } else {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const fetchUserVehicles = async (userId: number) => {
    try {
      setVehiclesLoading(true);
      const response = await getUserVehicles(userId);
      if (response.success) {
        setVehicles(response.vehicles);
      }
    } catch (error) {
      console.error('Araç getirme hatası:', error);
    } finally {
      setVehiclesLoading(false);
    }
  };

  const fetchUserHouses = async (userId: number) => {
    try {
      setHousesLoading(true);
      const response = await getUserHouses(userId);
      if (response.success) {
        setHouses(response.houses);
      }
    } catch (error) {
      console.error('Ev getirme hatası:', error);
    } finally {
      setHousesLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı verisi yoksa
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Kullanıcı verisi bulunamadı</p>
        </div>
      </div>
    );
  }

  // Boş veri yapıları - gerçek verilerle doldurulacak
  const properties = houses; // Gerçek ev verilerini kullan
  const achievements: any[] = [];
  const recentActivities: any[] = [];

  const tabs = [
    { id: 'overview', name: 'Genel Bakış', icon: Activity },
    { id: 'character', name: 'Karakter', icon: User },
    { id: 'vehicles', name: 'Araçlar', icon: Car },
    { id: 'properties', name: 'Mülkler', icon: Home }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Nakit Para</p>
              <p className="text-2xl font-bold text-green-400">{formatMoney(userData.money)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Banka</p>
              <p className="text-2xl font-bold text-blue-400">{formatMoney(userData.bank)}</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Seviye</p>
              <p className="text-2xl font-bold text-amber-400">{userData.level}</p>
            </div>
            <Star className="h-8 w-8 text-amber-400" />
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Oyun Süresi</p>
              <p className="text-2xl font-bold text-purple-400">{formatPlayTime(userData.playTime)}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Deneyim İlerlemesi</h3>
          <span className="text-amber-400 font-medium">
            {userData.experience} / {userData.nextLevelExp} XP
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(userData.experience / userData.nextLevelExp) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Sonraki seviyeye {userData.nextLevelExp - userData.experience} XP kaldı
        </p>
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Son Aktiviteler</h3>
        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'purchase' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'job' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {activity.type === 'purchase' ? <DollarSign className="h-4 w-4" /> :
                   activity.type === 'job' ? <Briefcase className="h-4 w-4" /> :
                   <Trophy className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.detail}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Henüz aktivite bulunmuyor</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCharacter = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
            <User className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{userData.characterName}</h2>
            <p className="text-gray-400">Oyuncu: {userData.name}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-amber-400">{userData.reputation}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400">{userData.job}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Seviye:</span>
              <span className="text-white font-medium">{userData.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Meslek:</span>
              <span className="text-white font-medium">{userData.job}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Organizasyon:</span>
              <span className="text-white font-medium">{userData.faction}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Katılım Tarihi:</span>
              <span className="text-white font-medium">{userData.joinDate}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Toplam Oyun Süresi:</span>
              <span className="text-white font-medium">{formatPlayTime(userData.playTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Son Görülme:</span>
              <span className="text-green-400 font-medium">{userData.lastSeen}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Toplam Varlık:</span>
              <span className="text-amber-400 font-medium">
                {formatMoney(userData.money + userData.bank)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicles = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Araçlarım</h3>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{vehicle.name}</h4>
                <Car className="h-6 w-6 text-amber-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plaka:</span>
                  <span className="text-white font-mono">{vehicle.plate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Yakıt:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${vehicle.fuel > 50 ? 'bg-green-400' : vehicle.fuel > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${vehicle.fuel}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm">{vehicle.fuel}%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Durum:</span>
                  <span className={`font-medium ${vehicle.condition === 'Mükemmel' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {vehicle.condition}
                  </span>
                </div>
              </div>


            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Car className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Henüz araç bulunmuyor</h3>
          <p className="text-gray-400 mb-6">İlk aracınızı satın alarak başlayın</p>
          <button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform">
            Araç Satın Al
          </button>
        </div>
      )}
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Mülklerim</h3>
        <button className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform">
          Mülk Ara
        </button>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{property.name}</h4>
                <Home className="h-6 w-6 text-amber-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tür:</span>
                  <span className="text-white">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Değer:</span>
                  <span className="text-green-400 font-medium">{formatMoney(property.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Durum:</span>
                  <span className={`font-medium ${property.status === 'Sahip' ? 'text-green-400' : 'text-blue-400'}`}>
                    {property.status}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Ziyaret Et
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  Yönet
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Henüz mülk bulunmuyor</h3>
          <p className="text-gray-400 mb-6">İlk mülkünüzü satın alarak başlayın</p>
          <button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform">
            Mülk Satın Al
          </button>
        </div>
      )}
    </div>
  );



  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'character': return renderCharacter();
      case 'vehicles': return renderVehicles();
      case 'properties': return renderProperties();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hoş geldin, {userData.characterName}</h1>
              <p className="text-gray-400">Son giriş: {userData.lastSeen}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;