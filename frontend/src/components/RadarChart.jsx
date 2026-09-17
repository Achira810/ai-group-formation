import React from 'react';

/**
 * Visual 5-Axis Skill Radar Chart
 * Renders a crisp, responsive SVG radar polygon representing team multidimensional metrics.
 */
export const RadarChart = ({ 
  data = [75, 75, 75, 75, 75], 
  labels = ['Academic', 'Diversity', 'Tiers', 'Roles', 'Soft Skills'], 
  size = 180 
}) => {
  const center = size / 2;
  const radius = (size / 2) - 26; // Margin for text labels
  const numAxes = labels.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  // Concentric levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  // Helper to compute (x, y) coordinates for an angle and normalized radius
  const getCoordinates = (value, index, maxVal = 100) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build the polygon points string for team data
  const polygonPoints = data.map((val, idx) => {
    const coords = getCoordinates(Math.max(10, Math.min(100, val)), idx);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div className="radar-chart-container relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Gradients */}
        <defs>
          <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="gridGrad">
            <stop offset="0%" stopColor="#312e81" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Concentric Polygons */}
        {levels.map((lvl, lvlIdx) => {
          const levelPoints = Array.from({ length: numAxes }).map((_, idx) => {
            const coords = getCoordinates(lvl * 100, idx);
            return `${coords.x},${coords.y}`;
          }).join(' ');

          return (
            <polygon
              key={`grid-${lvlIdx}`}
              points={levelPoints}
              fill="none"
              stroke="#334155"
              strokeWidth="0.8"
              strokeDasharray={lvlIdx < 3 ? "2 2" : undefined}
            />
          );
        })}

        {/* Axis Lines & Labels */}
        {labels.map((label, idx) => {
          const endCoords = getCoordinates(100, idx);
          const labelCoords = getCoordinates(118, idx);

          return (
            <g key={`axis-${idx}`}>
              <line
                x1={center}
                y1={center}
                x2={endCoords.x}
                y2={endCoords.y}
                stroke="#475569"
                strokeWidth="0.8"
              />
              <text
                x={labelCoords.x}
                y={labelCoords.y}
                fontSize="9"
                fontWeight="600"
                fill="#94a3b8"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ userSelect: 'none' }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarFillGrad)"
          stroke="#818cf8"
          strokeWidth="2"
          className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        />

        {/* Vertex Points */}
        {data.map((val, idx) => {
          const coords = getCoordinates(Math.max(10, Math.min(100, val)), idx);
          return (
            <circle
              key={`vertex-${idx}`}
              cx={coords.x}
              cy={coords.y}
              r="3.5"
              fill="#c7d2fe"
              stroke="#4338ca"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </div>
  );
};
