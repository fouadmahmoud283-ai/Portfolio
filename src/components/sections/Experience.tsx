'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, GraduationCap, Calendar, MapPin, Star, Award, ChevronRight } from 'lucide-react';
import Section from '../ui/Section';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'AI & Agentic Systems Engineer',
      company: 'Syntera Marketplace',
      location: 'Remote',
      period: 'Present',
      type: 'Full-time',
      status: 'current',
      description: 'Leading the development of autonomous AI systems and multi-agent architectures for production applications.',
      achievements: [
        'Lead engineer on Syntera Code Generation & Marketplace products',
        'Architect multi-agent AI systems using LangChain & LangGraph',
        'Build autonomous workflows with LLMs for complex tasks',
        'Develop data pipelines and vector database solutions',
        'Collaborate with cross-functional teams to deliver production-ready AI applications'
      ],
      technologies: ['LangChain', 'LangGraph', 'LLMs', 'Vector Databases', 'Python', 'FastAPI', 'MLOps'],
      icon: Briefcase,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'AI & Data Science Instructor',
      company: 'Educational Institution',
      location: 'Hybrid',
      period: '1.5 Years',
      type: 'Full-time',
      status: 'completed',
      description: 'Taught fundamentals of robotics, AI, and data science to students and professionals.',
      achievements: [
        'Designed curriculum and hands-on projects for AI/ML courses',
        'Mentored 50+ students on real-world AI applications',
        'Conducted workshops on Python, ML, and AI ethics',
        'Developed practical lab exercises for robotics integration',
        'Created educational content for online learning platforms'
      ],
      technologies: ['Python', 'Jupyter', 'Scikit-learn', 'TensorFlow', 'Robotics', 'Teaching', 'Curriculum Design'],
      icon: Users,
      color: 'text-green-400',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Mechatronics & Robotics Engineering',
      institution: 'University',
      period: 'Current',
      status: 'current',
      description: 'Studying the intersection of mechanical engineering, electronics, and software to build intelligent physical systems.',
      focus: [
        'Control Systems and Automation',
        'Sensor Integration and Signal Processing',
        'Robotics Programming and AI Integration',
        'Mechanical Design and Manufacturing',
        'Embedded Systems Development'
      ],
      icon: GraduationCap,
      color: 'text-purple-400'
    }
  ];

  const certifications = [
    { name: 'LangChain & LangGraph Specialist', issuer: 'Self-Directed Learning', year: '2024' },
    { name: 'MLOps Engineering', issuer: 'Industry Experience', year: '2024' },
    { name: 'Advanced Python for AI/ML', issuer: 'Professional Development', year: '2023' },
    { name: 'AI Ethics & Responsible AI', issuer: 'Teaching Certification', year: '2023' }
  ];

  return (
    <Section id="experience" background="glass">
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
            Professional Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            <span className="gradient-text">Experience &</span>
            <br />
            <span className="text-white">Education</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A journey through AI engineering, teaching, and continuous learning in 
            cutting-edge technologies.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-12 flex items-center"
          >
            <Briefcase className="mr-3 text-blue-400" />
            Professional Experience
          </motion.h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 border-4 border-gray-900 z-10">
                  {exp.status === 'current' && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
                  )}
                </div>

                {/* Experience Card */}
                <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="glass-dark rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${exp.gradient}`}>
                          <exp.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{exp.title}</h4>
                          <p className={`${exp.color} font-medium`}>{exp.company}</p>
                        </div>
                      </div>
                      {exp.status === 'current' && (
                        <span className="px-2 py-1 text-xs font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          CURRENT
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">{exp.type}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-white mb-3 flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-gray-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono bg-white/10 rounded text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-purple-400" />
              Education
            </h3>

            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-xl p-6 mb-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                      <edu.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{edu.degree}</h4>
                      <p className="text-purple-400 font-medium">{edu.institution}</p>
                    </div>
                  </div>
                  {edu.status === 'current' && (
                    <span className="px-2 py-1 text-xs font-bold bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                      CURRENT
                    </span>
                  )}
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{edu.description}</p>

                <div>
                  <h5 className="font-semibold text-white mb-3">Focus Areas</h5>
                  <ul className="space-y-2">
                    {edu.focus.map((area, areaIndex) => (
                      <li key={areaIndex} className="flex items-start space-x-2 text-sm text-gray-300">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications & Learning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Award className="mr-3 text-teal-400" />
              Certifications & Learning
            </h3>

            <div className="space-y-4 mb-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-dark rounded-lg p-4 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{cert.name}</h4>
                      <p className="text-sm text-gray-400">{cert.issuer}</p>
                    </div>
                    <span className="text-teal-400 font-mono text-sm">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continuous Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 border-l-4 border-teal-400"
            >
              <h4 className="font-bold text-white mb-3 flex items-center">
                <Award className="w-5 h-5 text-teal-400 mr-2" />
                Continuous Learning Philosophy
              </h4>
              <p className="text-gray-300 leading-relaxed">
                I believe in staying at the forefront of AI and technology through continuous learning. 
                I regularly explore advancements in AI, LLMs, and agent systems through research papers, 
                courses, and hands-on projects. The rapidly evolving nature of AI requires constant 
                adaptation and learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;