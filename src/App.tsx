import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { PreferenceForm } from './components/PreferenceForm';
import { MatchResults } from './components/MatchResults';
import { UserPreferences, NeighborhoodMatch } from './types';
import { matcher } from './utils/matchingAlgorithm';
import { authHelpers } from './lib/supabase';
import { MapPin, Users, Home, TrendingUp } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'preferences' | 'results'>('landing');
  const [matches, setMatches] = useState<NeighborhoodMatch[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const { data } = await authHelpers.getCurrentUser();
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authHelpers.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setCurrentView('landing');
        setMatches([]);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = async () => {
    try {
      await authHelpers.signOut();
      setIsAuthenticated(false);
      setCurrentView('landing');
      setMatches([]);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleStartAssessment = () => {
    setCurrentView('preferences');
  };

  const handlePreferencesSubmit = (preferences: UserPreferences) => {
    const neighborhoodMatches = matcher.findMatches(preferences);
    setMatches(neighborhoodMatches);
    setCurrentView('results');
  };

  const handleStartOver = () => {
    setCurrentView('landing');
    setMatches([]);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentView === 'preferences') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <PreferenceForm onPreferencesSubmit={handlePreferencesSubmit} />
      </div>
    );
  }

  if (currentView === 'results') {
    return <MatchResults matches={matches} onStartOver={handleStartOver} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NeighborFit</h1>
                <p className="text-gray-600">Find your perfect neighborhood match</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">50,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">500+ neighborhoods</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">95% accuracy</span>
              </div>
              <div className="flex items-center space-x-4">
                {user && (
                  <span className="text-sm text-gray-600">
                    Welcome, {user.user_metadata?.full_name || user.email}
                  </span>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-blue-600"> Neighborhood</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stop guessing where to live. Our advanced matching algorithm analyzes your lifestyle preferences, 
            budget, and priorities to find neighborhoods that truly fit who you are.
          </p>
          <button
            onClick={handleStartAssessment}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Assessment
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How NeighborFit Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our scientifically-backed approach uses 30+ data points to create your perfect neighborhood profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Lifestyle Assessment</h3>
            <p className="text-gray-600">
              Answer questions about your preferences for walkability, nightlife, dining, culture, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Matching</h3>
            <p className="text-gray-600">
              Our algorithm analyzes real neighborhood data including demographics, safety, amenities, and costs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Home className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Results</h3>
            <p className="text-gray-600">
              Get personalized neighborhood recommendations with detailed breakdowns and match explanations.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem We're Solving</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 rounded-full p-2 mt-1">
                    <span className="text-red-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Information Overload</h3>
                    <p className="text-gray-600">Too many websites, reviews, and data points make it overwhelming to choose.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 rounded-full p-2 mt-1">
                    <span className="text-red-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Subjective Reviews</h3>
                    <p className="text-gray-600">Online reviews don't account for your personal preferences and lifestyle.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 rounded-full p-2 mt-1">
                    <span className="text-red-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hidden Costs</h3>
                    <p className="text-gray-600">Rent is just one factor - commute costs, amenities, and lifestyle expenses add up.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
              <p className="text-gray-700 mb-6">
                NeighborFit uses a comprehensive algorithm that considers your unique lifestyle preferences, 
                budget constraints, and priorities to recommend neighborhoods that truly match your needs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">30+</div>
                  <div className="text-sm text-gray-600">Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600">Match Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Neighborhoods</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-gray-600">Major Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Neighborhood?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of people who've found their ideal home with NeighborFit's personalized recommendations.
          </p>
          <button
            onClick={handleStartAssessment}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Free Assessment
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 rounded-lg p-2">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">NeighborFit</span>
          </div>
          <p className="text-gray-400">
            © 2024 NeighborFit. Helping you find your perfect neighborhood through data-driven matching.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;