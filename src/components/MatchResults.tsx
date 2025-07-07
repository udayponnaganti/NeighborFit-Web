import React, { useState } from 'react';
import { NeighborhoodMatch } from '../types';
import { NeighborhoodCard } from './NeighborhoodCard';
import { NeighborhoodDetails } from './NeighborhoodDetails';
import { Filter, SortAsc, Grid, List, ArrowLeft } from 'lucide-react';

interface MatchResultsProps {
  matches: NeighborhoodMatch[];
  onStartOver: () => void;
}

export const MatchResults: React.FC<MatchResultsProps> = ({ matches, onStartOver }) => {
  const [selectedMatch, setSelectedMatch] = useState<NeighborhoodMatch | null>(null);
  const [sortBy, setSortBy] = useState<'match' | 'price' | 'safety'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [minMatchScore, setMinMatchScore] = useState(0);

  const sortedMatches = [...matches].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'price':
        return a.neighborhood.housing.medianRent - b.neighborhood.housing.medianRent;
      case 'safety':
        return b.neighborhood.safety.safetyScore - a.neighborhood.safety.safetyScore;
      default:
        return 0;
    }
  });

  const filteredMatches = sortedMatches.filter(match => match.matchScore >= minMatchScore);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onStartOver}
                className="flex items-center text-blue-600 hover:text-blue-700 mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Start Over
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Your Neighborhood Matches</h1>
              <p className="text-gray-600 mt-1">
                Found {filteredMatches.length} neighborhoods that match your preferences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'match' | 'price' | 'safety')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="match">Sort by Match Score</option>
                <option value="price">Sort by Price</option>
                <option value="safety">Sort by Safety</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Minimum Match Score:
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="flex-1 max-w-xs"
              />
              <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                {minMatchScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No neighborhoods match your current filters.</p>
            <button
              onClick={() => setMinMatchScore(0)}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredMatches.map((match) => (
              <div key={match.neighborhood.id} className={viewMode === 'list' ? 'mb-4' : ''}>
                <NeighborhoodCard
                  match={match}
                  onViewDetails={() => setSelectedMatch(match)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Matches Summary */}
      {filteredMatches.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Best Overall Match</h3>
                <p className="text-gray-900 font-medium">{filteredMatches[0].neighborhood.name}</p>
                <p className="text-sm text-gray-600">{filteredMatches[0].matchScore}% match</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Most Affordable</h3>
                {(() => {
                  const cheapest = filteredMatches.reduce((prev, curr) => 
                    prev.neighborhood.housing.medianRent < curr.neighborhood.housing.medianRent ? prev : curr
                  );
                  return (
                    <>
                      <p className="text-gray-900 font-medium">{cheapest.neighborhood.name}</p>
                      <p className="text-sm text-gray-600">{formatPrice(cheapest.neighborhood.housing.medianRent)}/month</p>
                    </>
                  );
                })()}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Safest</h3>
                {(() => {
                  const safest = filteredMatches.reduce((prev, curr) => 
                    prev.neighborhood.safety.safetyScore > curr.neighborhood.safety.safetyScore ? prev : curr
                  );
                  return (
                    <>
                      <p className="text-gray-900 font-medium">{safest.neighborhood.name}</p>
                      <p className="text-sm text-gray-600">{safest.neighborhood.safety.safetyScore}/100 safety score</p>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedMatch && (
        <NeighborhoodDetails
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};