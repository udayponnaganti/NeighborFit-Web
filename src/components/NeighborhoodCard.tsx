import React from 'react';
import { NeighborhoodMatch } from '../types';
import { MapPin, DollarSign, Users, Shield, Thermometer, Clock, Star } from 'lucide-react';

interface NeighborhoodCardProps {
  match: NeighborhoodMatch;
  onViewDetails: () => void;
}

export const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({ match, onViewDetails }) => {
  const { neighborhood, matchScore, matchReasons, categoryScores } = match;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreRing = (score: number) => {
    if (score >= 80) return 'ring-green-200';
    if (score >= 60) return 'ring-yellow-200';
    return 'ring-red-200';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={neighborhood.image}
          alt={neighborhood.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(matchScore)} ring-2 ${getScoreRing(matchScore)}`}>
            {matchScore}% Match
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center text-white">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{neighborhood.city}, {neighborhood.state}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{neighborhood.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{neighborhood.description}</p>
          </div>
        </div>

        {/* Match Reasons */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Why this might be perfect for you:</h4>
          <div className="space-y-2">
            {matchReasons.map((reason, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Star className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Median Rent</p>
              <p className="text-sm font-semibold">{formatPrice(neighborhood.housing.medianRent)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Population</p>
              <p className="text-sm font-semibold">{neighborhood.demographics.population.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Safety Score</p>
              <p className="text-sm font-semibold">{neighborhood.safety.safetyScore}/100</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Avg. Commute</p>
              <p className="text-sm font-semibold">{neighborhood.commute.averageCommuteTime} min</p>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown:</h4>
          <div className="space-y-2">
            {Object.entries(categoryScores).map(([category, score]) => (
              <div key={category} className="flex items-center">
                <span className="text-xs text-gray-600 w-20 capitalize">{category}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-8">{Math.round(score)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewDetails}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Full Details
        </button>
      </div>
    </div>
  );
};