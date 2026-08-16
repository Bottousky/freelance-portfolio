/**
 * Deterministic lead scoring for the Lead Qualification Engine demo.
 * Pure functions only — no DOM, no network, no randomness — so the same
 * form always produces the same score, route and sales summary.
 */

export type ProjectType = "house" | "modular" | "extension" | "commercial" | "land";
export type LocationZone = "gba" | "province" | "other";
export type LandStatus = "owned" | "buying" | "looking" | "none";
export type BudgetBand = "high" | "mid" | "low" | "unknown";
export type Timing = "immediate" | "soon" | "later" | "exploring";

export interface LeadFormData {
  projectType: ProjectType;
  location: LocationZone;
  squareMeters: number;
  landStatus: LandStatus;
  budgetBand: BudgetBand;
  timing: Timing;
}

export interface ScoreFactor {
  label: string;
  points: number;
  max: number;
  reason: string;
}

export type LeadRoute = "hot" | "warm" | "nurture";

export interface LeadScore {
  total: number;
  max: number;
  factors: ScoreFactor[];
  route: LeadRoute;
  routeReason: string;
}

export interface SalesSummary {
  profile: string;
  estimatedValue: string;
  nextStep: string;
  suggestedMessage: string;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  house: "House construction",
  modular: "Modular / prefab home",
  extension: "Extension or renovation",
  commercial: "Commercial build",
  land: "Land only",
};

export const LOCATION_LABELS: Record<LocationZone, string> = {
  gba: "Buenos Aires / GBA",
  province: "Nearby province",
  other: "Other / remote",
};

export const LAND_LABELS: Record<LandStatus, string> = {
  owned: "Owned",
  buying: "In purchase",
  looking: "Looking",
  none: "No land",
};

export const BUDGET_LABELS: Record<BudgetBand, string> = {
  high: "USD 80k+",
  mid: "USD 40–80k",
  low: "Under USD 40k",
  unknown: "Not sure yet",
};

export const TIMING_LABELS: Record<Timing, string> = {
  immediate: "Within 3 months",
  soon: "In 3–6 months",
  later: "In 6–12 months",
  exploring: "Just exploring",
};

export const ROUTE_LABELS: Record<LeadRoute, string> = {
  hot: "HOT — call today",
  warm: "WARM — send estimate",
  nurture: "NURTURE — educate first",
};

const PROJECT_TYPE_POINTS: Record<ProjectType, number> = {
  house: 10,
  modular: 8,
  extension: 6,
  commercial: 7,
  land: 3,
};

const LOCATION_POINTS: Record<LocationZone, number> = {
  gba: 5,
  province: 3,
  other: 1,
};

const LAND_POINTS: Record<LandStatus, number> = {
  owned: 5,
  buying: 4,
  looking: 2,
  none: 0,
};

const BUDGET_POINTS: Record<BudgetBand, number> = {
  high: 8,
  mid: 5,
  low: 2,
  unknown: 1,
};

const TIMING_POINTS: Record<Timing, number> = {
  immediate: 6,
  soon: 4,
  later: 2,
  exploring: 0,
};

const PROJECT_TYPE_REASONS: Record<ProjectType, string> = {
  house: "New house construction — highest-value project type.",
  modular: "Modular/prefab home — strong fit for productized builds.",
  extension: "Extension or renovation — medium scope.",
  commercial: "Commercial build — good value, longer cycle.",
  land: "Land only — early stage, needs education.",
};

const LOCATION_REASONS: Record<LocationZone, string> = {
  gba: "Within the Buenos Aires / GBA service area.",
  province: "Nearby province — travel or remote coordination needed.",
  other: "Outside the service area — remote-only engagement.",
};

const LAND_REASONS: Record<LandStatus, string> = {
  owned: "Land already owned — ready to build.",
  buying: "Land in purchase — short delay expected.",
  looking: "Still looking for land — needs guidance.",
  none: "No land yet — early stage.",
};

const BUDGET_REASONS: Record<BudgetBand, string> = {
  high: "USD 80k+ budget — serious buyer.",
  mid: "USD 40–80k budget — realistic scope.",
  low: "Under USD 40k — smaller scope.",
  unknown: "Budget not shared yet.",
};

const TIMING_REASONS: Record<Timing, string> = {
  immediate: "Wants to start within 3 months.",
  soon: "Planning within 3–6 months.",
  later: "6–12 month horizon.",
  exploring: "Still exploring options.",
};

const ROUTE_REASONS: Record<LeadRoute, string> = {
  hot: "Score 30+: budget, timing and project size all point to a ready buyer. Call the prospect today.",
  warm: "Score 18–29: real intent with one or two open variables. Send a scoped estimate and follow up within 48 hours.",
  nurture: "Score under 18: early stage. Add to an educational nurture sequence until timing or budget matures.",
};

const BUDGET_VALUE: Record<BudgetBand, string> = {
  high: "USD 80k+",
  mid: "USD 40–80k",
  low: "Under USD 40k",
  unknown: "Not shared",
};

const NEXT_STEPS: Record<LeadRoute, string> = {
  hot: "Call within 24h with a scoped proposal and a calendar link.",
  warm: "Send a scoped estimate within 48h and schedule a follow-up.",
  nurture: "Add to the nurture sequence with pricing/timeline guides; re-qualify in 90 days.",
};

const MESSAGE_TEMPLATES: Record<LeadRoute, string> = {
  hot: "Hi — thanks for the details on your {project} ({squareMeters} m²). With a {budget} budget and {timing} timing, this is exactly the kind of project I can scope this week. When is a good time for a 20-minute call?",
  warm: "Hi — thanks for the details on your {project} ({squareMeters} m²). I can send a scoped estimate for the {budget} range. Would you like me to include a timeline and a fixed price?",
  nurture: "Hi — thanks for sharing your {project} plans. I'll send a short guide on pricing and timelines for {squareMeters} m² projects so you have a reference when you're ready to move.",
};

export const ROUTE_THRESHOLDS = {
  hot: 30,
  warm: 18,
} as const;

function squareMetersPoints(squareMeters: number): number {
  if (squareMeters >= 100) return 5;
  if (squareMeters >= 50) return 3;
  return 1;
}

function squareMetersReason(squareMeters: number): string {
  if (squareMeters >= 100) return "Large project (100+ m²).";
  if (squareMeters >= 50) return "Medium project (50–99 m²).";
  return "Small project (under 50 m²).";
}

export function scoreLead(form: LeadFormData): LeadScore {
  const factors: ScoreFactor[] = [
    {
      label: "Project type",
      points: PROJECT_TYPE_POINTS[form.projectType],
      max: 10,
      reason: PROJECT_TYPE_REASONS[form.projectType],
    },
    {
      label: "Location",
      points: LOCATION_POINTS[form.location],
      max: 5,
      reason: LOCATION_REASONS[form.location],
    },
    {
      label: "Square meters",
      points: squareMetersPoints(form.squareMeters),
      max: 5,
      reason: squareMetersReason(form.squareMeters),
    },
    {
      label: "Land status",
      points: LAND_POINTS[form.landStatus],
      max: 5,
      reason: LAND_REASONS[form.landStatus],
    },
    {
      label: "Budget band",
      points: BUDGET_POINTS[form.budgetBand],
      max: 8,
      reason: BUDGET_REASONS[form.budgetBand],
    },
    {
      label: "Timing",
      points: TIMING_POINTS[form.timing],
      max: 6,
      reason: TIMING_REASONS[form.timing],
    },
  ];

  const total = factors.reduce((sum, factor) => sum + factor.points, 0);
  const max = factors.reduce((sum, factor) => sum + factor.max, 0);
  const route: LeadRoute =
    total >= ROUTE_THRESHOLDS.hot ? "hot" : total >= ROUTE_THRESHOLDS.warm ? "warm" : "nurture";

  return { total, max, factors, route, routeReason: ROUTE_REASONS[route] };
}

export function buildSalesSummary(form: LeadFormData, score: LeadScore): SalesSummary {
  const profile = [
    PROJECT_TYPE_LABELS[form.projectType],
    `${form.squareMeters} m²`,
    LOCATION_LABELS[form.location],
    `land ${LAND_LABELS[form.landStatus].toLowerCase()}`,
  ].join(" · ");

  const suggestedMessage = MESSAGE_TEMPLATES[score.route]
    .replace("{project}", PROJECT_TYPE_LABELS[form.projectType].toLowerCase())
    .replace("{squareMeters}", String(form.squareMeters))
    .replace("{budget}", BUDGET_VALUE[form.budgetBand])
    .replace("{timing}", TIMING_LABELS[form.timing].toLowerCase());

  return {
    profile,
    estimatedValue: BUDGET_VALUE[form.budgetBand],
    nextStep: NEXT_STEPS[score.route],
    suggestedMessage,
  };
}