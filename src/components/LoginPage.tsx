import React, { useState, useEffect } from 'react';
import { MapPin, Eye, EyeOff, Mail, Lock, ArrowRight, Users, Home, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { authHelpers } from '../lib/supabase';
import { validateForm, ValidationError } from '../utils/validation';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [authError, setAuthError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Clear errors when switching between login/signup
  useEffect(() => {
    setErrors([]);
    setAuthError('');
    setSuccessMessage('');
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    setSuccessMessage('');

    // Validate form
    const validationErrors = validateForm(formData, !isLogin);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    setErrors([]);

    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await authHelpers.signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setAuthError('Invalid email or password. Please check your credentials and try again.');
          } else if (error.message.includes('Email not confirmed')) {
            setAuthError('Please check your email and click the confirmation link before signing in.');
          } else {
            setAuthError(error.message);
          }
        } else if (data.user) {
          setSuccessMessage('Successfully signed in! Redirecting...');
          setTimeout(() => {
            onLogin();
          }, 1500);
        }
      } else {
        // Sign up
        const { data, error } = await authHelpers.signUp(formData.email, formData.password, formData.name);
        
        if (error) {
          if (error.message.includes('User already registered')) {
            setAuthError('An account with this email already exists. Please sign in instead.');
          } else if (error.message.includes('Password should be at least 6 characters')) {
            setAuthError('Password must be at least 6 characters long.');
          } else {
            setAuthError(error.message);
          }
        } else if (data.user) {
          if (data.user.email_confirmed_at) {
            setSuccessMessage('Account created successfully! Redirecting...');
            setTimeout(() => {
              onLogin();
            }, 1500);
          } else {
            setSuccessMessage('Account created! Please check your email for a confirmation link.');
            setIsLogin(true);
          }
        }
      }
    } catch (error: any) {
      setAuthError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', error);
    }

    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setAuthError('');

    try {
      if (provider === 'google') {
        const { error } = await authHelpers.signInWithGoogle();
        if (error) {
          setAuthError(`Google sign-in failed: ${error.message}`);
        }
      } else if (provider === 'facebook') {
        const { error } = await authHelpers.signInWithFacebook();
        if (error) {
          setAuthError(`Facebook sign-in failed: ${error.message}`);
        }
      }
    } catch (error: any) {
      setAuthError(`${provider} sign-in failed. Please try again.`);
      console.error(`${provider} auth error:`, error);
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    setErrors(prev => prev.filter(error => error.field !== name));
    setAuthError('');
  };

  const getFieldError = (fieldName: string) => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const hasFieldError = (fieldName: string) => {
    return errors.some(error => error.field === fieldName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-xl p-3 shadow-lg">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">NeighborFit</h1>
                <p className="text-gray-600 text-lg">Find your perfect neighborhood match</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Discover Your Ideal
                <span className="text-blue-600"> Community</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join thousands of people who've found their perfect neighborhood using our 
                advanced matching algorithm that considers your lifestyle, budget, and priorities.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">50,000+ Happy Users</h3>
                  <p className="text-sm text-gray-600">Trusted by thousands nationwide</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">500+ Neighborhoods</h3>
                  <p className="text-sm text-gray-600">Comprehensive coverage across major cities</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="bg-purple-100 rounded-lg p-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">95% Match Accuracy</h3>
                  <p className="text-sm text-gray-600">Scientifically-backed recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-blue-600 rounded-lg p-2">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">NeighborFit</h1>
              </div>
              <p className="text-gray-600">Find your perfect neighborhood match</p>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Sign in to continue your neighborhood search' 
                  : 'Join thousands finding their perfect neighborhood'
                }
              </p>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-700 text-sm">{successMessage}</span>
              </div>
            )}

            {authError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-700 text-sm">{authError}</span>
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      hasFieldError('name') 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                  {getFieldError('name') && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {getFieldError('name')}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      hasFieldError('email') 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {getFieldError('email') && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {getFieldError('email')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      hasFieldError('password') 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {getFieldError('password') && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {getFieldError('password')}
                  </p>
                )}
                {!isLogin && (
                  <div className="text-xs text-gray-500 mt-1">
                    Password must contain: 8+ characters, uppercase, lowercase, number, and special character
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        hasFieldError('confirmPassword') 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                  {getFieldError('confirmPassword') && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {getFieldError('confirmPassword')}
                    </p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>

            {/* Demo Access */}
            <div className="mt-6 text-center">
              <button
                onClick={onLogin}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors underline"
              >
                Continue as Guest (Demo Access)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};