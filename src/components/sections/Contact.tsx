'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Send, MessageCircle, Calendar, Download, Bot, Settings, Cpu, Lightbulb } from 'lucide-react';
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