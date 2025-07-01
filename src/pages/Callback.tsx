import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [message, setMessage] = useState('İşlem doğrulanıyor...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        // URL'den callback parametrelerini al
        const orderId = searchParams.get('order_id');
        const status = searchParams.get('status');
        const signature = searchParams.get('signature');
        const amount = searchParams.get('amount');
        const currency = searchParams.get('currency');
        const paymentMethod = searchParams.get('payment_method');
        const errorCode = searchParams.get('error_code');
        const errorMessage = searchParams.get('error_message');

        console.log('Callback parametreleri:', {
          orderId,
          status,
          signature,
          amount,
          currency,
          paymentMethod,
          errorCode,
          errorMessage
        });

        // Gerekli parametrelerin kontrolü
        if (!orderId) {
          setStatus('invalid');
          setMessage('Geçersiz sipariş ID');
          return;
        }

        // Shopier signature doğrulaması (gerçek implementasyonda yapılmalı)
        // const isValidSignature = verifyShopierSignature(signature, orderId, amount);
        // if (!isValidSignature) {
        //   setStatus('error');
        //   setMessage('Güvenlik doğrulaması başarısız');
        //   return;
        // }

        // Backend'e callback bilgilerini gönder
        const response = await fetch('/api/shopier/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            status,
            signature,
            amount,
            currency,
            paymentMethod,
            errorCode,
            errorMessage,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error('Backend callback hatası');
        }

        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setMessage('Ödeme başarıyla doğrulandı!');
          
          // 3 saniye sonra success sayfasına yönlendir
          setTimeout(() => {
            navigate(`/success?order_id=${orderId}&amount=${amount}&currency=${currency}&status=${status}`);
          }, 3000);
        } else {
          setStatus('error');
          setMessage(result.message || 'Ödeme doğrulanamadı');
          
          // 3 saniye sonra error sayfasına yönlendir
          setTimeout(() => {
            navigate(`/error?order_id=${orderId}&error_code=${errorCode}&amount=${amount}&currency=${currency}`);
          }, 3000);
        }

      } catch (error) {
        console.error('Callback işleme hatası:', error);
        setStatus('error');
        setMessage('İşlem sırasında bir hata oluştu');
        
        // 3 saniye sonra error sayfasına yönlendir
        setTimeout(() => {
          navigate('/error');
        }, 3000);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-4">
              <Loader2 className="h-12 w-12 text-blue-400 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">İşlem Doğrulanıyor</h1>
            <p className="text-gray-400">{message}</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Doğrulama Başarılı</h1>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500 mt-2">Success sayfasına yönlendiriliyorsunuz...</p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-4">
              <XCircle className="h-12 w-12 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Doğrulama Hatası</h1>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500 mt-2">Error sayfasına yönlendiriliyorsunuz...</p>
          </div>
        );

      case 'invalid':
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-4">
              <AlertTriangle className="h-12 w-12 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Geçersiz İstek</h1>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500 mt-2">Ana sayfaya yönlendiriliyorsunuz...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Callback Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {renderContent()}
        </div>

        {/* Debug Info (sadece development'ta göster) */}
        {import.meta.env.DEV && (
          <div className="mt-8 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">Debug Bilgileri</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white">{searchParams.get('order_id') || 'Yok'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-white">{searchParams.get('status') || 'Yok'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white">{searchParams.get('amount') || 'Yok'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Currency:</span>
                <span className="text-white">{searchParams.get('currency') || 'Yok'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="text-white">{searchParams.get('payment_method') || 'Yok'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Error Code:</span>
                <span className="text-white">{searchParams.get('error_code') || 'Yok'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signature:</span>
                <span className="text-white font-mono text-xs">
                  {searchParams.get('signature') ? 
                    searchParams.get('signature')!.substring(0, 20) + '...' : 
                    'Yok'
                  }
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Callback; 