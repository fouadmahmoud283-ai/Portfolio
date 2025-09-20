/**
 * Utility functions for handling resume download and preview functionality
 */

export const RESUME_FILENAME = "Fouad Resume (1).pdf";
export const RESUME_PATH = `/${RESUME_FILENAME}`;

/**
 * Downloads the resume file with proper naming
 */
export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = RESUME_PATH;
  link.download = 'Fouad_Mahmoud_Resume.pdf'; // Clean filename for download
  link.target = '_blank'; // Open in new tab as fallback
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Opens the resume in a new tab for preview
 */
export const previewResume = () => {
  window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
};

/**
 * Combined function that attempts download first, then preview as fallback
 */
export const handleResumeAction = (action: 'download' | 'preview' = 'download') => {
  try {
    if (action === 'download') {
      downloadResume();
    } else {
      previewResume();
    }
  } catch (error) {
    console.error('Error handling resume action:', error);
    // Fallback to simple navigation
    window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Check if resume file exists (for development/debugging)
 */
export const checkResumeExists = async (): Promise<boolean> => {
  try {
    const response = await fetch(RESUME_PATH, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};