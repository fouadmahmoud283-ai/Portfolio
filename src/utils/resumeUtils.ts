/**
 * Utility functions for handling resume download and preview functionality
 */

export const RESUME_FILENAME = "Fouad Resume (1).pdf";
export const RESUME_PATH = `/${RESUME_FILENAME}`;

/**
 * Downloads the resume file with proper naming
 */
export const downloadResume = async () => {
  try {
    const response = await fetch('/api/resume?action=download');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fouad_Mahmoud_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading resume:', error);
    // Fallback to opening the static resume path in a new tab
    window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Opens the resume in a new tab for preview
 */
export const previewResume = () => {
  try {
    window.open('/api/resume?action=preview', '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error previewing resume:', error);
    // Fallback to opening the static resume path in a new tab
    window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Combined function that attempts download first, then preview as fallback
 */
export const handleResumeAction = async (action: 'download' | 'preview' = 'download') => {
  try {
    if (action === 'download') {
      await downloadResume();
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
    const response = await fetch('/api/resume?action=preview', { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Fetches resume download/preview analytics from the backend
 */
export const getResumeAnalytics = async (): Promise<{ downloadCount: number; previewCount: number; lastDownloadedAt: string | null } | null> => {
  try {
    const response = await fetch('/api/resume/analytics');
    if (!response.ok) return null;
    const data = await response.json();
    return data.data || null;
  } catch {
    return null;
  }
};
