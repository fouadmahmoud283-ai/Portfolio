'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Send, MessageCircle, Calendar, Download, Bot, Settings, Cpu, Lightbulb, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Section from '../ui/Section';
import ResumeButton from '../ui/ResumeButton';
import { handleResumeAction } from '@/utils/resumeUtils';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'fouadmahmoud281@gmail.com',
      href: 'mailto:fouadmahmoud281@gmail.com',
      color: 'text-red-400',
      description: 'Best way to reach me for opportunities'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: '@fouadmahmoud281',
      href: 'https://github.com/fouadmahmoud281',
      color: 'text-gray-400',
      description: 'View my code and contributions'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/fouad-mahmoud-2832003/',
      color: 'text-blue-400',
      description: 'Professional networking and updates'
    },
    {
      icon: FileText,
      title: 'Resume',
      value: 'Download CV',
      href: '#',
      color: 'text-green-400',
      description: 'Detailed professional background',
      action: 'resume'
    }
  ];

  const collaborationAreas = [
    {
      title: 'AI & Agentic Systems',
      description: 'Building intelligent autonomous systems using LangChain, LangGraph, and LLMs',
      icon: Bot,
      color: 'text-blue-400',
      keywords: ['Multi-agent systems', 'LangChain', 'LangGraph', 'AI automation']
    },
    {
      title: 'MLOps & Production AI',
      description: 'Deploying and scaling machine learning models in production environments',
      icon: Settings,
      color: 'text-green-400',
      keywords: ['MLOps', 'Model deployment', 'AI infrastructure', 'Production systems']
    },
    {
      title: 'Robotics Integration',
      description: 'Combining AI with physical systems for real-world applications',
      icon: Cpu,
      color: 'text-purple-400',
      keywords: ['Mechatronics', 'Control systems', 'Hardware-software integration', 'IoT']
    },
    {
      title: 'Technical Consulting',
      description: 'Strategic guidance on AI implementation and system architecture',
      icon: Lightbulb,
      color: 'text-orange-400',
      keywords: ['AI strategy', 'System design', 'Technology consulting', 'Team mentoring']
    }
  ];

  const quickActions = [
    {
      title: 'Schedule a Call',
      description: 'Book a 30-minute discussion about your AI project',
      icon: Calendar,
      href: '#',
      color: 'text-blue-400',
      action: 'Schedule'
    },
    {
      title: 'View Portfolio',
      description: 'Explore my projects and technical expertise',
      icon: FileText,
      href: '#projects',
      color: 'text-purple-400',
      action: 'Explore'
    },
    {
      title: 'Download Resume',
      description: 'Get a detailed overview of my experience',
      icon: Download,
      href: '#',
      color: 'text-green-400',
      action: 'Download',
      type: 'resume'
    }
  ];

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Contact form state ──────────────────────────────────────────────
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formValues.name.trim()) next.name = 'Name is required';
    if (!formValues.email.trim()) {
      next.email = 'Email is required';
    } else if (!emailRegex.test(formValues.email)) {
      next.email = 'Please enter a valid email address';
    }
    if (!formValues.subject.trim()) next.subject = 'Subject is required';
    if (!formValues.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: keyof typeof formValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear field-level error and reset success banner once the user starts typing again
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        setStatus('success');
        setFormValues({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        setErrorMessage(
          data?.error || 'Something went wrong. Please try again.',
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <Section id="contact" background="gradient">
      <div className="py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-teal-400 font-mono text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            <span className="gradient-text">Let&apos;s Build</span>
            <br />
            <span className="text-white">Something Amazing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on your next AI project? I&apos;m always excited to work on 
            innovative solutions that push the boundaries of what&apos;s possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <MessageCircle className="mr-3 text-blue-400" />
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.button
                  key={contact.title}
                  onClick={() => {
                    if (contact.action === 'resume') {
                      handleResumeAction('download');
                    } else {
                      window.open(contact.href, contact.href.startsWith('http') ? '_blank' : '_self');
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center space-x-4 p-6 glass-dark rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`p-3 rounded-lg ${contact.color} bg-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <contact.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg mb-1">{contact.title}</h4>
                    <p className={`${contact.color} font-medium mb-1`}>{contact.value}</p>
                    <p className="text-gray-400 text-sm">{contact.description}</p>
                  </div>
                  <Send className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h4 className="text-lg font-semibold text-white mb-6">Quick Actions</h4>
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.title}
                    onClick={() => {
                      if (action.type === 'resume') {
                        handleResumeAction('download');
                      } else if (action.href === '#projects') {
                        scrollToProjects();
                      } else {
                        window.open(action.href, '_blank');
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 glass border border-gray-600 rounded-lg hover:border-gray-400 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                      <div className="text-left">
                        <h5 className="font-medium text-white">{action.title}</h5>
                        <p className="text-sm text-gray-400">{action.description}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${action.color} group-hover:translate-x-1 transition-transform duration-300`}>
                      {action.action} →
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Collaboration Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Collaboration Areas</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              I&apos;m passionate about working on projects that involve cutting-edge AI technologies 
              and real-world applications. Here are areas where I can add the most value:
            </p>

            <div className="space-y-6">
              {collaborationAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-dark rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${area.color} bg-white/10`}>
                      <area.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-lg mb-2">{area.title}</h4>
                      <p className="text-gray-300 mb-4 leading-relaxed">{area.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {area.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2 py-1 text-xs font-mono bg-white/10 rounded text-gray-400"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8 sm:p-10 border border-white/10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center justify-center">
                <Send className="mr-3 text-blue-400" size={28} />
                Send a <span className="gradient-text ml-2">Message</span>
              </h3>
              <p className="text-gray-300 max-w-xl mx-auto">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Status message region (aria-live for screen readers) */}
            <div aria-live="polite" className="mb-6">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 rounded-xl border border-green-500/50 bg-green-500/10"
                >
                  <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                  <p className="text-green-300 font-medium">
                    Message sent! I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 rounded-xl border border-red-500/50 bg-red-500/10"
                >
                  <AlertCircle className="text-red-400 flex-shrink-0" size={24} />
                  <p className="text-red-300 font-medium">{errorMessage}</p>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name & Email — two columns on desktop */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formValues.name}
                      onChange={handleChange('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="Your name"
                      className={`w-full pl-10 pr-4 py-3 glass border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200 ${
                        errors.name ? 'border-red-500/60' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 glass border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200 ${
                        errors.email ? 'border-red-500/60' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p id="contact-email-error" className="mt-2 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject — full width */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formValues.subject}
                    onChange={handleChange('subject')}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    placeholder="What's this about?"
                    className={`w-full pl-10 pr-4 py-3 glass border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200 ${
                      errors.subject ? 'border-red-500/60' : 'border-gray-600'
                    }`}
                  />
                </div>
                {errors.subject && (
                  <p id="contact-subject-error" className="mt-2 text-sm text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message — textarea */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  className={`w-full px-4 py-3 glass border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200 resize-none ${
                    errors.message ? 'border-red-500/60' : 'border-gray-600'
                  }`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-2 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="flex justify-center pt-2">
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.03 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.97 }}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center glass rounded-2xl p-12 border border-white/10"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your AI Project?</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re looking to implement agentic systems, optimize your ML workflows, 
            or integrate AI into your existing products, I&apos;m here to help bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:fouadmahmoud281@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Mail size={20} />
              <span>Send me an email</span>
            </motion.a>
            <motion.a
              href="https://github.com/fouadmahmoud281"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 glass border border-gray-600 text-gray-300 rounded-lg font-semibold transition-all duration-300 hover:border-gray-400 hover:text-white"
            >
              <Github size={20} />
              <span>View my work</span>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-gray-400 text-sm"
          >
            <p>&ldquo;Innovative solutions require dumb mistakes&rdquo; - Let&apos;s make them together! 💡</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;


