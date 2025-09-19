'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, FileText, Bot, Cpu, Zap } from 'lucide-react';
import Section from '../ui/Section';
import TypingEffect from '../ui/TypingEffect';

const Hero = () => {
  const typingTexts = [
    "AI & Agentic Systems Engineer",
    "Building Intelligent Autonomous Systems",
    "Orchestrating AI Agents for Real-World Tasks",
    "Mechatronics & Robotics Engineering Student",
  ];

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

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="home" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen pt-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <span className="text-lg text-gray-400 font-mono">Hello, I'm</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Fouad</span>
            <br />
            <span className="text-white">Mahmoud</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl text-gray-300 h-16 md:h-20">
              <TypingEffect 
                texts={typingTexts}
                className="gradient-text-teal font-medium"
              />
            </h2>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8"
          >
            <blockquote className="text-lg text-gray-300 italic border-l-4 border-blue-500 pl-4">
              "Innovative solutions require dumb mistakes" 💡
            </blockquote>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed"
          >
            I architect multi-agent systems using{' '}
            <span className="text-teal-400 font-semibold">LangChain</span>,{' '}
            <span className="text-blue-400 font-semibold">LangGraph</span>, and cutting-edge{' '}
            <span className="text-purple-400 font-semibold">LLMs</span>, combining them with vector databases 
            and robust APIs to create intelligent solutions that can navigate and understand the digital world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 text-center"
            >
              Let's Talk
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex justify-center lg:justify-start space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`text-gray-400 ${social.color} transition-all duration-200 p-3 rounded-full glass hover:bg-white/10`}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Visual Elements */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative max-w-lg mx-auto lg:mx-0"
        >
          {/* Central AI Brain */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Main central circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-blue-500/30"
            />
            
            {/* Inner pulsing core */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
            >
              <Bot size={64} className="text-blue-400" />
            </motion.div>

            {/* Orbiting elements */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 glass rounded-full p-3">
                <Cpu size={24} className="text-teal-400" />
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 glass rounded-full p-3">
                <Zap size={24} className="text-yellow-400" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 glass rounded-full p-3">
                <Bot size={24} className="text-purple-400" />
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 glass rounded-full p-3">
                <Cpu size={24} className="text-green-400" />
              </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + (i * 40)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 max-w-xs"
          >
            {['LangChain', 'LangGraph', 'Python', 'AI/ML'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 2 + index * 0.1 }}
                className="px-3 py-1 text-xs font-mono glass rounded-full text-gray-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <span className="text-sm font-mono mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Hero;