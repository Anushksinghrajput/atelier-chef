
export type PersonaType = 'STUDENT' | 'PROFESSIONAL' | 'HOUSEHOLD' | 'GYM_ENTHUSIAST' | 'PARENT_KID_FOCUS';

export interface User {
  email: string;
  name: string;
  avatar?: string;
}

export interface MacroMatrix {
  p: number;
  c: number;
  f: number;
  fiber?: number;
}

export interface UserPreferences {
  persona: PersonaType;
  diet: string;
  allergies: string[];
  dislikes: string[];
  proteinFocus: 'High' | 'Moderate' | 'Standard';
  budgetLimit: number;
  prepTimeLimit: number;
  kitchenTools: string[];
  cookingWindow: string;
  reminderPreference: 'Morning' | 'Evening' | 'Both';
  healthGoal?: 'Immunity' | 'Growth' | 'Strength' | 'Weight Loss' | 'Energy';
}

export interface UserInputs {
  planningDuration: string;
  totalBudget: string;
  budgetPriority: string;
  dietaryRestrictions: string;
  ingredients: string;
  mealsPerDay: string;
  cookingTimePerDay: string;
  kitchenEquipment: string;
  leftoversPreference: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string; 
  durationMinutes: number;
  type: 'SHOPPING' | 'PREP' | 'COOKING' | 'HYDRATION' | 'MEAL';
  date: string; 
}

export interface Ingredient {
  name: string;
  quantity: string;
  cost: number;
  isLocked: boolean;
  sourceHint?: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  cost: number;
  prepTime: number;
  cookTime: number;
  proteinGrams: number;
  calories: number;
  macros: MacroMatrix;
  ingredients: Ingredient[];
  instructions: string[];
  healthBenefit: string;
  freshFactor: string;
}

export interface DayPlan {
  day: number;
  date: string;
  meals: Meal[];
  schedule: CalendarEvent[];
  dailyInsight: string;
  wellnessScore: number;
}

export interface AnalyticsData {
  weeklyConsistency: number[];
  proteinTrends: number[];
  calorieEfficiency: number;
  micronutrientBalance: number;
  sleepScore: number;
  hydrationCompliance: number;
}

export interface CookingPlan {
  id: string;
  summary: {
    totalCost: number;
    avgProtein: number;
    efficiencyScore: number;
    wasteReductionHacks: string[];
    sustainabilityRating: string;
    nutritionPhilosophy: string;
  };
  days: DayPlan[];
  groceryList: {
    item: string;
    category: string;
    estimatedCost: number;
    priority: 'MUST' | 'OPTIONAL';
  }[];
  analytics: AnalyticsData;
}

export enum AppStep {
  DASHBOARD = 'DASHBOARD',
  MEAL_PLANNER = 'MEAL_PLANNER',
  GROCERY = 'GROCERY',
  CALENDAR = 'CALENDAR',
  ANALYTICS = 'ANALYTICS',
  ONBOARDING_PERSONA = 'ONBOARDING_PERSONA',
  ONBOARDING_PREFERENCES = 'ONBOARDING_PREFERENCES',
  ONBOARDING_STASH = 'ONBOARDING_STASH',
  GENERATING = 'GENERATING',
  ERROR = 'ERROR'
}
