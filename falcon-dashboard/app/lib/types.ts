export type Campaign = {
  id: string;
  name: string;
  status: string;
  effective_status: string;
  objective: string;
  unit: string;
  kind: string;
  format: string;
  daily_budget: number;
  created_time: string;
};

export type AdSet = {
  id: string;
  campaign_id: string;
  name: string;
  status: string;
  effective_status: string;
  daily_budget: number;
  optimization_goal: string;
  destination_type: string;
  billing_event: string;
  created_time: string;
  audience_type: string; // Lookalike | Remarketing | Interesse | Amplo
  age_min: number | null;
  age_max: number | null;
  genders: string;
};

export type DailyRow = {
  campaign_id: string;
  date: string;
  spend: number;
  leads: number;
  impressions: number;
  clicks: number;
};

export type AdSetInsight = {
  adset_id: string;
  campaign_id: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  frequency: number;
  leads: number;
};

export type AdInsight = {
  ad_id: string;
  adset_id: string;
  campaign_id: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  frequency: number;
  leads: number;
};

export type AdWeekly = {
  ad_id: string;
  week_start: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  frequency: number;
  leads: number;
};

export type Creative = {
  campaign_id: string;
  campaign_name: string;
  campaign_status: string;
  unit: string;
  kind: string;
  format: string;
  ad_id: string;
  ad_name: string;
  ad_status: string;
  headline: string;
  thumb: string | null;
  full_img: string | null;
  video_embed_url: string | null;
  video_permalink: string | null;
};

export type BreakdownRow = {
  campaign_id: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  [key: string]: any;
};

export type Activity = {
  event_type: string;
  event_time: string;
  translated_event_type: string;
  extra_data: string;
  actor_name: string;
  object_name: string;
};

export type ApiData = {
  generated_at: string;
  today: string;
  campaigns: Campaign[];
  adsets: AdSet[];
  adsetInsights: AdSetInsight[];
  daily: DailyRow[];
  adInsights: AdInsight[];
  adWeekly: AdWeekly[];
  creatives: Creative[];
  demographics: BreakdownRow[];
  placements: BreakdownRow[];
  devices: BreakdownRow[];
  regions: BreakdownRow[];
  activities: Activity[];
};

export type Settings = {
  cplTarget: number;
  cplMax: number;
  leadGoalMonthly: number;
  qualificationRate: number; // % of leads that become MQL/SQL (estimate, no CRM)
  closeRate: number; // % of qualified leads that become sales (estimate)
  frequencyAlert: number;
  ctrDropAlert: number; // % drop considered fatigue
  defaultPeriod: 'today' | 'yesterday' | '7d' | '30d';
  alertsEnabled: {
    cplAbove: boolean;
    highFrequency: boolean;
    creativeFatigue: boolean;
    learningPhase: boolean;
  };
};

export const DEFAULT_SETTINGS: Settings = {
  cplTarget: 15,
  cplMax: 25,
  leadGoalMonthly: 300,
  qualificationRate: 55,
  closeRate: 20,
  frequencyAlert: 3.5,
  ctrDropAlert: 25,
  defaultPeriod: '7d',
  alertsEnabled: {
    cplAbove: true,
    highFrequency: true,
    creativeFatigue: true,
    learningPhase: true,
  },
};
