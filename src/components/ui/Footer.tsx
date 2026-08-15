'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUp,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Info,
} from 'lucide-react';

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error' | 'info';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await response.json();

      if (response.ok && (response.status === 201 || response.status === 200)) {
        if (
          response.status === 200 &&
          data.message &&
          data.message.includes('Already subscribed')
        ) {
          setStatus('info');
          setErrorMessage("You're already subscribed! 📬");
        } else {
          setStatus('success');
          setEmail('');
        }
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };
  
  const socialLinks = [
    { 
      href: 'https://github.com/fouadmahmoud281', 
      icon: Github, 
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    { 
      href: 'https://www.linkedin.com/in/fouad-mahmoud-2832003/', 
      icon: Linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      href: 'mailto:fouadmahmoud281@gmail.com', 
      icon: Mail, 
      label: 'Email',
      color: 'hover:text-red-400'
    },
    { 
      href: '/resume.pdf', 
      icon: FileText, 
      label: 'Resume',
      color: 'hover:text-green-400'
    },
  ];

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-900 to-transparent border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text font-mono mb-2">
                &lt;Fouad Mahmoud/&gt;
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                AI & Agentic Systems Engineer passionate about building intelligent autonomous systems 
                that bridge the digital and physical worlds.
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Currently working at:</p>
              <p className="text-teal-400 font-semibold">Obelion.Ai</p>
            </div>

            <blockquote className="text-sm text-gray-400 italic border-l-2 border-blue-500 pl-4">
              &ldquo;Innovative solutions require dumb mistakes&rdquo; 💡
            </blockquote>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center space-x-2 text-gray-400 ${social.color} transition-colors duration-200 text-sm group`}
                >
                  <social.icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-2">Email me directly:</p>
              <a
                href="mailto:fouadmahmoud281@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
              >
                fouadmahmoud281@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Label / Description */}
              <div className="lg:flex-shrink-0 lg:max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail size={20} className="text-blue-400" />
                  <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Subscribe to my newsletter for the latest updates on projects and insights.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 flex-1 lg:max-w-2xl"
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="you@example.com"
                    disabled={status === 'submitting'}
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-white/10 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-colors duration-200 disabled:opacity-50"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.03 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.97 }}
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-purple-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Status Messages */}
            <div aria-live="polite" className="mt-4 min-h-[24px]">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-sm text-green-400"
                >
                  <CheckCircle size={16} />
                  <span>Subscribed! 🎉</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-sm text-red-400"
                >
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
              {status === 'info' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-sm text-teal-400"
                >
                  <Info size={16} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0"
            >
              <span>© {currentYear} Fouad Mahmoud. </span>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
            >
              <span>Back to top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-200" />
            </motion.button>
          </div>
        </div>

      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #3B82F6 0%, transparent 50%), 
                                 radial-gradient(circle at 75% 75%, #8B5CF6 0%, transparent 50%)`,
             }}
        />
      </div>
    </footer>
  );
};

export default Footer;

