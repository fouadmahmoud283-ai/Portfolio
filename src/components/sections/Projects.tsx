'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Zap, Bot, ShoppingCart, Users, Code, Brain, Database, GraduationCap, TrendingUp } from 'lucide-react';
import Section from '../ui/Section';

const Projects = () => {
  const featuredProjects = [
    {
      id: 1,
      title: 'Syntera Code Generation',
      subtitle: 'PRODUCTION APPLICATION',
      description: 'An advanced agentic system that transforms business ideas into production-ready software applications through AI. This autonomous pipeline handles everything from requirements analysis to code generation, testing, and deployment.',
      longDescription: 'This sophisticated multi-agent system leverages LangChain and LangGraph to create coordinated AI agents that collaborate to solve complex software development challenges. The system can understand business requirements, architect solutions, generate code, run tests, and deploy applications autonomously.',
      technologies: ['LangChain', 'LangGraph', 'LLMs', 'Vector Databases', 'FastAPI', 'CI/CD', 'Python', 'Docker'],
      features: [
        'Multi-agent reasoning - Coordinated AI agents that collaborate to solve complex problems',
        'Spec-to-code generation - Transforms business requirements into working code',
        'Automated testing - Built-in validation and quality assurance',
        'Continuous feedback loops - Learning from user interactions to improve outputs'
      ],
      icon: Bot,
      gradient: 'from-blue-500 to-purple-600',
      status: 'Production',
      impact: 'Enterprise-level code generation platform',
      category: 'Agentic Systems'
    },
    {
      id: 2,
      title: 'Syntera Marketplace',
      subtitle: 'PRODUCTION APPLICATION',
      description: 'A centralized hub for AI/ML tools and resources that empowers engineers to create, train, and deploy machine learning applications and models. This comprehensive platform streamlines the entire ML workflow from data preparation to model serving.',
      longDescription: 'A comprehensive MLOps platform that provides intelligent search and recommendations for AI/ML tools, centralized resource management, streamlined deployment pipelines, and comprehensive analytics. Built with modern web technologies and optimized for scale.',
      technologies: ['MLOps', 'Python', 'Web Scraping', 'Streamlit', 'Vector Search', 'API Integration', 'MongoDB', 'React'],
      features: [
        'AI tool discovery - Intelligent search and recommendations for AI/ML tools',
        'Resource management - Centralized control of AI/ML assets',
        'Model deployment - Streamlined deployment pipelines for ML models',
        'Analytics dashboard - Comprehensive usage and performance metrics'
      ],
      icon: ShoppingCart,
      gradient: 'from-green-500 to-teal-600',
      status: 'Production',
      impact: 'AI/ML tools marketplace platform',
      category: 'MLOps Platform'
    },
    {
      id: 3,
      title: 'Princess Nourah University Agentic System',
      subtitle: 'EDUCATIONAL AI PLATFORM',
      description: 'Comprehensive educational AI system featuring automated quiz generation, intelligent assistant for lecturers and students, and advanced evaluation of student performance with automated grading capabilities.',
      longDescription: 'A sophisticated educational platform that leverages AI to enhance the learning experience through intelligent content generation, personalized assistance, and automated assessment. The system provides real-time support for both educators and students while maintaining comprehensive analytics.',
      technologies: ['LangChain', 'Educational AI', 'NLP', 'Assessment Systems', 'Database Integration', 'Python', 'Machine Learning'],
      features: [
        'Automated quiz generation - AI-powered creation of assessments based on course content',
        'Intelligent assistant - 24/7 support for lecturers and students with contextual help',
        'Performance evaluation - Advanced analytics and automated grading capabilities',
        'Personalized learning - Adaptive content delivery based on student progress'
      ],
      icon: GraduationCap,
      gradient: 'from-indigo-500 to-pink-600',
      status: 'Deployed',
      impact: 'Educational AI transformation platform',
      category: 'Educational Technology'
    },
    {
      id: 4,
      title: 'OptionStrikes Saudi Financial Group AI System',
      subtitle: 'FINANCIAL AI PLATFORM',
      description: 'Advanced agentic system for AI-powered forecasting of stocks and equity shares, integrated with Gumroad API for subscription management and Telegram bot for real-time financial insights.',
      longDescription: 'A comprehensive financial AI platform that combines predictive analytics with subscription management and real-time communication. The system provides sophisticated forecasting models for Saudi financial markets with seamless user experience through multiple channels.',
      technologies: ['Financial AI', 'Forecasting Models', 'Gumroad API', 'Telegram Bot', 'Real-time Analytics', 'Python', 'Time Series Analysis'],
      features: [
        'AI-powered forecasting - Advanced models for stock and equity prediction',
        'Subscription management - Integrated Gumroad API for seamless billing',
        'Real-time insights - Telegram bot for instant financial updates',
        'Market analytics - Comprehensive analysis of Saudi financial markets'
      ],
      icon: TrendingUp,
      gradient: 'from-yellow-500 to-red-600',
      status: 'Production',
      impact: 'Financial forecasting and analytics platform',
      category: 'Financial Technology'
    }
  ];

  const projectCategories = [
    {
      title: 'Autonomous Agent Systems',
      description: 'Multi-agent architectures that can perceive, reason, plan, and act to solve complex tasks with minimal human intervention.',
      icon: Bot,
      color: 'text-blue-400',
      technologies: ['LangChain', 'LangGraph', 'LLMs']
    },
    {
      title: 'LLM-powered Applications',
      description: 'Fine-tuned and optimized LLM implementations for specific domains, with sophisticated prompting strategies.',
      icon: Brain,
      color: 'text-purple-400',
      technologies: ['LangSmith', 'Vector DBs', 'Fine-tuning']
    },
    {
      title: 'Robotics & Mechatronics',
      description: 'Intelligent systems that bridge the gap between software and hardware, combining AI with physical world interaction.',
      icon: Zap,
      color: 'text-teal-400',
      technologies: ['Control Systems', 'Sensors', 'Actuators']
    },
    {
      title: 'AI Data Pipelines',
      description: 'End-to-end data workflows that ingest, process, and transform data for AI/ML applications.',
      icon: Database,
      color: 'text-green-400',
      technologies: ['MLOps', 'Data Engineering', 'Python']
    }
  ];

  return (
    <Section id="projects" background="gradient">
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
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            <span className="gradient-text">Production</span>
            <br />
            <span className="text-white">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-world applications that demonstrate expertise in AI, agentic systems, 
            and production-ready software development.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Visual */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative glass-dark rounded-2xl p-8 ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 rounded-2xl"
                     style={{backgroundImage: `linear-gradient(135deg, ${project.gradient.split(' ')[1]} 0%, ${project.gradient.split(' ')[3]} 100%)`}}
                />
                <div className="relative z-10">
                  {/* Project Icon & Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${project.gradient}`}>
                      <project.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">{project.status}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-white/10 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">PROD</div>
                      <div className="text-xs text-gray-400">Environment</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">AI</div>
                      <div className="text-xs text-gray-400">Powered</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project Details */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {/* Project Badge */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                      {project.subtitle}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h3>

                  {/* Impact */}
                  <p className="text-lg text-gray-400 mb-6 italic">
                    {project.impact}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {project.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            <strong className="text-white">{feature.split(' - ')[0]}</strong>
                            {feature.includes(' - ') && (
                              <span> - {feature.split(' - ')[1]}</span>
                            )}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <ExternalLink size={18} />
                      <span>View Details</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 px-6 py-3 glass border border-gray-600 text-gray-300 rounded-lg font-semibold transition-all duration-300 hover:border-gray-400 hover:text-white"
                    >
                      <Github size={18} />
                      <span>Source Code</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">What I Build</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Specialized in creating intelligent systems across multiple domains
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group text-center"
            >
              <category.icon className={`w-12 h-12 ${category.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
              <h4 className="font-bold text-white mb-3">{category.title}</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{category.description}</p>
              <div className="flex flex-wrap justify-center gap-1">
                {category.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs font-mono bg-white/10 rounded text-gray-400">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;