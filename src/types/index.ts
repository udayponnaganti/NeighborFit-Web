export interface NeighborhoodData {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  image: string;
  demographics: {
    population: number;
    medianAge: number;
    medianIncome: number;
    educationLevel: string;
    diversityIndex: number;
  };
  lifestyle: {
    walkabilityScore: number;
    transitScore: number;
    bikeScore: number;
    nightlifeScore: number;
    diningScore: number;
    shoppingScore: number;
    parksScore: number;
    culturalScore: number;
  };
  amenities: {
    restaurants: number;
    bars: number;
    cafes: number;
    parks: number;
    gyms: number;
    schools: number;
    hospitals: number;
    libraries: number;
  };
  housing: {
    medianHomePrice: number;
    medianRent: number;
    propertyTax: number;
    homeownershipRate: number;
  };
  safety: {
    crimeRate: number;
    safetyScore: number;
  };
  climate: {
    averageTemp: number;
    rainyDays: number;
    sunnyDays: number;
  };
  commute: {
    averageCommuteTime: number;
    publicTransitAccess: number;
    walkingCommute: number;
  };
}

export interface UserPreferences {
  lifestyle: {
    walkabilityImportance: number;
    transitImportance: number;
    nightlifeImportance: number;
    diningImportance: number;
    shoppingImportance: number;
    parksImportance: number;
    culturalImportance: number;
  };
  demographics: {
    preferredAgeRange: [number, number];
    incomeImportance: number;
    diversityImportance: number;
    educationImportance: number;
  };
  housing: {
    maxBudget: number;
    housingType: 'rent' | 'buy';
    propertyTaxImportance: number;
  };
  safety: {
    safetyImportance: number;
    minSafetyScore: number;
  };
  climate: {
    temperaturePreference: [number, number];
    rainyDaysImportance: number;
    sunnyDaysImportance: number;
  };
  commute: {
    maxCommuteTime: number;
    commuteImportance: number;
    publicTransitImportance: number;
  };
}

export interface NeighborhoodMatch {
  neighborhood: NeighborhoodData;
  matchScore: number;
  matchReasons: string[];
  categoryScores: {
    lifestyle: number;
    demographics: number;
    housing: number;
    safety: number;
    climate: number;
    commute: number;
  };
}