import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, ArrowLeft, Gift, Star } from 'lucide-react';
import logo from '../resim/logo.png';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // URL'den sipariş detaylarını al
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const status = searchParams.get('status');

    if (orderId) {
      setOrderDetails({
        orderId,
        amount,
        currency,
        status
      });
    }

    // 10 saniye geri sayım
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParams]);

  useEffect(() => {
    if (countdown === 0) {
      // Ana sayfaya yönlendir
      window.location.href = '/';
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="relative">
              <img src={logo} alt="FourLive RP Logo" className="h-12 md:h-16 w-auto mx-auto" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"></div>
            </div>
          </Link>
        </div>

        {/* Success Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Ödeme Başarılı!</h1>
            <p className="text-gray-400">Siparişiniz başarıyla tamamlandı</p>
          </div>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-700/30 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-amber-400" />
                Sipariş Detayları
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sipariş No:</span>
                  <span className="text-white font-mono">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tutar:</span>
                  <span className="text-green-400 font-semibold">
                    {orderDetails.amount} {orderDetails.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Durum:</span>
                  <span className="text-green-400 font-medium">Başarılı</span>
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Satın Aldığınız Paket
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Özel VIP rozeti
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Ekstra oyun içi para
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Öncelikli destek
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Özel araç ve mülkler
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-4">
              Oyun içinde paketiniz otomatik olarak hesabınıza eklenecektir.
            </p>
            <p className="text-sm text-gray-500">
              {countdown} saniye sonra ana sayfaya yönlendirileceksiniz...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Dashboard'a Git</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Sorun yaşadıysanız{' '}
            <a href="https://discord.gg/fourlive" className="text-amber-400 hover:text-amber-300">
              Discord
            </a>{' '}
            sunucumuza katılın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success; 