import type { CSSProperties } from "react";

// Juntopia tile visual, in three beats: dice rolled at the table, cards dealt from the deck,
// and a move flying across the Atlas globe ("A la distancia"). CSS 3D + SVG only.

// Pip positions on a 3×3 grid (0 = top-left … 8 = bottom-right).
const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};
// Opposite faces add up to 7; every die rests showing six.
const FACES = [
  { side: "front", value: 6 },
  { side: "back", value: 1 },
  { side: "right", value: 3 },
  { side: "left", value: 4 },
  { side: "top", value: 2 },
  { side: "bottom", value: 5 },
];

function Die({ delay }: { delay: string }) {
  return (
    <div className="jDieSlot" style={{ "--d": delay } as CSSProperties}>
      <div className="jDie">
        {FACES.map((face) => (
          <span key={face.side} className={`jFace jFace-${face.side}`}>
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} className={PIPS[face.value]?.includes(i) ? "on" : undefined} />
            ))}
          </span>
        ))}
      </div>
      <span className="jDieShadow" />
    </div>
  );
}

const DEALT = [
  { label: "En la mesa", x: "-112px", y: "14px", rot: "-11deg", delay: "0s" },
  { label: "Juntopia", x: "0px", y: "-6px", rot: "0deg", delay: ".22s", brand: true },
  { label: "A la distancia", x: "112px", y: "14px", rot: "11deg", delay: ".44s" },
];

function Globe() {
  const flight = "M70 104 Q 112 6 156 136";
  return (
    <svg className="jGlobe" viewBox="0 0 220 210" aria-hidden="true">
      <defs>
        <pattern id="jDots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="currentColor" />
        </pattern>
        <clipPath id="jGlobeClip">
          <circle cx="110" cy="122" r="74" />
        </clipPath>
        <radialGradient id="jGlobeGlow" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="rgb(255 77 141 / .28)" />
          <stop offset="100%" stopColor="rgb(139 108 255 / .05)" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="122" r="74" fill="url(#jGlobeGlow)" />
      <rect x="36" y="48" width="148" height="148" fill="url(#jDots)" clipPath="url(#jGlobeClip)" className="jGlobeDots" />
      {[0, -2, -4].map((begin) => (
        <ellipse key={begin} className="jMeridian" cx="110" cy="122" rx="74" ry="74">
          <animate attributeName="rx" values="74;0;74" dur="6s" begin={`${begin}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
      <ellipse className="jParallel" cx="110" cy="96" rx="66" ry="9" />
      <ellipse className="jParallel" cx="110" cy="122" rx="74" ry="11" />
      <ellipse className="jParallel" cx="110" cy="148" rx="66" ry="9" />
      <circle className="jGlobeEdge" cx="110" cy="122" r="74" />
      <path className="jFlight" d={flight} />
      {[[70, 104], [156, 136]].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle className="jPin" cx={x} cy={y} r="4" />
          <circle className="jPinPulse" cx={x} cy={y} r="4">
            <animate attributeName="r" values="4;14" dur="2s" begin={`${i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".9;0" dur="2s" begin={`${i}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* Vía, the swallow, carries the move across. */}
      <path className="jBird" d="M9 0 L-7 -7 L-3 0 L-7 7 Z">
        <animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto" path={flight} />
      </path>
    </svg>
  );
}

export function JuntopiaScene() {
  return (
    <div className="jScene" aria-hidden="true">
      <div className="jZone">
        <div className="jDice">
          <Die delay="0s" />
          <Die delay=".12s" />
          <Die delay=".24s" />
        </div>
        <p className="jZoneLabel mono">En la mesa</p>
      </div>

      <div className="jZone">
        <div className="jTable">
          <span className="jDeck" />
          <span className="jDeck jDeckTop" />
          {DEALT.map((card) => (
            <div
              key={card.label}
              className={`jCard${card.brand ? " jCardBrand" : ""}`}
              style={{ "--x": card.x, "--y": card.y, "--rot": card.rot, "--d": card.delay } as CSSProperties}
            >
              <span className="jCardFront">
                <b>J</b>
                <strong>{card.label}</strong>
                <b className="jCardIndexEnd">J</b>
              </span>
              <span className="jCardBack" />
            </div>
          ))}
        </div>
        <p className="jZoneLabel mono">Juntopia</p>
      </div>

      <div className="jZone">
        <Globe />
        <p className="jZoneLabel mono">A la distancia · Atlas</p>
      </div>
    </div>
  );
}
