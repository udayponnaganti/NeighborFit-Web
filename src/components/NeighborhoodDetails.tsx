import React from 'react';
import { NeighborhoodMatch } from '../types';
import { X, MapPin, DollarSign, Users, Shield, Thermometer, Clock, Star, Home, Car, Utensils, Coffee, TreePine, Dumbbell, GraduationCap, Building } from 'lucide-react';

interface NeighborhoodDetailsProps {
  match: NeighborhoodMatch;
  onClose: () => void;
}

export const NeighborhoodDetails: React.FC<NeighborhoodDetailsProps> = ({ match, onClose }) => {
  const { neighborhood, matchScore, matchReasons, categoryScores } = match;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const CircularProgress = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3b82f6"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{score}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={neighborhood.image}
            alt={neighborhood.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{neighborhood.name}</h1>
                <div className="flex items-center text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{neighborhood.city}, {neighborhood.state}</span>
                </div>
              </div>
              <div className="text-center">
                <CircularProgress score={matchScore} size={80} />
                <p className="text-white text-sm mt-2 font-medium">Overall Match</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">{neighborhood.description}</p>
          </div>

          {/* Match Reasons */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Why This Neighborhood Matches You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchReasons.map((reason, index) => (
                <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <Star className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Scores */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(categoryScores).map(([category, score]) => (
                <div key={category} className="text-center">
                  <CircularProgress score={Math.round(score)} size={100} />
                  <h3 className="text-sm font-medium text-gray-700 mt-2 capitalize">{category}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Demographics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Demographics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Population</span>
                  <span className="font-medium">{neighborhood.demographics.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Median Age</span>
                  <span className="font-medium">{neighborhood.demographics.medianAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Median Income</span>
                  <span className="font-medium">{formatPrice(neighborhood.demographics.medianIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Education Level</span>
                  <span className="font-medium">{neighborhood.demographics.educationLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Diversity Index</span>
                  <span className="font-medium">{(neighborhood.demographics.diversityIndex * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Housing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Housing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Median Home Price</span>
                  <span className="font-medium">{formatPrice(neighborhood.housing.medianHomePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Median Rent</span>
                  <span className="font-medium">{formatPrice(neighborhood.housing.medianRent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Tax Rate</span>
                  <span className="font-medium">{neighborhood.housing.propertyTax}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Homeownership Rate</span>
                  <span className="font-medium">{(neighborhood.housing.homeownershipRate * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Safety & Climate */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Safety & Climate
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Safety Score</span>
                  <span className="font-medium">{neighborhood.safety.safetyScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crime Rate</span>
                  <span className="font-medium">{neighborhood.safety.crimeRate} per 1000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Temperature</span>
                  <span className="font-medium">{neighborhood.climate.averageTemp}°F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunny Days/Year</span>
                  <span className="font-medium">{neighborhood.climate.sunnyDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rainy Days/Year</span>
                  <span className="font-medium">{neighborhood.climate.rainyDays}</span>
                </div>
              </div>
            </div>

            {/* Commute & Transit */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Commute & Transit
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Commute</span>
                  <span className="font-medium">{neighborhood.commute.averageCommuteTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transit Score</span>
                  <span className="font-medium">{neighborhood.lifestyle.transitScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Walkability Score</span>
                  <span className="font-medium">{neighborhood.lifestyle.walkabilityScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bike Score</span>
                  <span className="font-medium">{neighborhood.lifestyle.bikeScore}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Local Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Utensils className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Restaurants</p>
                <p className="text-lg font-semibold">{neighborhood.amenities.restaurants}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Coffee className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Cafes</p>
                <p className="text-lg font-semibold">{neighborhood.amenities.cafes}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <TreePine className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Parks</p>
                <p className="text-lg font-semibold">{neighborhood.amenities.parks}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Dumbbell className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Gyms</p>
                <p className="text-lg font-semibold">{neighborhood.amenities.gyms}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Schools</p>
                <p className="text-lg font-semibold">{neighborhood.amenities.schools}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Building className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Libraries</p>
                <p className="text-lg font-semibold">{neighborhood.amenities.libraries}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};