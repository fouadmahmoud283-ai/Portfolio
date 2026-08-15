'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  MessageSquare,
  Tag,
} from 'lucide-react';
import { contactSchema, validateInput } from '@/lib/validations';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: '',
};

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on edit if a submit was already attempted
    if (attemptedSubmit && errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const result = validateInput(contactSchema, formData);
    if (result.success) {
      setErrors({});
      return true;
    }
    setErrors(result.errors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 429) {
        setStatus('error');
        setErrorMessage(
          data?.error || 'Too many requests. Please try again later.'
        );
        return;
      }

      if (response.ok && data?.success) {
        setStatus('success');
        setFormData(initialFormData);
        setErrors({});
        setAttemptedSubmit(false);
        return;
      }

      // Validation errors from server (422) — show inline
      if (data?.errors && typeof data.errors === 'object') {
        setErrors(data.errors);
      }

      setStatus('error');
      setErrorMessage(
        data?.error || 'Something went wrong. Please try again later.'
      );
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error. Please check your connection and try again.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setErrors({});
    setAttemptedSubmit(false);
    setFormData(initialFormData);
  };

  // --- Success state -------------------------------------------------------
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`glass-dark rounded-xl p-8 sm:p-10 text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h4 className="text-2xl font-bold text-white mb-2">
          Message Sent!
        </h4>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Thank you for reaching out. I&apos;ll get back to you as soon as
          possible.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 glass border border-white/20 text-white rounded-lg font-semibold transition-all duration-300 hover:border-white/40"
        >
          <Send size={18} />
          <span>Send another message</span>
        </motion.button>
      </motion.div>
    );
  }

  // --- Form state (idle / submitting / error) ------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`glass-dark rounded-xl p-6 sm:p-8 ${className}`}
    >
      {status === 'error' && errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 flex items-start space-x-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot — hidden from real users, bots fill it */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="mt-1.5 text-sm text-red-400"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 text-sm text-red-400"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Subject
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              autoComplete="off"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          {errors.subject && (
            <p
              id="subject-error"
              role="alert"
              className="mt-1.5 text-sm text-red-400"
            >
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-500 pointer-events-none" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="mt-1.5 text-sm text-red-400"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
          className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;

