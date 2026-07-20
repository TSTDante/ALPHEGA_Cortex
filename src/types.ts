export interface CampaignItem {
  id: string;
  name: string;
  category: 'character' | 'location' | 'item' | 'lore' | 'session';
  summary: string;
  description?: string;
  tags?: string[];
}

export interface Song {
  id: string;
  title: string;
  key: string;
  instrument: 'guitalele' | 'harmonica' | 'both';
  chords: string;
  rhythm: string;
  harmonicaTab?: string;
  description?: string;
}

export interface RelocationTask {
  id: string;
  title: string;
  category: 'packing' | 'utilities' | 'admin' | 'unpacking';
  dueDate: string;
  notes?: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface MealPlan {
  id: string;
  day: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  mealName: string;
  ingredients: string[];
  recipe?: string;
  isAvocadoSafe?: boolean;
}

export interface ActivityLog {
  timestamp: string;
  category: 'Core' | 'DevOps' | 'Lore' | 'Lifestyle';
  message: string;
  status: 'Success' | 'Warning' | 'Error';
}
