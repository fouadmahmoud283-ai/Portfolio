import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

/** The kicker + display heading + lede block that opens each section. */
export default function SectionHeader({
  kicker,
  title,
  description,
  align = 'center',
  className = '',
}: Props) {
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <Reveal>
        <span className={`kicker ${centered ? 'justify-center' : ''}`}>
          {kicker}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="display mt-5">{title}</h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-lg leading-relaxed text-ink-dim">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
