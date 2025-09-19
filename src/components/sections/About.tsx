'use client';

import { motion } from 'framer-motion';
import { Bot, Brain, Cpu, Network } from 'lucide-react';
import Section from '../ui/Section';

const About = () => {
  const stats = [
    { icon: Bot, value: "4+", label: "Agentic Systems", color: "text-blue-400" },
    { icon: Brain, value: "6+", label: "Rag Systems", color: "text-green-400" },
    { icon: Network, value: "15+", label: "Multi-Agent Workflows", color: "text-purple-400" },
    { icon: Cpu, value: "∞", label: "Autonomous Decisions", color: "text-teal-400" },
  ];

  const highlights = [
    {
      title: "Agentic Systems Architecture",
      content: "Designing multi-agent systems that can perceive, reason, plan, and act autonomously using LangChain, LangGraph, and LLMs",
      icon: Bot,
      color: "text-blue-400"
    },
    {
      title: "AI Engineering Excellence",
      content: "Building production-ready AI systems with focus on reliability, scalability, and intelligent decision-making capabilities",
      icon: Brain,
      color: "text-green-400"
    },
    {
      title: "Multi-Agent Orchestration",
      content: "Creating coordinated AI agents that collaborate to solve complex problems through advanced workflow orchestration",
      icon: Network,
      color: "text-purple-400"
    },
    {
      title: "Autonomous Intelligence",
      content: "Developing self-improving systems that can adapt, learn, and make decisions without human intervention",
      icon: Cpu,
      color: "text-teal-400"
    }
  ];

  return (
    <Section id="about" background="glass">
      <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-teal-400 font-mono text-sm uppercase tracking-wider"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mt-2 mb-6"
            >
              <span className="gradient-text">Agentic Systems</span>
              <br />
              <span className="text-white">Engineer & AI Architect</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-300 leading-relaxed"
          >
            <p className="text-lg">
              I&apos;m an <span className="text-blue-400 font-semibold">AI & Agentic Systems Engineer</span> at{' '}
              <span className="text-teal-400 font-semibold">Syntera Marketplace</span>, specializing in 
              designing and building <span className="text-purple-400 font-semibold">autonomous AI agents</span> that can 
              perceive, reason, plan, and act to solve complex real-world problems.
            </p>

            <p>
              My expertise lies in <span className="text-green-400 font-semibold">multi-agent orchestration</span> using{' '}
              <span className="text-blue-400 font-semibold">LangChain</span> and{' '}
              <span className="text-purple-400 font-semibold">LangGraph</span>, creating coordinated AI systems 
              that can collaborate, delegate tasks, and make intelligent decisions autonomously. I architect 
              production-ready agentic workflows that scale from simple automation to complex reasoning tasks.
            </p>

            <p>
              Beyond traditional AI development, I focus on{' '}
              <span className="text-orange-400 font-semibold">agentic intelligence</span> - systems that don&apos;t 
              just process data but actively engage with their environment, learn from interactions, and 
              continuously improve their performance. My background in{' '}
              <span className="text-teal-400 font-semibold">Mechatronics & Robotics</span> brings a unique 
              perspective to software-based agents.
            </p>

            <p>
              I&apos;ve successfully deployed <span className="text-yellow-400 font-semibold">4+ production agentic systems</span> 
              including automated code generation platforms, intelligent educational assistants, and financial 
              forecasting agents. Each system demonstrates the power of{' '}
              <span className="text-red-400 font-semibold">autonomous decision-making</span> and{' '}
              <span className="text-blue-400 font-semibold">intelligent automation</span> in solving complex business challenges.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 glass-dark rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className={`${highlight.color} p-3 rounded-lg bg-white/10 group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2 text-lg">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {highlight.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-8 p-6 glass rounded-xl border-l-4 border-teal-400"
          >
            <h3 className="text-xl font-semibold text-white mb-3">Agentic Philosophy</h3>
            <blockquote className="text-gray-300 italic text-lg leading-relaxed">
              &ldquo;True agentic intelligence emerges when systems can not just respond to prompts, 
              but actively pursue goals, adapt to changing environments, and collaborate with other 
              agents to achieve outcomes that exceed the sum of their individual capabilities.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;