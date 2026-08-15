/**
 * Utility functions for handling resume download and preview functionality.
 *
 * Downloads and previews are routed through the `/api/resume` endpoint so the
 * backend can track requests, enforce rate limits, and set proper headers.
 * If the API is unreachable, every function falls back to serving the static
 * PDF file directly from the public directory.
 */

export const RESUME_FILENAME = "Fouad Resume (1).pdf";
export const RESUME_PATH = `/${RESUME_FILENAME}`;

/** API endpoint that streams the PDF and tracks downloads server-side. */
export const RESUME_API_PATH = '/api/resume';

/** Same endpoint with a query flag so the server returns the PDF inline. */
export const RESUME_PREVIEW_PATH = '/api/resume?preview=true';

/**
 * Triggers a tracked resume download via the API endpoint.
 *
 * Creates a temporary anchor element pointing at the GET `/api/resume`
 * endpoint, which responds with `Content-Disposition: attachment` so the
 * browser downloads the file and the server increments the download counter.
 * Falls back to opening the static PDF in a new tab if the API is unavailable.
 */
export const downloadResume = () => {
  try {
    const link = document.createElement('a');
    link.href = RESUME_API_PATH;
    link.download = 'Fouad_Mahmoud_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Resume download via API failed, falling back to static file:', error);
    window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Opens the resume in a new browser tab for inline preview.
 *
 * Uses the API endpoint with `?preview=true` so the server responds with
 * `Content-Disposition: inline`, allowing the browser's built-in PDF viewer
 * to render the file. Falls back to the static PDF path on error.
 */
export const previewResume = () => {
  try {
    window.open(RESUME_PREVIEW_PATH, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Resume preview via API failed, falling back to static file:', error);
    window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Dispatches to {@link downloadResume} or {@link previewResume} based on the
 * requested action. Signature is intentionally synchronous (`void`) so all
 * existing callers (Hero, Contact, ResumeButton) continue to work unchanged.
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
 * Checks whether the resume endpoint is reachable (for development/debugging).
 * Best-effort — returns `false` on any network error.
 */
export const checkResumeExists = async (): Promise<boolean> => {
  try {
    const response = await fetch(RESUME_API_PATH, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
