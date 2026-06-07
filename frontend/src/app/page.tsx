'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Brain, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ink-black relative overflow-hidden">
      {/* Beam motif background */}
      <div className="absolute inset-0 beam-effect opacity-30" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-cyan-bright rounded-lg flex items-center justify-center">
            <span className="text-ink-black font-bold text-xl font-jetbrains-mono">S</span>
          </div>
          <span className="text-2xl font-bold text-white">Signal Lab</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth/signin" className="text-gray-300 hover:text-cyan-bright transition-colors">
            Sign In
          </Link>
          <Link href="/auth/signup" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">AI-Powered</span>
            <br />
            <span className="text-cyan-bright glow-text">Stock Predictions</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced machine learning algorithms analyze market data to generate
            buy, sell, and hold signals with confidence scores. Make data-driven
            investment decisions with Signal Lab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary text-lg inline-flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary text-lg inline-flex items-center justify-center">
              View Pricing
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20"
        >
          {[
            { label: 'Predictions Generated', value: '2.4M+' },
            { label: 'Accuracy Rate', value: '87.3%' },
            { label: 'Active Traders', value: '50K+' },
          ].map((stat, i) => (
            <div key={i} className="card-dark p-6 text-center">
              <div className="text-4xl font-bold text-cyan-bright font-jetbrains-mono mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 bg-indigo-deep/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">Why Choose </span>
            <span className="text-cyan-bright">Signal Lab</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Driven Analysis',
                description: 'Deep learning models process millions of data points to generate actionable signals.',
              },
              {
                icon: TrendingUp,
                title: 'Real-Time Signals',
                description: 'Get buy, sell, and hold recommendations with confidence scores updated in real-time.',
              },
              {
                icon: Shield,
                title: 'Risk Management',
                description: 'Built-in risk assessment tools help protect your portfolio from market volatility.',
              },
              {
                icon: Zap,
                title: 'Instant Alerts',
                description: 'Receive notifications when high-confidence predictions match your watchlist.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-dark p-6 hover:border-cyan-bright/40 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-cyan-bright mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders who trust Signal Lab for data-driven insights.
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg inline-flex items-center">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 lg:px-12 border-t border-cyan-bright/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-cyan-bright rounded flex items-center justify-center">
              <span className="text-ink-black font-bold font-jetbrains-mono">S</span>
            </div>
            <span className="font-bold">Signal Lab</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 Signal Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
