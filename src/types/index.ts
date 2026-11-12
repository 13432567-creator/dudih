export type LazinessTier = 
  | 'baby'          // 0-25%
  | 'efficient'     // 26-50%
  | 'procrastinator'// 51-75%
  | 'couch_potato'  // 76-90%
  | 'transcended';  // 91-100%

export interface QuizOption {
  id: string;
  text: string;
  points: number; // 0 (active/diligent) to 4 (maximum sloth)
  subtext?: string;
  reaction: string; // e.g. "ขยันเกินไปแล้ว!", "ระดับเทพสลอธ!", etc.
}

export interface QuizQuestion {
  id: number;
  category: string;
  scenario: string;
  question: string;
  options: QuizOption[];
  tip?: string;
}

export interface LazinessProfile {
  tier: LazinessTier;
  titleTh: string;
  titleEn: string;
  badge: string;
  minScore: number;
  maxScore: number;
  description: string;
  quote: string;
  superpower: string;
  weakness: string;
  dailyRoutine: string[];
  bedFusionIndex: number; // 0-100
  procrastinationRatio: number; // 0-100
  excuseVelocity: number; // 0-100
  energyConservation: number; // 0-100
}

export interface UserAssessmentResult {
  score: number; // 0-100%
  rawScore: number;
  totalPossible: number;
  profile: LazinessProfile;
  answers: Record<number, number>; // questionId -> optionPoints
  timestamp: string;
  userName: string;
}

export interface ExcuseItem {
  id: string;
  category: 'friend' | 'work' | 'chores' | 'party' | 'exercise';
  categoryLabel: string;
  text: string;
  believability: number; // 1-5 stars
  riskLevel: 'ต่ำ' | 'ปานกลาง' | 'สูงมาก';
  effectNotes: string;
}
