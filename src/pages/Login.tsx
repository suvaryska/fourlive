import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, User, Lock, Eye, EyeOff, Shield, Gamepad2, BookOpen } from 'lucide-react';
import { loginUser } from '../services/api.ts';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.username || !formData.password) {
      setError('Lütfen tüm alanları doldurun');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData.username, formData.password);
      
      if (response.success) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        navigate('/dashboard');
      } else {
        setError(response.message || 'Giriş başarısız');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sunucu hatası');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center pt-40 pb-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-purple-500/5"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <img src="/src/resim/logo.png" alt="FourLive RP Logo" className="h-20 w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Üye Girişi
              </span>
            </h1>
            <p className="text-gray-300 text-lg font-medium mb-2">FourLive RP'ye Hoş Geldiniz</p>
            <p className="text-gray-500 text-sm">Lütfen hesap bilgilerinizi girerek devam edin</p>
          </div>

          {/* Important Notice */}
          <div className="mb-6 p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <p className="text-sm text-amber-200 font-medium">
                Öncelikle oyun içinde kayıt olmanız gereklidir.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-200 mb-3">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-amber-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/70 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all duration-300"
                  placeholder="Kullanıcı adınızı girin"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-3">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-amber-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-14 py-4 bg-gray-900/70 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all duration-300"
                  placeholder="Şifrenizi girin"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-400 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 font-bold text-lg rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/25"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                  <span>Hesap doğrulanıyor...</span>
                </>
              ) : (
                <>
                  <Shield className="h-6 w-6" />
                  <span>Güvenli Giriş</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <a href="#" className="block text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200 hover:underline">
              Şifrenizi mi unuttunuz?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;