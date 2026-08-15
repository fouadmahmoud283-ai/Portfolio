import { z, type ZodSchema } from 'zod';

/**
 * Contact form validation schema.
 * The `honeypot` field is a spam-protection measure — it must be empty.
 * Bots tend to fill all fields; real users never see it (hidden via CSS).
 */
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Please enter a valid email address').max(100, 'Email must not exceed 100 characters'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must not exceed 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must not exceed 5000 characters'),
  honeypot: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Resume download request validation schema.
 * `purpose` is optional context (e.g. "recruiter", "collaboration").
 */
export const resumeRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(100, 'Email must not exceed 100 characters'),
  purpose: z.string().max(200, 'Purpose must not exceed 200 characters').optional(),
});

export type ResumeRequestInput = z.infer<typeof resumeRequestSchema>;

/**
 * Generic validation helper that returns a discriminated union:
 * - On success: `{ success: true, data: T }`
 * - On failure:  `{ success: false, errors: Record<string, string> }`
 *
 * The error map is flattened so each field name maps to its first error message,
 * making it easy to display inline errors in forms.
 */
export function validateInput<T>(
  schema: ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field !== undefined && !(field in errors)) {
      errors[String(field)] = issue.message;
    }
  }

  return { success: false, errors };
}

