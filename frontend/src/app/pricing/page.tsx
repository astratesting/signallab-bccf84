import Link from 'next/link'
import { Check, X, Zap, Crown, Building } from 'lucide-react'

// Simple static pricing page without framer-motion
const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    icon: Zap,
    color: 'text-gray-400',
    borderColor: 'border-gray-600',
    bgColor: 'bg-gray-900/50',
    features: [
      { text: '5 predictions per day', included: true },
      { text: '3 watchlist stocks', included: true },
      { text: 'Basic signals (BUY/SELL/HOLD)', included: true },
      { text: 'Email support', included: true },
      { text: 'Accuracy tracking', included: false },
      { text: 'Unlimited predictions', included: false },
      { text: 'API access', included: false },
      { text: 'Custom models', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    ctaLink: '/auth/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    icon: Crown,
    color: 'text-cyan-bright',
    borderColor: 'border-cyan-bright',
    bgColor: 'bg-cyan-bright/10',
    features: [
      { text: 'Unlimited predictions', included: true },
      { text: '20 watchlist stocks', included: true },
      { text: 'Advanced AI signals', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Accuracy tracking', included: true },
      { text: 'Prediction history', included: true },
      { text: 'API access', included: false },
      { text: 'Custom models', included: false },
      { text: 'Phone support', included: false },
    ],
    cta: 'Start Free Trial',
    ctaLink: '/auth/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    icon: Building,
    color: 'text-electric-teal',
    borderColor: 'border-electric-teal',
    bgColor: 'bg-electric-teal/10',
    features: [
      { text: 'Unlimited predictions', included: true },
      { text: 'Unlimited watchlist', included: true },
      { text: 'Custom AI models', included: true },
      { text: 'Full API access', included: true },
      { text: 'Accuracy tracking', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom model training', included: true },
      { text: 'Priority phone support', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-ink-black relative">
      <div className="absolute inset-0 beam-effect opacity-10" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12 border-b border-cyan-bright/20">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-cyan-bright rounded-lg flex items-center justify-center">
            <span className="text-ink-black font-bold text-xl font-jetbrains-mono">S</span>
          </div>
          <span className="text-2xl font-bold text-white">Signal Lab</span>
        </Link>
        <Link href="/auth/signin" className="btn-secondary">
          Sign In
        </Link>
      </nav>

      {/* Pricing Header */}
      <section className="relative z-10 px-6 py-20 lg:px-12 text-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Simple, <span className="text-cyan-bright">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your trading style. Upgrade or downgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 px-6 pb-20 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative card-dark p-8 ${
                plan.popular ? 'border-cyan-bright ring-2 ring-cyan-bright/50' : 'border-cyan-bright/20'
              }`}
            >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-bright text-ink-black px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="flex items-center space-x-3 mb-6">
                <plan.icon className={`w-8 h-8 ${plan.color}`} />
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">/{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start space-x-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-cyan-bright flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaLink}
                className={`block text-center py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-indigo-deep/50 text-white border border-cyan-bright/30 hover:bg-cyan-bright/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 bg-indigo-deep/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'Can I change my plan later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.',
              },
              {
                question: 'Is there a free trial for Pro?',
                answer: 'Yes, Pro comes with a 14-day free trial. No credit card required to start.',
              },
              {
                question: 'How accurate are the predictions?',
                answer: 'Our AI models achieve an average accuracy of 87.3%. Accuracy varies by stock and market conditions.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="card-dark p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of traders using Signal Lab to make data-driven decisions.
        </p>
        <Link href="/auth/signup" className="btn-primary text-lg inline-flex items-center">
          Start Your Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 lg:px-12 border-t border-cyan-bright/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
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
