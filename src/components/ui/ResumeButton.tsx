'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, ExternalLink, Loader2 } from 'lucide-react';
import { handleResumeAction } from '@/utils/resumeUtils';

interface ResumeButtonProps {
  variant?: 'primary' | 'secondary' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
  action?: 'download' | 'preview' | 'both';
  showIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ResumeButton = ({
  variant = 'primary',
  size = 'md',
  action = 'download',
  showIcon = true,
  className = '',
  children
}: ResumeButtonProps) => {
  const [loadingAction, setLoadingAction] = useState<'download' | 'preview' | null>(null);

  const handleClick = (actionType: 'download' | 'preview') => {
    setLoadingAction(actionType);
    try {
      handleResumeAction(actionType);
    } catch (error) {
      console.error('Resume action failed:', error);
    } finally {
      // Brief feedback window; the download/preview is fire-and-forget
      setTimeout(() => setLoadingAction(null), 600);
    }
  };

  const getIcon = (actionType: 'download' | 'preview') => {
    if (!showIcon) return null;

    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

    if (loadingAction === actionType) {
      return <Loader2 size={iconSize} className="animate-spin" />;
    }

    switch (actionType) {
      case 'download':
        return <Download size={iconSize} />;
      case 'preview':
        return <Eye size={iconSize} />;
      default:
        return <FileText size={iconSize} />;
    }
  };

  const getBaseClasses = () => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    };

    const variantClasses = {
      'primary': 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg hover:shadow-green-500/25',
      'secondary': 'glass border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white',
      'icon-only': 'p-3 glass rounded-full text-gray-400 hover:text-green-400 hover:bg-white/10'
    };

    return `${sizeClasses[size]} ${variantClasses[variant]} font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2`;
  };

  if (action === 'both') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick('preview')}
          disabled={loadingAction !== null}
          className={getBaseClasses()}
          title="Preview Resume"
        >
          {getIcon('preview')}
          <span>Preview</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick('download')}
          disabled={loadingAction !== null}
          className={getBaseClasses()}
          title="Download Resume"
        >
          {getIcon('download')}
          <span>Download</span>
        </motion.button>
      </div>
    );
  }

  if (variant === 'icon-only') {
    return (
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleClick(action)}
        disabled={loadingAction !== null}
        className={`${getBaseClasses()} ${className}`}
        title={action === 'download' ? 'Download Resume' : 'Preview Resume'}
      >
        {getIcon(action)}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleClick(action)}
      disabled={loadingAction !== null}
      className={`${getBaseClasses()} ${className}`}
      title={action === 'download' ? 'Download Resume' : 'Preview Resume'}
    >
      {getIcon(action)}
      <span>
        {children || (action === 'download' ? 'Download Resume' : 'Preview Resume')}
      </span>
      {action === 'preview' && <ExternalLink size={16} className="ml-1" />}
    </motion.button>
  );
};

export default ResumeButton;
