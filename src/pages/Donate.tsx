import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, Gift, Star, Crown, Zap, ExternalLink, User, DollarSign, Shield, CheckCircle } from 'lucide-react';

// Shopier API bilgileri
const SHOPIER_API_KEY = '432a59e3a880f09adc2bbb26fd0812b6';
const SHOPIER_API_SECRET = '75baec88d95ea986d113f49de5ed69f6';
const SHOPIER_API_URL = 'https://www.shopier.com/api';

const Donate = () => {
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
    paymentMethod: 'credit-card'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>(null);

  // Kullanıcı giriş yapmışsa kullanıcı adını otomatik doldur
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setFormData(prev => ({
        ...prev,
        username: user.username || ''
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectTier = (tier: any) => {
    setSelectedTier(tier);
    setFormData(prev => ({
      ...prev,
      amount: tier.amount.replace('₺', '')
    }));
  };

  const createShopierOrder = async () => {
    try {
      const orderId = `FLRP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Shopier API URL'ini oluştur
      const shopierUrl = `https://www.shopier.com/ShowProduct/api_pay4.php?api_key=${SHOPIER_API_KEY}&api_secret=${SHOPIER_API_SECRET}&amount=${formData.amount}&currency=TRY&order_id=${orderId}&callback_url=${encodeURIComponent(window.location.origin + '/callback')}&success_url=${encodeURIComponent(window.location.origin + '/success')}&error_url=${encodeURIComponent(window.location.origin + '/error')}&customer_name=${encodeURIComponent(formData.username)}&product_name=${encodeURIComponent('FourLive RP Bağış')}&product_description=${encodeURIComponent('FourLive RP sunucusu için bağış')}`;

      console.log('Shopier URL:', shopierUrl);

      // Ödeme sayfasına yönlendir
      window.location.href = shopierUrl;

    } catch (error) {
      console.error('Shopier order hatası:', error);
      alert('Ödeme başlatılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.amount) {
      alert('Lütfen kullanıcı adı ve miktar bilgilerini doldurun.');
      return;
    }

    if (parseFloat(formData.amount) < 1) {
      alert('Minimum bağış miktarı 1₺ olmalıdır.');
      return;
    }

    setIsLoading(true);
    
    try {
      await createShopierOrder();
    } catch (error) {
      console.error('Ödeme hatası:', error);
      alert('Ödeme işlemi başlatılamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const donationTiers = [
    {
      icon: Heart,
      title: "Bronze Destekçi",
      amount: "50₺",
      benefits: [
        "Özel rozet",
        "Discord'da özel rol",
        "Oyunda özel araç"
      ]
    },
    {
      icon: Star,
      title: "Gümüş Destekçi",
      amount: "100₺",
      benefits: [
        "Bronze tüm özellikler",
        "Özel karakter skin'i",
        "VIP sohbet erişimi"
      ]
    },
    {
      icon: Crown,
      title: "Altın Destekçi",
      amount: "250₺",
      benefits: [
        "Gümüş tüm özellikler",
        "Özel ev lokasyonu",
        "Öncelikli destek"
      ]
    },
    {
      icon: Zap,
      title: "Elmas Destekçi",
      amount: "500₺",
      benefits: [
        "Altın tüm özellikler",
        "Özel sunucu etkinlikleri",
        "Yönetici ile özel görüşme"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">


      {/* Donation Form */}
      <div className="relative py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-pink-500 opacity-10 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mb-6 shadow-lg shadow-red-500/25">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Bağış Formu
                    </span>
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Kullanıcı adınızı ve bağış miktarınızı belirtin
                  </p>
                  <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Güvenli Ödeme</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SSL Korumalı</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Username Field */}
                    <div className="space-y-4">
                      <label htmlFor="username" className="block text-lg font-semibold text-gray-200 mb-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-5 w-5 text-red-400" />
                          <span>Kullanıcı Adı</span>
                        </div>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 group-hover:border-gray-500"
                          placeholder="Kullanıcı adınızı girin"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>

                    {/* Amount Field */}
                    <div className="space-y-4">
                      <label htmlFor="amount" className="block text-lg font-semibold text-gray-200 mb-3">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-5 w-5 text-red-400" />
                          <span>Bağış Miktarı (₺)</span>
                        </div>
                      </label>
                      <div className="relative group">
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 group-hover:border-gray-500"
                          placeholder="Miktar girin"
                          min="1"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <label htmlFor="paymentMethod" className="block text-lg font-semibold text-gray-200 mb-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-red-400" />
                        <span>Ödeme Yöntemi</span>
                      </div>
                    </label>
                    <div className="relative group">
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-600/50 rounded-2xl text-white focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 group-hover:border-gray-500 appearance-none cursor-pointer"
                      >
                        <option value="credit-card">💳 Kredi Kartı</option>
                        <option value="bank-transfer">🏦 Banka Transferi</option>
                        <option value="crypto">₿ Kripto Para</option>
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full py-5 px-8 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-bold text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl shadow-red-500/25 overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-center justify-center space-x-3">
                        {isLoading ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>İşlem yapılıyor...</span>
                          </>
                        ) : (
                          <>
                            <Heart className="h-6 w-6 group-hover:animate-pulse" />
                            <span>Bağış Yap</span>
                            <ExternalLink className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                          </>
                        )}
                      </div>

                      {/* Ripple Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
                    </button>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-600/30">
                    <div className="flex items-start space-x-3 text-sm text-gray-400">
                      <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-300 mb-1">Güvenlik Garantisi</p>
                        <p>Tüm ödemeler SSL sertifikası ile korunmaktadır. Kişisel bilgileriniz güvende tutulur ve hiçbir zaman üçüncü taraflarla paylaşılmaz.</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

export default Donate; 