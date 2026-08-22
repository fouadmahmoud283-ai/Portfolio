import type { ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Adds a hairline rule above the section content. */
  divider?: boolean;
};

/**
 * Layout shell for every page section: consistent vertical rhythm, max width,
 * and a scroll-margin that accounts for the fixed navigation bar.
 */
export default function Section({
  id,
  children,
  className = '',
  divider = false,
}: Props) {
  return (
    <section
      id={id}
      className={`relative section-pad scroll-mt-24 ${className}`}
    >
      {divider && (
        <div className="container-x">
          <div className="rule mb-16 sm:mb-24" />
        </div>
      )}
      <div className="container-x">{children}</div>
    </section>
  );
}
