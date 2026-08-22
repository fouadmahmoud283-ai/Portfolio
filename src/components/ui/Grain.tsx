/**
 * Film-grain overlay.
 *
 * Large flat gradients band badly on 8-bit displays; a touch of noise on top
 * breaks the bands up and gives the dark surfaces some texture.
 */
export default function Grain() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="160" height="160" filter="url(#n)" opacity="0.55"/></svg>`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: '160px 160px',
      }}
    />
  );
}
