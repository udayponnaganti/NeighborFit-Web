import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { ChevronRight, Home, Users, Shield, Cloud, Car, Heart } from 'lucide-react';

interface PreferenceFormProps {
  onPreferencesSubmit: (preferences: UserPreferences) => void;
}

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ onPreferencesSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    lifestyle: {
      walkabilityImportance: 7,
      transitImportance: 6,
      nightlifeImportance: 5,
      diningImportance: 7,
      shoppingImportance: 5,
      parksImportance: 6,
      culturalImportance: 6
    },
    demographics: {
      preferredAgeRange: [25, 45],
      incomeImportance: 6,
      diversityImportance: 7,
      educationImportance: 6
    },
    housing: {
      maxBudget: 3000,
      housingType: 'rent',
      propertyTaxImportance: 5
    },
    safety: {
      safetyImportance: 8,
      minSafetyScore: 70
    },
    climate: {
      temperaturePreference: [45, 75],
      rainyDaysImportance: 5,
      sunnyDaysImportance: 6
    },
    commute: {
      maxCommuteTime: 35,
      commuteImportance: 7,
      publicTransitImportance: 6
    }
  });

  const steps = [
    { title: 'Lifestyle', icon: Heart, key: 'lifestyle' },
    { title: 'Demographics', icon: Users, key: 'demographics' },
    { title: 'Housing', icon: Home, key: 'housing' },
    { title: 'Safety', icon: Shield, key: 'safety' },
    { title: 'Climate', icon: Cloud, key: 'climate' },
    { title: 'Commute', icon: Car, key: 'commute' }
  ];

  const handleSliderChange = (category: string, field: string, value: number) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof UserPreferences],
        [field]: value
      }
    }));
  };

  const handleRangeChange = (category: string, field: string, value: [number, number]) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof UserPreferences],
        [field]: value
      }
    }));
  };

  const handleSelectChange = (category: string, field: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof UserPreferences],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onPreferencesSubmit(preferences);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const SliderInput = ({ label, value, onChange, min = 1, max = 10, step = 1 }: any) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">{min}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-sm text-gray-500">{max}</span>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {value}
        </span>
      </div>
    </div>
  );

  const RangeInput = ({ label, value, onChange, min, max, step = 1 }: any) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">{min}</span>
        <div className="flex-1 relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value), value[1]])}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => onChange([value[0], Number(e.target.value)])}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <span className="text-sm text-gray-500">{max}</span>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {value[0]} - {value[1]}
        </span>
      </div>
    </div>
  );

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];
    const Icon = currentStepData.icon;

    switch (currentStepData.key) {
      case 'lifestyle':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lifestyle Preferences</h2>
              <p className="text-gray-600">How important are these lifestyle factors to you?</p>
            </div>
            
            <SliderInput
              label="Walkability (being able to walk to amenities)"
              value={preferences.lifestyle.walkabilityImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'walkabilityImportance', value)}
            />
            <SliderInput
              label="Public Transit Access"
              value={preferences.lifestyle.transitImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'transitImportance', value)}
            />
            <SliderInput
              label="Nightlife & Entertainment"
              value={preferences.lifestyle.nightlifeImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'nightlifeImportance', value)}
            />
            <SliderInput
              label="Dining & Food Scene"
              value={preferences.lifestyle.diningImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'diningImportance', value)}
            />
            <SliderInput
              label="Shopping & Retail"
              value={preferences.lifestyle.shoppingImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'shoppingImportance', value)}
            />
            <SliderInput
              label="Parks & Recreation"
              value={preferences.lifestyle.parksImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'parksImportance', value)}
            />
            <SliderInput
              label="Cultural Activities & Arts"
              value={preferences.lifestyle.culturalImportance}
              onChange={(value: number) => handleSliderChange('lifestyle', 'culturalImportance', value)}
            />
          </div>
        );

      case 'demographics':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Demographics</h2>
              <p className="text-gray-600">What kind of community are you looking for?</p>
            </div>
            
            <RangeInput
              label="Preferred Age Range of Neighbors"
              value={preferences.demographics.preferredAgeRange}
              onChange={(value: [number, number]) => handleRangeChange('demographics', 'preferredAgeRange', value)}
              min={18}
              max={80}
            />
            <SliderInput
              label="Income Level Importance"
              value={preferences.demographics.incomeImportance}
              onChange={(value: number) => handleSliderChange('demographics', 'incomeImportance', value)}
            />
            <SliderInput
              label="Cultural Diversity Importance"
              value={preferences.demographics.diversityImportance}
              onChange={(value: number) => handleSliderChange('demographics', 'diversityImportance', value)}
            />
            <SliderInput
              label="Education Level Importance"
              value={preferences.demographics.educationImportance}
              onChange={(value: number) => handleSliderChange('demographics', 'educationImportance', value)}
            />
          </div>
        );

      case 'housing':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Housing Preferences</h2>
              <p className="text-gray-600">Tell us about your housing needs and budget</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Housing Type
              </label>
              <select
                value={preferences.housing.housingType}
                onChange={(e) => handleSelectChange('housing', 'housingType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            
            <SliderInput
              label={`Maximum ${preferences.housing.housingType === 'rent' ? 'Monthly Rent' : 'Home Price'}`}
              value={preferences.housing.maxBudget}
              onChange={(value: number) => handleSliderChange('housing', 'maxBudget', value)}
              min={preferences.housing.housingType === 'rent' ? 1000 : 200000}
              max={preferences.housing.housingType === 'rent' ? 8000 : 2000000}
              step={preferences.housing.housingType === 'rent' ? 100 : 25000}
            />
            
            <SliderInput
              label="Property Tax Importance"
              value={preferences.housing.propertyTaxImportance}
              onChange={(value: number) => handleSliderChange('housing', 'propertyTaxImportance', value)}
            />
          </div>
        );

      case 'safety':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Safety Preferences</h2>
              <p className="text-gray-600">How important is safety and security to you?</p>
            </div>
            
            <SliderInput
              label="Overall Safety Importance"
              value={preferences.safety.safetyImportance}
              onChange={(value: number) => handleSliderChange('safety', 'safetyImportance', value)}
            />
            <SliderInput
              label="Minimum Safety Score Requirement"
              value={preferences.safety.minSafetyScore}
              onChange={(value: number) => handleSliderChange('safety', 'minSafetyScore', value)}
              min={1}
              max={100}
            />
          </div>
        );

      case 'climate':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Climate Preferences</h2>
              <p className="text-gray-600">What kind of weather do you prefer?</p>
            </div>
            
            <RangeInput
              label="Preferred Temperature Range (°F)"
              value={preferences.climate.temperaturePreference}
              onChange={(value: [number, number]) => handleRangeChange('climate', 'temperaturePreference', value)}
              min={20}
              max={90}
            />
            <SliderInput
              label="Rainy Days Importance (lower = prefer less rain)"
              value={preferences.climate.rainyDaysImportance}
              onChange={(value: number) => handleSliderChange('climate', 'rainyDaysImportance', value)}
            />
            <SliderInput
              label="Sunny Days Importance"
              value={preferences.climate.sunnyDaysImportance}
              onChange={(value: number) => handleSliderChange('climate', 'sunnyDaysImportance', value)}
            />
          </div>
        );

      case 'commute':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Commute Preferences</h2>
              <p className="text-gray-600">How do you prefer to get around?</p>
            </div>
            
            <SliderInput
              label="Maximum Acceptable Commute Time (minutes)"
              value={preferences.commute.maxCommuteTime}
              onChange={(value: number) => handleSliderChange('commute', 'maxCommuteTime', value)}
              min={10}
              max={90}
            />
            <SliderInput
              label="Commute Time Importance"
              value={preferences.commute.commuteImportance}
              onChange={(value: number) => handleSliderChange('commute', 'commuteImportance', value)}
            />
            <SliderInput
              label="Public Transit Importance"
              value={preferences.commute.publicTransitImportance}
              onChange={(value: number) => handleSliderChange('commute', 'publicTransitImportance', value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-gray-600">{step.title}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentStep === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={nextStep}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>{currentStep === steps.length - 1 ? 'Find My Match' : 'Next'}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};