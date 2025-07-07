import { NeighborhoodData } from '../types';

export const neighborhoods: NeighborhoodData[] = [
  {
    id: 'brooklyn-williamsburg',
    name: 'Williamsburg',
    city: 'Brooklyn',
    state: 'NY',
    description: 'Trendy neighborhood with artisanal everything, waterfront views, and vibrant nightlife.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 151308,
      medianAge: 33,
      medianIncome: 85000,
      educationLevel: 'Graduate Degree',
      diversityIndex: 0.72
    },
    lifestyle: {
      walkabilityScore: 89,
      transitScore: 78,
      bikeScore: 85,
      nightlifeScore: 92,
      diningScore: 88,
      shoppingScore: 82,
      parksScore: 75,
      culturalScore: 94
    },
    amenities: {
      restaurants: 342,
      bars: 89,
      cafes: 156,
      parks: 12,
      gyms: 28,
      schools: 15,
      hospitals: 3,
      libraries: 4
    },
    housing: {
      medianHomePrice: 1200000,
      medianRent: 3500,
      propertyTax: 1.25,
      homeownershipRate: 0.35
    },
    safety: {
      crimeRate: 15.2,
      safetyScore: 78
    },
    climate: {
      averageTemp: 55,
      rainyDays: 115,
      sunnyDays: 224
    },
    commute: {
      averageCommuteTime: 35,
      publicTransitAccess: 85,
      walkingCommute: 12
    }
  },
  {
    id: 'sf-mission',
    name: 'Mission District',
    city: 'San Francisco',
    state: 'CA',
    description: 'Vibrant Latino culture, incredible food scene, and colorful murals throughout the neighborhood.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 59000,
      medianAge: 36,
      medianIncome: 110000,
      educationLevel: 'Bachelor\'s Degree',
      diversityIndex: 0.84
    },
    lifestyle: {
      walkabilityScore: 93,
      transitScore: 82,
      bikeScore: 88,
      nightlifeScore: 87,
      diningScore: 95,
      shoppingScore: 76,
      parksScore: 68,
      culturalScore: 91
    },
    amenities: {
      restaurants: 298,
      bars: 67,
      cafes: 89,
      parks: 8,
      gyms: 22,
      schools: 18,
      hospitals: 2,
      libraries: 3
    },
    housing: {
      medianHomePrice: 1800000,
      medianRent: 4200,
      propertyTax: 0.75,
      homeownershipRate: 0.28
    },
    safety: {
      crimeRate: 28.4,
      safetyScore: 65
    },
    climate: {
      averageTemp: 57,
      rainyDays: 67,
      sunnyDays: 259
    },
    commute: {
      averageCommuteTime: 32,
      publicTransitAccess: 88,
      walkingCommute: 18
    }
  },
  {
    id: 'austin-south-by-southwest',
    name: 'South by Southwest',
    city: 'Austin',
    state: 'TX',
    description: 'Music capital with live venues, food trucks, and a thriving tech scene.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 35000,
      medianAge: 31,
      medianIncome: 75000,
      educationLevel: 'Bachelor\'s Degree',
      diversityIndex: 0.68
    },
    lifestyle: {
      walkabilityScore: 76,
      transitScore: 45,
      bikeScore: 82,
      nightlifeScore: 96,
      diningScore: 89,
      shoppingScore: 72,
      parksScore: 85,
      culturalScore: 98
    },
    amenities: {
      restaurants: 187,
      bars: 94,
      cafes: 67,
      parks: 22,
      gyms: 18,
      schools: 12,
      hospitals: 2,
      libraries: 2
    },
    housing: {
      medianHomePrice: 650000,
      medianRent: 2100,
      propertyTax: 2.1,
      homeownershipRate: 0.42
    },
    safety: {
      crimeRate: 22.1,
      safetyScore: 72
    },
    climate: {
      averageTemp: 68,
      rainyDays: 89,
      sunnyDays: 300
    },
    commute: {
      averageCommuteTime: 24,
      publicTransitAccess: 52,
      walkingCommute: 8
    }
  },
  {
    id: 'seattle-capitol-hill',
    name: 'Capitol Hill',
    city: 'Seattle',
    state: 'WA',
    description: 'Bohemian neighborhood with indie music venues, vintage shops, and coffee culture.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 27000,
      medianAge: 32,
      medianIncome: 89000,
      educationLevel: 'Graduate Degree',
      diversityIndex: 0.71
    },
    lifestyle: {
      walkabilityScore: 91,
      transitScore: 72,
      bikeScore: 79,
      nightlifeScore: 85,
      diningScore: 84,
      shoppingScore: 78,
      parksScore: 82,
      culturalScore: 89
    },
    amenities: {
      restaurants: 165,
      bars: 52,
      cafes: 78,
      parks: 15,
      gyms: 19,
      schools: 8,
      hospitals: 1,
      libraries: 2
    },
    housing: {
      medianHomePrice: 950000,
      medianRent: 2800,
      propertyTax: 1.02,
      homeownershipRate: 0.38
    },
    safety: {
      crimeRate: 45.2,
      safetyScore: 68
    },
    climate: {
      averageTemp: 51,
      rainyDays: 155,
      sunnyDays: 152
    },
    commute: {
      averageCommuteTime: 28,
      publicTransitAccess: 78,
      walkingCommute: 15
    }
  },
  {
    id: 'portland-pearl-district',
    name: 'Pearl District',
    city: 'Portland',
    state: 'OR',
    description: 'Converted warehouse district with galleries, upscale dining, and urban living.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 12000,
      medianAge: 38,
      medianIncome: 95000,
      educationLevel: 'Graduate Degree',
      diversityIndex: 0.58
    },
    lifestyle: {
      walkabilityScore: 88,
      transitScore: 85,
      bikeScore: 92,
      nightlifeScore: 76,
      diningScore: 87,
      shoppingScore: 85,
      parksScore: 79,
      culturalScore: 82
    },
    amenities: {
      restaurants: 89,
      bars: 24,
      cafes: 34,
      parks: 8,
      gyms: 12,
      schools: 6,
      hospitals: 1,
      libraries: 1
    },
    housing: {
      medianHomePrice: 750000,
      medianRent: 2400,
      propertyTax: 1.15,
      homeownershipRate: 0.48
    },
    safety: {
      crimeRate: 18.7,
      safetyScore: 82
    },
    climate: {
      averageTemp: 53,
      rainyDays: 164,
      sunnyDays: 144
    },
    commute: {
      averageCommuteTime: 22,
      publicTransitAccess: 89,
      walkingCommute: 22
    }
  },
  {
    id: 'denver-highlands',
    name: 'Highlands',
    city: 'Denver',
    state: 'CO',
    description: 'Historic neighborhood with mountain views, craft breweries, and outdoor access.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 18000,
      medianAge: 34,
      medianIncome: 78000,
      educationLevel: 'Bachelor\'s Degree',
      diversityIndex: 0.62
    },
    lifestyle: {
      walkabilityScore: 72,
      transitScore: 58,
      bikeScore: 85,
      nightlifeScore: 78,
      diningScore: 81,
      shoppingScore: 68,
      parksScore: 94,
      culturalScore: 74
    },
    amenities: {
      restaurants: 78,
      bars: 35,
      cafes: 28,
      parks: 18,
      gyms: 14,
      schools: 9,
      hospitals: 1,
      libraries: 1
    },
    housing: {
      medianHomePrice: 580000,
      medianRent: 1900,
      propertyTax: 0.51,
      homeownershipRate: 0.58
    },
    safety: {
      crimeRate: 12.8,
      safetyScore: 85
    },
    climate: {
      averageTemp: 50,
      rainyDays: 73,
      sunnyDays: 300
    },
    commute: {
      averageCommuteTime: 26,
      publicTransitAccess: 65,
      walkingCommute: 6
    }
  },
  {
    id: 'chicago-wicker-park',
    name: 'Wicker Park',
    city: 'Chicago',
    state: 'IL',
    description: 'Hipster enclave with vintage shops, independent music venues, and diverse dining.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 28000,
      medianAge: 32,
      medianIncome: 72000,
      educationLevel: 'Bachelor\'s Degree',
      diversityIndex: 0.74
    },
    lifestyle: {
      walkabilityScore: 86,
      transitScore: 82,
      bikeScore: 81,
      nightlifeScore: 88,
      diningScore: 85,
      shoppingScore: 89,
      parksScore: 71,
      culturalScore: 91
    },
    amenities: {
      restaurants: 145,
      bars: 48,
      cafes: 52,
      parks: 9,
      gyms: 16,
      schools: 11,
      hospitals: 1,
      libraries: 2
    },
    housing: {
      medianHomePrice: 485000,
      medianRent: 1850,
      propertyTax: 2.3,
      homeownershipRate: 0.44
    },
    safety: {
      crimeRate: 32.1,
      safetyScore: 71
    },
    climate: {
      averageTemp: 49,
      rainyDays: 125,
      sunnyDays: 189
    },
    commute: {
      averageCommuteTime: 31,
      publicTransitAccess: 88,
      walkingCommute: 11
    }
  },
  {
    id: 'boston-north-end',
    name: 'North End',
    city: 'Boston',
    state: 'MA',
    description: 'Historic Italian neighborhood with cobblestone streets, authentic restaurants, and waterfront views.',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=800',
    demographics: {
      population: 7500,
      medianAge: 41,
      medianIncome: 105000,
      educationLevel: 'Graduate Degree',
      diversityIndex: 0.45
    },
    lifestyle: {
      walkabilityScore: 95,
      transitScore: 88,
      bikeScore: 65,
      nightlifeScore: 74,
      diningScore: 96,
      shoppingScore: 78,
      parksScore: 86,
      culturalScore: 89
    },
    amenities: {
      restaurants: 67,
      bars: 18,
      cafes: 21,
      parks: 6,
      gyms: 8,
      schools: 4,
      hospitals: 1,
      libraries: 1
    },
    housing: {
      medianHomePrice: 895000,
      medianRent: 3200,
      propertyTax: 1.04,
      homeownershipRate: 0.62
    },
    safety: {
      crimeRate: 8.2,
      safetyScore: 91
    },
    climate: {
      averageTemp: 51,
      rainyDays: 127,
      sunnyDays: 201
    },
    commute: {
      averageCommuteTime: 29,
      publicTransitAccess: 92,
      walkingCommute: 28
    }
  }
];