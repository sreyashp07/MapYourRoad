import type { PrebuiltTopic } from "@/features/community/prebuilt";

// A tiny static SVG preview of the roadmap graph (node chain).
export function MiniPreview({
  topics,
  color,
}: {
  topics: PrebuiltTopic[];
  color: string;
}) {
  const shown = topics.slice(0, 5);
  const W = 300;
  const stepY = 46;
  const cx = (i: number) => (i % 2 === 0 ? 70 : 230);
  const cy = (i: number) => 30 + i * stepY;

  return (
    <svg
      viewBox={`0 0 ${W} ${30 + shown.length * stepY}`}
      className="w-full"
      fill="none"
    >
      {shown.slice(1).map((_, i) => (
        <line
          key={i}
          x1={cx(i)}
          y1={cy(i)}
          x2={cx(i + 1)}
          y2={cy(i + 1)}
          stroke={color}
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
      ))}
      {shown.map((t, i) => (
        <g key={t.label}>
          <circle cx={cx(i)} cy={cy(i)} r="6" fill={color} />
          <text
            x={cx(i) + (i % 2 === 0 ? 14 : -14)}
            y={cy(i) + 4}
            fontSize="11"
            fill="#3f4530"
            textAnchor={i % 2 === 0 ? "start" : "end"}
            fontWeight="600"
          >
            {t.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
