import React from 'react';

interface SlothMeterGaugeProps {
  score: number; // 0 to 100
  size?: number;
  className?: string;
  showTicks?: boolean;
}

export const SlothMeterGauge: React.FC<SlothMeterGaugeProps> = ({
  score,
  size = 280,
  className = '',
  showTicks = true,
}) => {
  // Clamped score between 0 and 100
  const clamped = Math.max(0, Math.min(100, score));

  // Gauge angle range: -120 deg to +120 deg (total 240 deg arc)
  const minAngle = -120;
  const maxAngle = 120;
  const currentAngle = minAngle + (clamped / 100) * (maxAngle - minAngle);

  // SVG coordinate calculations for circular gauge
  const center = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.08;

  // Function to describe SVG arc
  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  // Background track (-120 to +120)
  const bgPath = describeArc(center, center, radius, minAngle, maxAngle);

  // Colored progress track (up to current angle)
  const activePath = describeArc(center, center, radius, minAngle, currentAngle);

  // Determine color based on laziness score
  const getScoreColor = (val: number) => {
    if (val <= 25) return '#10b981'; // Emerald (Baby)
    if (val <= 50) return '#3b82f6'; // Blue (Smart)
    if (val <= 75) return '#f59e0b'; // Amber (Procrastinator)
    if (val <= 90) return '#ea580c'; // Orange-Red (Couch Potato)
    return '#8b5cf6'; // Purple (Transcended)
  };

  const needleColor = getScoreColor(clamped);

  // Generates tick marks
  const ticks = [0, 25, 50, 75, 100];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size * 0.85}
        viewBox={`0 0 ${size} ${size * 0.85}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Background Track */}
        <path
          d={bgPath}
          fill="none"
          stroke="currentColor"
          className="text-stone-200 dark:text-stone-800"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Colored Progress Arc */}
        {clamped > 0 && (
          <path
            d={activePath}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}

        {/* Ticks and percentage labels */}
        {showTicks &&
          ticks.map((tick) => {
            const tickAngle = minAngle + (tick / 100) * (maxAngle - minAngle);
            const outer = polarToCartesian(center, center, radius + strokeWidth * 0.7, tickAngle);
            const inner = polarToCartesian(center, center, radius - strokeWidth * 0.7, tickAngle);
            const textPos = polarToCartesian(center, center, radius + strokeWidth * 1.5, tickAngle);

            return (
              <g key={tick}>
                <line
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="currentColor"
                  className="text-stone-300 dark:text-stone-700"
                  strokeWidth={2}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[10px] font-mono fill-stone-500 dark:fill-stone-400 font-semibold"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

        {/* Rotating Needle */}
        <g
          transform={`rotate(${currentAngle} ${center} ${center})`}
          className="transition-transform duration-700 ease-out"
          filter="url(#needleGlow)"
        >
          {/* Needle shape pointing straight up before rotation */}
          <polygon
            points={`${center - 4},${center} ${center + 4},${center} ${center},${center - radius * 0.95}`}
            fill={needleColor}
          />
          {/* Center cap */}
          <circle cx={center} cy={center} r={size * 0.05} fill="#1c1917" />
          <circle cx={center} cy={center} r={size * 0.025} fill="#fafaf9" />
        </g>
      </svg>

      {/* Numerical readout */}
      <div className="-mt-8 text-center flex flex-col items-center">
        <div className="flex items-baseline gap-1">
          <span
            className="text-5xl font-extrabold tracking-tight font-mono tabular-nums transition-colors duration-500"
            style={{ color: needleColor }}
          >
            {Math.round(clamped)}
          </span>
          <span className="text-xl font-bold text-stone-500 font-mono">%</span>
        </div>
        <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium mt-0.5">
          ดัชนีความเกียจคร้านรวม (SLOTH INDEX)
        </p>
      </div>
    </div>
  );
};
