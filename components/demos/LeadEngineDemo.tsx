"use client";

import { useState } from "react";
import {
  BUDGET_LABELS,
  LAND_LABELS,
  LOCATION_LABELS,
  PROJECT_TYPE_LABELS,
  ROUTE_LABELS,
  TIMING_LABELS,
  buildSalesSummary,
  scoreLead,
  type BudgetBand,
  type LandStatus,
  type LeadFormData,
  type LeadScore,
  type LocationZone,
  type ProjectType,
  type SalesSummary,
  type Timing,
} from "@/lib/demo/leadScoring";

const STEPS = ["Project", "Location", "Size & land", "Budget", "Timing", "Review"] as const;

type Option<T extends string> = { value: T; label: string; hint?: string };

function RadioGroup<T extends string>(props: {
  name: string;
  legend: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="demoFieldset">
      <legend>{props.legend}</legend>
      <div className="demoOptions">
        {props.options.map((option) => (
          <label
            key={option.value}
            className={props.value === option.value ? "demoOption selected" : "demoOption"}
          >
            <input
              type="radio"
              name={props.name}
              value={option.value}
              checked={props.value === option.value}
              onChange={() => props.onChange(option.value)}
            />
            <span className="demoOptionLabel">{option.label}</span>
            {option.hint ? <small>{option.hint}</small> : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const PROJECT_TYPE_OPTIONS: readonly Option<ProjectType>[] = [
  { value: "house", label: "House construction", hint: "New build, full scope" },
  { value: "modular", label: "Modular / prefab home", hint: "Productized build" },
  { value: "extension", label: "Extension or renovation", hint: "Medium scope" },
  { value: "commercial", label: "Commercial build", hint: "Shop, office, warehouse" },
  { value: "land", label: "Land only", hint: "Early stage" },
];

const LOCATION_OPTIONS: readonly Option<LocationZone>[] = [
  { value: "gba", label: "Buenos Aires / GBA", hint: "In the service area" },
  { value: "province", label: "Nearby province", hint: "Travel or remote coordination" },
  { value: "other", label: "Other / remote", hint: "Remote-only engagement" },
];

const LAND_OPTIONS: readonly Option<LandStatus>[] = [
  { value: "owned", label: "Owned", hint: "Ready to build" },
  { value: "buying", label: "In purchase", hint: "Short delay expected" },
  { value: "looking", label: "Looking", hint: "Needs guidance" },
  { value: "none", label: "No land", hint: "Early stage" },
];

const BUDGET_OPTIONS: readonly Option<BudgetBand>[] = [
  { value: "high", label: "USD 80k+", hint: "Serious buyer" },
  { value: "mid", label: "USD 40–80k", hint: "Realistic scope" },
  { value: "low", label: "Under USD 40k", hint: "Smaller scope" },
  { value: "unknown", label: "Not sure yet", hint: "Needs guidance" },
];

const TIMING_OPTIONS: readonly Option<Timing>[] = [
  { value: "immediate", label: "Within 3 months", hint: "Ready to move" },
  { value: "soon", label: "In 3–6 months", hint: "Planning phase" },
  { value: "later", label: "In 6–12 months", hint: "Longer horizon" },
  { value: "exploring", label: "Just exploring", hint: "No deadline" },
];

const INITIAL_FORM: LeadFormData = {
  projectType: "house",
  location: "gba",
  squareMeters: 80,
  landStatus: "owned",
  budgetBand: "mid",
  timing: "soon",
};

export function LeadEngineDemo() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [score, setScore] = useState<LeadScore | null>(null);
  const [summary, setSummary] = useState<SalesSummary | null>(null);

  const canNext = step !== 2 || form.squareMeters >= 1;

  function handleSubmit() {
    const computed = scoreLead(form);
    setScore(computed);
    setSummary(buildSalesSummary(form, computed));
  }

  function handleStartOver() {
    setStep(0);
    setForm(INITIAL_FORM);
    setScore(null);
    setSummary(null);
  }

  if (score && summary) {
    return (
      <div className="demoResult" aria-live="polite">
        <section className="demoPanel leadResult">
          <div className="leadScoreHead">
            <div>
              <p className="kicker">LEAD SCORE</p>
              <div className="leadScoreNumber">
                {score.total}
                <small> / {score.max}</small>
              </div>
            </div>
            <span className={`routePill route-${score.route}`}>{ROUTE_LABELS[score.route]}</span>
          </div>
          <p className="routeReason">{score.routeReason}</p>
          <div className="scoreFactors">
            {score.factors.map((factor) => (
              <div className="scoreFactor" key={factor.label}>
                <div className="scoreFactorHead">
                  <span>{factor.label}</span>
                  <strong>
                    {factor.points}/{factor.max}
                  </strong>
                </div>
                <div className="scoreBar">
                  <span style={{ width: `${(factor.points / factor.max) * 100}%` }} />
                </div>
                <small>{factor.reason}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="demoPanel leadSummary">
          <p className="kicker">SALES SUMMARY</p>
          <dl className="summaryList">
            <div>
              <dt>Prospect profile</dt>
              <dd>{summary.profile}</dd>
            </div>
            <div>
              <dt>Estimated value</dt>
              <dd>{summary.estimatedValue}</dd>
            </div>
            <div>
              <dt>Next step</dt>
              <dd>{summary.nextStep}</dd>
            </div>
          </dl>
          <div className="suggestedMessage">
            <p className="kicker">SUGGESTED FIRST MESSAGE</p>
            <p>{summary.suggestedMessage}</p>
          </div>
        </section>

        <div className="demoNav">
          <span className="demoHint">Deterministic scoring — same answers always produce the same result.</span>
          <div className="demoNavRight">
            <button type="button" className="button ghost" onClick={handleStartOver}>
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demoResult">
      <section className="demoPanel">
        <div className="demoStepTitle">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </div>
        <div className="demoProgress" aria-hidden="true">
          <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {step === 0 && (
          <RadioGroup
            name="projectType"
            legend="What are they planning to build?"
            options={PROJECT_TYPE_OPTIONS}
            value={form.projectType}
            onChange={(projectType) => setForm({ ...form, projectType })}
          />
        )}

        {step === 1 && (
          <RadioGroup
            name="location"
            legend="Where is the project located?"
            options={LOCATION_OPTIONS}
            value={form.location}
            onChange={(location) => setForm({ ...form, location })}
          />
        )}

        {step === 2 && (
          <>
            <div className="demoField">
              <label htmlFor="squareMeters">Approximate square meters</label>
              <input
                id="squareMeters"
                className="demoInput"
                type="number"
                min={1}
                max={10000}
                value={form.squareMeters}
                onChange={(event) =>
                  setForm({ ...form, squareMeters: Math.max(1, Number(event.target.value) || 0) })
                }
              />
            </div>
            <RadioGroup
              name="landStatus"
              legend="Land status"
              options={LAND_OPTIONS}
              value={form.landStatus}
              onChange={(landStatus) => setForm({ ...form, landStatus })}
            />
          </>
        )}

        {step === 3 && (
          <RadioGroup
            name="budgetBand"
            legend="Approximate budget"
            options={BUDGET_OPTIONS}
            value={form.budgetBand}
            onChange={(budgetBand) => setForm({ ...form, budgetBand })}
          />
        )}

        {step === 4 && (
          <RadioGroup
            name="timing"
            legend="When do they want to start?"
            options={TIMING_OPTIONS}
            value={form.timing}
            onChange={(timing) => setForm({ ...form, timing })}
          />
        )}

        {step === 5 && (
          <>
            <dl className="demoReviewList">
              <div className="demoReviewRow">
                <dt>Project type</dt>
                <dd>{PROJECT_TYPE_LABELS[form.projectType]}</dd>
              </div>
              <div className="demoReviewRow">
                <dt>Location</dt>
                <dd>{LOCATION_LABELS[form.location]}</dd>
              </div>
              <div className="demoReviewRow">
                <dt>Square meters</dt>
                <dd>{form.squareMeters} m²</dd>
              </div>
              <div className="demoReviewRow">
                <dt>Land status</dt>
                <dd>{LAND_LABELS[form.landStatus]}</dd>
              </div>
              <div className="demoReviewRow">
                <dt>Budget band</dt>
                <dd>{BUDGET_LABELS[form.budgetBand]}</dd>
              </div>
              <div className="demoReviewRow">
                <dt>Timing</dt>
                <dd>{TIMING_LABELS[form.timing]}</dd>
              </div>
            </dl>
            <p className="demoHint">Submitting runs the deterministic scoring rules and generates the sales summary.</p>
          </>
        )}

        <div className="demoNav">
          <button
            type="button"
            className="button ghost"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
          >
            ← Back
          </button>
          <div className="demoNavRight">
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                className="button primary"
                onClick={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))}
                disabled={!canNext}
              >
                Continue →
              </button>
            ) : (
              <button type="button" className="button primary" onClick={handleSubmit}>
                Score this lead
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}