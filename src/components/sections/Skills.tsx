'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bot, Database, Code, Cpu, Brain, Zap, Cloud, Settings } from 'lucide-react';
import Section from '../ui/Section';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('ai');

  const skillCategories = {
    ai: {
      title: 'AI & Agentic Systems',
      icon: Bot,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      skills: [
        { name: 'LangChain', level: 95, description: 'Advanced framework for LLM applications' },
        { name: 'LangGraph', level: 90, description: 'Multi-agent workflow orchestration' },
        { name: 'LangSmith', level: 85, description: 'Debugging and monitoring LLM apps' },
        { name: 'OpenAI API', level: 95, description: 'GPT models and embeddings integration' },
        { name: 'Hugging Face', level: 88, description: 'Model deployment and fine-tuning' },
        { name: 'Vector Databases', level: 92, description: 'Semantic search and retrieval' },
        { name: 'Fine-tuning', level: 82, description: 'Custom model optimization' },
        { name: 'Multi-Agent Architecture', level: 90, description: 'Coordinated AI agent systems' }
      ]
    },
    programming: {
      title: 'Programming & Development',
      icon: Code,
      color: 'text-green-400',
      borderColor: 'border-green-400',
      skills: [
        { name: 'Python', level: 95, description: 'Primary language for AI/ML development' },
        { name: 'JavaScript/TypeScript', level: 85, description: 'Full-stack web development' },
        { name: 'React/Next.js', level: 82, description: 'Modern frontend frameworks' },
        { name: 'FastAPI', level: 90, description: 'High-performance API development' },
        { name: 'Flask', level: 88, description: 'Lightweight web frameworks' },
        { name: 'Git/GitHub', level: 92, description: 'Version control and collaboration' },
        { name: 'Docker', level: 85, description: 'Containerization and deployment' },
        { name: 'REST APIs', level: 90, description: 'API design and integration' }
      ]
    },
    ml: {
      title: 'Machine Learning & Data',
      icon: Brain,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
      skills: [
        { name: 'TensorFlow', level: 85, description: 'Deep learning framework' },
        { name: 'PyTorch', level: 82, description: 'Research-focused ML framework' },
        { name: 'Scikit-learn', level: 90, description: 'Traditional machine learning' },
        { name: 'Pandas/NumPy', level: 92, description: 'Data manipulation and analysis' },
        { name: 'MLOps', level: 88, description: 'ML model deployment and monitoring' },
        { name: 'Streamlit', level: 90, description: 'Rapid ML app development' },
        { name: 'Jupyter', level: 95, description: 'Interactive development environment' },
        { name: 'Data Pipelines', level: 85, description: 'ETL and data processing' }
      ]
    },
    robotics: {
      title: 'Robotics & Mechatronics',
      icon: Cpu,
      color: 'text-teal-400',
      borderColor: 'border-teal-400',
      skills: [
        { name: 'Control Systems', level: 80, description: 'System dynamics and control theory' },
        { name: 'Sensors Integration', level: 85, description: 'Hardware-software interfaces' },
        { name: 'Actuators', level: 78, description: 'Motion control and automation' },
        { name: 'Linux', level: 88, description: 'Real-time systems and embedded computing' },
        { name: 'Mechatronics Design', level: 82, description: 'Interdisciplinary system design' },
        { name: 'ROS (Robot Operating System)', level: 75, description: 'Robotics middleware' },
        { name: 'Embedded Systems', level: 80, description: 'Microcontroller programming' },
        { name: 'CAD/CAM', level: 70, description: 'Mechanical design and manufacturing' }
      ]
    },
    tools: {
      title: 'Tools & Platforms',
      icon: Settings,
      color: 'text-orange-400',
      borderColor: 'border-orange-400',
      skills: [
        { name: 'AWS', level: 82, description: 'Cloud infrastructure and services' },
        { name: 'MongoDB', level: 88, description: 'NoSQL database management' },
        { name: 'Redis', level: 85, description: 'Caching and session management' },
        { name: 'Vercel', level: 90, description: 'Frontend deployment platform' },
        { name: 'VS Code', level: 95, description: 'Development environment' },
        { name: 'Postman', level: 88, description: 'API testing and documentation' },
        { name: 'Figma', level: 75, description: 'UI/UX design and prototyping' },
        { name: 'CI/CD', level: 80, description: 'Automated deployment pipelines' }
      ]
    }
  };

  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

  return (
    <Section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-teal-400 font-mono text-sm uppercase tracking-wider">
          Technical Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
          <span className="gradient-text">Skills &</span>
          <br />
          <span className="text-white">Technologies</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A comprehensive toolkit for building intelligent autonomous systems, 
          from conception to deployment.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => {
          const categoryData = skillCategories[category];
          const isActive = activeCategory === category;
          
          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                isActive
                  ? `${categoryData.borderColor} bg-white/10 text-white`
                  : 'border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <categoryData.icon size={20} className={isActive ? categoryData.color : ''} />
              <span className="font-medium">{categoryData.title}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-dark rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            {/* Skill Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-lg">{skill.name}</h3>
              <span className={`text-sm font-mono ${skillCategories[activeCategory as keyof typeof skillCategories].color}`}>
                {skill.level}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    activeCategory === 'ai' ? 'from-blue-400 to-blue-600' :
                    activeCategory === 'programming' ? 'from-green-400 to-green-600' :
                    activeCategory === 'ml' ? 'from-purple-400 to-purple-600' :
                    activeCategory === 'robotics' ? 'from-teal-400 to-teal-600' :
                    'from-orange-400 to-orange-600'
                  }`}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Specializations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-8">Core Specializations</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Bot,
              title: 'Agentic Systems',
              description: 'Multi-agent architectures that can perceive, reason, and act autonomously',
              color: 'text-blue-400'
            },
            {
              icon: Brain,
              title: 'LLM Applications',
              description: 'Fine-tuned and optimized LLM implementations for specific domains',
              color: 'text-purple-400'
            },
            {
              icon: Cpu,
              title: 'Robotics Integration',
              description: 'Bridging AI with physical systems for real-world applications',
              color: 'text-teal-400'
            },
            {
              icon: Database,
              title: 'Data Pipelines',
              description: 'End-to-end workflows for ingesting, processing, and serving data',
              color: 'text-green-400'
            }
          ].map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <spec.icon className={`w-12 h-12 ${spec.color} mx-auto mb-4`} />
              <h4 className="font-semibold text-white mb-3">{spec.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{spec.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Skills;