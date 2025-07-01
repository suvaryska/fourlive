import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, Home, ArrowLeft, AlertTriangle, RefreshCw } from 'lucide-react';
import logo from '../resim/logo.png';

const Error = () => {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(15);
  const [errorDetails, setErrorDetails] = useState<any>(null);

  useEffect(() => {
    // URL'den hata detaylarını al
    const orderId = searchParams.get('order_id');
    const errorCode = searchParams.get('error_code');
    const errorMessage = searchParams.get('error_message');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');

    if (orderId) {
      setErrorDetails({
        orderId,
        errorCode,
        errorMessage,
        amount,
        currency
      });
    }

    // 15 saniye geri sayım
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

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'INSUFFICIENT_FUNDS':
        return 'Yetersiz bakiye. Lütfen kartınızın bakiyesini kontrol edin.';
      case 'CARD_DECLINED':
        return 'Kartınız reddedildi. Lütfen farklı bir kart deneyin.';
      case 'EXPIRED_CARD':
        return 'Kartınızın süresi dolmuş. Lütfen geçerli bir kart kullanın.';
      case 'INVALID_CARD':
        return 'Geçersiz kart bilgileri. Lütfen bilgilerinizi kontrol edin.';
      case 'TIMEOUT':
        return 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
      default:
        return 'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.';
    }
  };

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

        {/* Error Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Error Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-4">
              <XCircle className="h-12 w-12 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Ödeme Başarısız</h1>
            <p className="text-gray-400">İşleminiz tamamlanamadı</p>
          </div>

          {/* Error Details */}
          {errorDetails && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Hata Detayları
              </h3>
              <div className="space-y-3">
                {errorDetails.orderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sipariş No:</span>
                    <span className="text-white font-mono">{errorDetails.orderId}</span>
                  </div>
                )}
                {errorDetails.amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tutar:</span>
                    <span className="text-white font-semibold">
                      {errorDetails.amount} {errorDetails.currency}
                    </span>
                  </div>
                )}
                {errorDetails.errorCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hata Kodu:</span>
                    <span className="text-red-400 font-mono">{errorDetails.errorCode}</span>
                  </div>
                )}
              </div>
              
              {/* Error Message */}
              {errorDetails.errorCode && (
                <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                  <p className="text-red-300 text-sm">
                    {getErrorMessage(errorDetails.errorCode)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="bg-gray-700/30 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Ne Yapabilirsiniz?</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Farklı bir ödeme yöntemi deneyin
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Kart bilgilerinizi kontrol edin
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Bankanızla iletişime geçin
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Discord'dan destek alın
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-4">
              Sorun devam ederse Discord sunucumuza katılarak destek alabilirsiniz.
            </p>
            <p className="text-sm text-gray-500">
              {countdown} saniye sonra ana sayfaya yönlendirileceksiniz...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/donate"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Tekrar Dene</span>
            </Link>
            
            <Link
              to="/"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Yardıma mı ihtiyacınız var?{' '}
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

export default Error; 