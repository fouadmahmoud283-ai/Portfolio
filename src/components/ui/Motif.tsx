'use client';

import { motion } from 'framer-motion';

export type MotifVariant =
  | 'rack'
  | 'graph'
  | 'advisory'
  | 'academy'
  | 'marketplace'
  | 'engine'
  | 'studio'
  | 'impact'
  | 'library';

type Props = {
  variant: MotifVariant;
  accent: string;
  className?: string;
};

/** Shared pulse used across motifs so they feel like one family. */
const pulse = (i: number, total = 6) => ({
  animate: { opacity: [0.25, 1, 0.25] },
  transition: {
    duration: 2.4,
    repeat: Infinity,
    delay: (i % total) * 0.28,
    ease: 'easeInOut' as const,
  },
});

/**
 * Abstract line-art illustrations, one per role and product.
 *
 * These are drawn rather than screenshotted on purpose: the underlying systems
 * are private, and a diagram of what a thing *does* communicates more than a
 * blurred UI capture would.
 */
export default function Motif({ variant, accent, className = '' }: Props) {
  const common = {
    viewBox: '0 0 200 120',
    fill: 'none',
    className: `h-full w-full ${className}`,
    style: { color: accent },
    'aria-hidden': true as const,
  };

  const faint = 'rgba(255,255,255,0.14)';

  switch (variant) {
    // ---------------------------------------------------------------- rack
    case 'rack':
      return (
        <svg {...common}>
          {[0, 1, 2, 3].map((col) => (
            <g key={col} transform={`translate(${26 + col * 40}, 16)`}>
              <rect
                width="28"
                height="88"
                rx="3"
                stroke={faint}
                strokeWidth="1"
              />
              {Array.from({ length: 7 }).map((_, row) => (
                <motion.rect
                  key={row}
                  x="5"
                  y={8 + row * 11}
                  width="18"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  {...pulse(col * 7 + row, 9)}
                />
              ))}
            </g>
          ))}
          {/* Floor line */}
          <path d="M12 110 H188" stroke={faint} strokeWidth="1" />
        </svg>
      );

    // --------------------------------------------------------------- graph
    case 'graph': {
      const nodes = [
        [100, 24],
        [48, 56],
        [152, 56],
        [72, 96],
        [128, 96],
        [100, 60],
      ];
      const edges: [number, number][] = [
        [0, 5],
        [1, 5],
        [2, 5],
        [3, 5],
        [4, 5],
        [1, 3],
        [2, 4],
      ];
      return (
        <svg {...common}>
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="currentColor"
              strokeWidth="1"
              {...pulse(i, 7)}
            />
          ))}
          {nodes.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={i === 5 ? 8 : 5}
              fill={i === 5 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.5"
              {...pulse(i)}
            />
          ))}
        </svg>
      );
    }

    // ------------------------------------------------------------ advisory
    case 'advisory':
      return (
        <svg {...common}>
          {[46, 34, 22].map((r, i) => (
            <motion.circle
              key={r}
              cx="100"
              cy="60"
              r={r}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray={i === 1 ? '4 6' : undefined}
              {...pulse(i, 3)}
            />
          ))}
          <circle cx="100" cy="60" r="5" fill="currentColor" />
          <path
            d="M100 60 L136 34"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {[
            [40, 26],
            [162, 30],
            [46, 96],
            [158, 92],
          ].map(([x, y], i) => (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="10"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1"
              {...pulse(i, 4)}
            />
          ))}
        </svg>
      );

    // ------------------------------------------------------------- academy
    case 'academy':
      return (
        <svg {...common}>
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M40 ${88 - i * 20} L100 ${68 - i * 20} L160 ${88 - i * 20} L100 ${108 - i * 20} Z`}
              stroke="currentColor"
              strokeWidth="1.2"
              fill={i === 2 ? 'currentColor' : 'none'}
              fillOpacity={i === 2 ? 0.15 : 0}
              {...pulse(i, 3)}
            />
          ))}
          <path
            d="M100 28 V16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="13" r="3" fill="currentColor" />
        </svg>
      );

    // --------------------------------------------------------- marketplace
    case 'marketplace':
      return (
        <svg {...common}>
          {Array.from({ length: 12 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const highlight = i === 5 || i === 10;
            return (
              <motion.rect
                key={i}
                x={28 + col * 38}
                y={20 + row * 30}
                width="30"
                height="22"
                rx="3"
                stroke="currentColor"
                strokeWidth="1"
                fill={highlight ? 'currentColor' : 'none'}
                fillOpacity={highlight ? 0.18 : 0}
                {...pulse(i, 8)}
              />
            );
          })}
        </svg>
      );

    // -------------------------------------------------------------- engine
    case 'engine':
      return (
        <svg {...common}>
          {Array.from({ length: 8 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 34 + col * 36;
            const y = 30 + row * 40;
            return (
              <g key={i}>
                <motion.rect
                  x={x}
                  y={y}
                  width="26"
                  height="26"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  {...pulse(i, 8)}
                />
                <rect
                  x={x + 7}
                  y={y + 9}
                  width="12"
                  height="8"
                  rx="1.5"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                {col < 3 && (
                  <line
                    x1={x + 26}
                    y1={y + 13}
                    x2={x + 36}
                    y2={y + 13}
                    stroke={faint}
                    strokeWidth="1"
                  />
                )}
                {row === 0 && (
                  <line
                    x1={x + 13}
                    y1={y + 26}
                    x2={x + 13}
                    y2={y + 40}
                    stroke={faint}
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}
        </svg>
      );

    // -------------------------------------------------------------- studio
    case 'studio':
      return (
        <svg {...common}>
          <rect
            x="26"
            y="18"
            width="148"
            height="84"
            rx="6"
            stroke={faint}
            strokeWidth="1"
          />
          <path d="M26 34 H174" stroke={faint} strokeWidth="1" />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={38 + i * 10}
              cy="26"
              r="2.5"
              fill="currentColor"
              fillOpacity="0.55"
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.rect
              key={i}
              x={40}
              y={46 + i * 11}
              width={[70, 96, 54, 84, 42][i]}
              height="4"
              rx="2"
              fill="currentColor"
              {...pulse(i, 5)}
            />
          ))}
          {/* Branch marker, for the PR the agent opens */}
          <circle cx="152" cy="52" r="4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="152" cy="86" r="4" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M152 56 V82"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
        </svg>
      );

    // -------------------------------------------------------------- impact
    case 'impact':
      return (
        <svg {...common}>
          <path d="M30 100 H176" stroke={faint} strokeWidth="1" />
          <path d="M30 100 V22" stroke={faint} strokeWidth="1" />
          {[38, 56, 30, 72, 50, 86].map((h, i) => (
            <motion.rect
              key={i}
              x={44 + i * 22}
              y={100 - h}
              width="12"
              height={h}
              rx="2"
              fill="currentColor"
              fillOpacity="0.35"
              stroke="currentColor"
              strokeWidth="1"
              {...pulse(i)}
            />
          ))}
          <motion.path
            d="M50 62 L72 44 L94 72 L116 28 L138 50 L160 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
          />
        </svg>
      );

    // ------------------------------------------------------------- library
    case 'library':
      return (
        <svg {...common}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.rect
              key={i}
              x={34 + i * 18}
              y={38 + (i % 2) * 6}
              width="12"
              height={54 - (i % 2) * 6}
              rx="2"
              stroke="currentColor"
              strokeWidth="1.1"
              fill="currentColor"
              fillOpacity={i % 3 === 0 ? 0.2 : 0}
              {...pulse(i)}
            />
          ))}
          <path d="M26 96 H174" stroke={faint} strokeWidth="1" />
          {/* Speech bubble — the librarian half of the product */}
          <path
            d="M124 16 H172 A4 4 0 0 1 176 20 V38 A4 4 0 0 1 172 42 H140 L132 50 V42 H124 A4 4 0 0 1 120 38 V20 A4 4 0 0 1 124 16 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={136 + i * 12}
              cy="29"
              r="2.5"
              fill="currentColor"
              {...pulse(i, 3)}
            />
          ))}
        </svg>
      );

    default:
      return null;
  }
}
