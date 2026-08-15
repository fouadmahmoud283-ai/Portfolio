/**
 * Utility functions for handling resume download and preview functionality
 * via the backend API route at /api/resume.
 */

export const RESUME_API = '/api/resume';

/**
 * Downloads the resume file with proper naming via the API.
 */
export const downloadResume = () => {
  try {
    const link = document.createElement('a');
    link.href = `${RESUME_API}?action=download`;
    link.download = 'Fouad_Mahmoud_Resume.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    // Fallback to opening in a new tab
    window.open(`${RESUME_API}?action=download`, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Opens the resume in a new tab for preview via the API.
 */
export const previewResume = () => {
  window.open(`${RESUME_API}?action=preview`, '_blank', 'noopener,noreferrer');
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
    window.open(`${RESUME_API}?action=download`, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Check if resume file exists (for development/debugging)
 */
export const checkResumeExists = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${RESUME_API}?action=stats`, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
};
