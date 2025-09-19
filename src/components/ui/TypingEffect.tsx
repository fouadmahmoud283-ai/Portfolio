'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

const TypingEffect = ({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  delayBetweenTexts = 2000,
  className = ''
}: TypingEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[currentTextIndex];

      if (isPaused) {
        setTimeout(() => setIsPaused(false), delayBetweenTexts);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          // Finished typing, start deleting after delay
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isPaused ? delayBetweenTexts : isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, delayBetweenTexts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingEffect;