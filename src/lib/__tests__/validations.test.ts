import { describe, it, expect } from 'vitest';
import { contactSchema, resumeRequestSchema, validateInput } from '@/lib/validations';

describe('contactSchema', () => {
  const validInput = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Hello there',
    message: 'This is a test message that is long enough.',
    honeypot: '',
  };

  it('should accept valid contact input', () => {
    const result = validateInput(contactSchema, validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
      expect(result.data.email).toBe('john@example.com');
      expect(result.data.subject).toBe('Hello there');
      expect(result.data.message).toBe('This is a test message that is long enough.');
    }
  });

  it('should accept valid contact input without honeypot field', () => {
    const withoutHoneypot = { ...validInput };
    delete (withoutHoneypot as Partial<typeof validInput>).honeypot;
    const result = validateInput(contactSchema, withoutHoneypot);
    expect(result.success).toBe(true);
  });

  it('should reject name shorter than 2 characters', () => {
    const result = validateInput(contactSchema, { ...validInput, name: 'A' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeDefined();
    }
  });

  it('should reject invalid email', () => {
    const result = validateInput(contactSchema, { ...validInput, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBeDefined();
    }
  });

  it('should reject subject shorter than 3 characters', () => {
    const result = validateInput(contactSchema, { ...validInput, subject: 'Hi' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.subject).toBeDefined();
    }
  });

  it('should reject message shorter than 10 characters', () => {
    const result = validateInput(contactSchema, { ...validInput, message: 'Too short' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.message).toBeDefined();
    }
  });

  it('should reject name longer than 100 characters', () => {
    const result = validateInput(contactSchema, { ...validInput, name: 'A'.repeat(101) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeDefined();
    }
  });

  it('should reject subject longer than 200 characters', () => {
    const result = validateInput(contactSchema, { ...validInput, subject: 'A'.repeat(201) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.subject).toBeDefined();
    }
  });

  it('should reject message longer than 5000 characters', () => {
    const result = validateInput(contactSchema, { ...validInput, message: 'A'.repeat(5001) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.message).toBeDefined();
    }
  });

  it('should reject email longer than 100 characters', () => {
    const longEmail = 'a'.repeat(90) + '@example.com';
    const result = validateInput(contactSchema, { ...validInput, email: longEmail });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBeDefined();
    }
  });
});

describe('validateInput', () => {
  it('should return { success: true, data } for valid input', () => {
    const validInput = {
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'Test subject',
      message: 'This message is long enough for validation.',
    };
    const result = validateInput(contactSchema, validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(expect.objectContaining(validInput));
    }
  });

  it('should return { success: false, errors } with field-keyed messages for invalid input', () => {
    const invalidInput = {
      name: 'A',
      email: 'bad',
      subject: 'Hi',
      message: 'Short',
    };
    const result = validateInput(contactSchema, invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.subject).toBeDefined();
      expect(result.errors.message).toBeDefined();
    }
  });

  it('should flatten Zod errors so each field maps to its FIRST error message only', () => {
    const result = validateInput(contactSchema, {
      name: 'A',
      email: 'a'.repeat(200),
      subject: 'Hi',
      message: 'Short',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(typeof result.errors.name).toBe('string');
      expect(typeof result.errors.email).toBe('string');
      expect(typeof result.errors.subject).toBe('string');
      expect(typeof result.errors.message).toBe('string');
      expect(Array.isArray(result.errors.email)).toBe(false);
    }
  });
});

describe('resumeRequestSchema', () => {
  it('should validate a valid email with optional purpose', () => {
    const result = validateInput(resumeRequestSchema, {
      email: 'recruiter@example.com',
      purpose: 'recruiting',
    });
    expect(result.success).toBe(true);
  });

  it('should validate a valid email without purpose', () => {
    const result = validateInput(resumeRequestSchema, {
      email: 'recruiter@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = validateInput(resumeRequestSchema, {
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBeDefined();
    }
  });

  it('should reject purpose longer than 200 characters', () => {
    const result = validateInput(resumeRequestSchema, {
      email: 'recruiter@example.com',
      purpose: 'A'.repeat(201),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.purpose).toBeDefined();
    }
  });
});


