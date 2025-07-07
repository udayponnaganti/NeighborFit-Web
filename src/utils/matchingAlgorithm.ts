import { NeighborhoodData, UserPreferences, NeighborhoodMatch } from '../types';
import { neighborhoods } from '../data/neighborhoods';

export class NeighborhoodMatcher {
  private normalizeScore(value: number, min: number, max: number): number {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  }

  private calculateLifestyleScore(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences
  ): number {
    const weights = preferences.lifestyle;
    const lifestyle = neighborhood.lifestyle;
    
    let totalScore = 0;
    let totalWeight = 0;

    // Calculate weighted average of lifestyle factors
    const factors = [
      { score: lifestyle.walkabilityScore, weight: weights.walkabilityImportance },
      { score: lifestyle.transitScore, weight: weights.transitImportance },
      { score: lifestyle.nightlifeScore, weight: weights.nightlifeImportance },
      { score: lifestyle.diningScore, weight: weights.diningImportance },
      { score: lifestyle.shoppingScore, weight: weights.shoppingImportance },
      { score: lifestyle.parksScore, weight: weights.parksImportance },
      { score: lifestyle.culturalScore, weight: weights.culturalImportance }
    ];

    factors.forEach(factor => {
      totalScore += factor.score * factor.weight;
      totalWeight += factor.weight;
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  private calculateDemographicsScore(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences
  ): number {
    const demo = neighborhood.demographics;
    const prefs = preferences.demographics;
    
    let score = 0;
    let factors = 0;

    // Age range compatibility
    const [minAge, maxAge] = prefs.preferredAgeRange;
    const ageScore = (demo.medianAge >= minAge && demo.medianAge <= maxAge) ? 100 : 
                    Math.max(0, 100 - Math.abs(demo.medianAge - ((minAge + maxAge) / 2)) * 5);
    score += ageScore;
    factors++;

    // Income level (normalized)
    const incomeScore = this.normalizeScore(demo.medianIncome, 30000, 200000);
    score += incomeScore * (prefs.incomeImportance / 10);
    factors++;

    // Diversity
    const diversityScore = demo.diversityIndex * 100;
    score += diversityScore * (prefs.diversityImportance / 10);
    factors++;

    // Education level scoring
    const educationLevels = {
      'High School': 25,
      'Some College': 50,
      'Bachelor\'s Degree': 75,
      'Graduate Degree': 100
    };
    const educationScore = educationLevels[demo.educationLevel as keyof typeof educationLevels] || 50;
    score += educationScore * (prefs.educationImportance / 10);
    factors++;

    return factors > 0 ? score / factors : 0;
  }

  private calculateHousingScore(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences
  ): number {
    const housing = neighborhood.housing;
    const prefs = preferences.housing;
    
    let score = 0;
    let factors = 0;

    // Budget compatibility
    const relevantPrice = prefs.housingType === 'rent' ? housing.medianRent : housing.medianHomePrice;
    const budgetScore = relevantPrice <= prefs.maxBudget ? 100 : 
                       Math.max(0, 100 - ((relevantPrice - prefs.maxBudget) / prefs.maxBudget) * 100);
    score += budgetScore * 2; // Double weight for budget
    factors += 2;

    // Property tax consideration
    const taxScore = this.normalizeScore(housing.propertyTax, 0.5, 3.0);
    score += (100 - taxScore) * (prefs.propertyTaxImportance / 10);
    factors++;

    return factors > 0 ? score / factors : 0;
  }

  private calculateSafetyScore(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences
  ): number {
    const safety = neighborhood.safety;
    const prefs = preferences.safety;
    
    // Safety score must meet minimum threshold
    if (safety.safetyScore < prefs.minSafetyScore) {
      return 0;
    }

    return safety.safetyScore * (prefs.safetyImportance / 10);
  }

  private calculateClimateScore(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences
  ): number {
    const climate = neighborhood.climate;
    const prefs = preferences.climate;
    
    let score = 0;
    let factors = 0;

    // Temperature preference
    const [minTemp, maxTemp] = prefs.temperaturePreference;
    const tempScore = (climate.averageTemp >= minTemp && climate.averageTemp <= maxTemp) ? 100 :
                     Math.max(0, 100 - Math.abs(climate.averageTemp - ((minTemp + maxTemp) / 2)) * 2);
    score += tempScore;
    factors++;

    // Rainy days (lower is better if high importance)
    const rainyScore = this.normalizeScore(climate.rainyDays, 30, 200);
    score += (100 - rainyScore) * (prefs.rainyDaysImportance / 10);
    factors++;

    // Sunny days (higher is better)
    const sunnyScore = this.normalizeScore(climate.sunnyDays, 100, 350);
    score += sunnyScore * (prefs.sunnyDaysImportance / 10);
    factors++;

    return factors > 0 ? score / factors : 0;
  }

  private calculateCommuteScore(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences
  ): number {
    const commute = neighborhood.commute;
    const prefs = preferences.commute;
    
    let score = 0;
    let factors = 0;

    // Commute time compatibility
    const commuteScore = commute.averageCommuteTime <= prefs.maxCommuteTime ? 100 :
                        Math.max(0, 100 - ((commute.averageCommuteTime - prefs.maxCommuteTime) / prefs.maxCommuteTime) * 100);
    score += commuteScore * (prefs.commuteImportance / 10);
    factors++;

    // Public transit access
    const transitScore = commute.publicTransitAccess * (prefs.publicTransitImportance / 10);
    score += transitScore;
    factors++;

    return factors > 0 ? score / factors : 0;
  }

  private generateMatchReasons(
    neighborhood: NeighborhoodData,
    preferences: UserPreferences,
    categoryScores: any
  ): string[] {
    const reasons: string[] = [];
    
    if (categoryScores.lifestyle > 80) {
      const topLifestyle = Object.entries(neighborhood.lifestyle)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
        .map(([key]) => key.replace('Score', ''));
      reasons.push(`Excellent ${topLifestyle.join(' and ')} scene`);
    }

    if (categoryScores.safety > 85) {
      reasons.push(`Very safe neighborhood with low crime rates`);
    }

    if (categoryScores.housing > 75) {
      reasons.push(`Good housing value within your budget`);
    }

    if (neighborhood.lifestyle.walkabilityScore > 85) {
      reasons.push(`Highly walkable with easy access to amenities`);
    }

    if (neighborhood.demographics.diversityIndex > 0.7) {
      reasons.push(`Diverse and inclusive community`);
    }

    if (neighborhood.amenities.restaurants > 100) {
      reasons.push(`Incredible food scene with ${neighborhood.amenities.restaurants} restaurants`);
    }

    return reasons.slice(0, 4); // Limit to top 4 reasons
  }

  public findMatches(preferences: UserPreferences): NeighborhoodMatch[] {
    const matches: NeighborhoodMatch[] = neighborhoods.map(neighborhood => {
      const categoryScores = {
        lifestyle: this.calculateLifestyleScore(neighborhood, preferences),
        demographics: this.calculateDemographicsScore(neighborhood, preferences),
        housing: this.calculateHousingScore(neighborhood, preferences),
        safety: this.calculateSafetyScore(neighborhood, preferences),
        climate: this.calculateClimateScore(neighborhood, preferences),
        commute: this.calculateCommuteScore(neighborhood, preferences)
      };

      // Calculate weighted overall score
      const weights = {
        lifestyle: 0.25,
        demographics: 0.15,
        housing: 0.20,
        safety: 0.20,
        climate: 0.10,
        commute: 0.10
      };

      const matchScore = Object.entries(categoryScores).reduce((total, [category, score]) => {
        return total + (score * weights[category as keyof typeof weights]);
      }, 0);

      const matchReasons = this.generateMatchReasons(neighborhood, preferences, categoryScores);

      return {
        neighborhood,
        matchScore: Math.round(matchScore),
        matchReasons,
        categoryScores
      };
    });

    // Sort by match score (descending) and return top matches
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
}

export const matcher = new NeighborhoodMatcher();