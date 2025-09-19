'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: 'transparent' | 'glass' | 'gradient';
}

const Section = ({ id, children, className = '', background = 'transparent' }: SectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getBackgroundClass = () => {
    switch (background) {
      case 'glass':
        return 'glass rounded-xl border border-white/10';
      case 'gradient':
        return 'bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10';
      default:
        return '';
    }
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen flex items-center justify-center py-20 ${className}`}
    >
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${getBackgroundClass()}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;