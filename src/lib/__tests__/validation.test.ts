import { describe, it, expect } from 'vitest';
import { contactSchema, subscribeSchema } from '@/lib/validation';

describe('contactSchema', () => {
  const validPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Hello there',
    message: 'This is a valid message that is long enough.',
  };

  it('should pass with a valid payload', () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('should fail when name is missing', () => {
    const { name: _unused, ...payloadWithoutName } = validPayload;
    void _unused;
    const result = contactSchema.safeParse(payloadWithoutName);
    expect(result.success).toBe(false);
  });

  it('should fail when name is too short (1 char)', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('should fail when email is invalid', () => {
    const result = contactSchema.safeParse({ ...validPayload, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('should fail when message is too short (under 10 chars)', () => {
    const result = contactSchema.safeParse({ ...validPayload, message: 'short' });
    expect(result.success).toBe(false);
  });

  it('should fail when message is too long (over 2000 chars)', () => {
    const longMessage = 'a'.repeat(2001);
    const result = contactSchema.safeParse({ ...validPayload, message: longMessage });
    expect(result.success).toBe(false);
  });

  it('should fail when subject is too short (under 3 chars)', () => {
    const result = contactSchema.safeParse({ ...validPayload, subject: 'Hi' });
    expect(result.success).toBe(false);
  });
});

describe('subscribeSchema', () => {
  it('should pass with a valid email', () => {
    const result = subscribeSchema.safeParse({ email: 'user@example.com' });
    expect(result.success).toBe(true);
  });

  it('should fail with an invalid email', () => {
    const result = subscribeSchema.safeParse({ email: 'invalid-email' });
    expect(result.success).toBe(false);
  });

  it('should pass with a valid email and source', () => {
    const result = subscribeSchema.safeParse({ email: 'user@example.com', source: 'hero' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe('hero');
    }
  });

  it('should default source to "footer" when not provided', () => {
    const result = subscribeSchema.safeParse({ email: 'user@example.com' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe('footer');
    }
  });
});


