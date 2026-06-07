'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Trash2,
  LogOut,
  BarChart3,
  Eye,
  Activity,
} from 'lucide-react'
import { UserWithRelations } from '@/types/user'

interface Prediction {
  id: string
  symbol: string
  signal: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  targetPrice: number
  reasoning: string
  createdAt: string
  actualReturn: number | null
}

interface WatchlistItem {
  id: string
  symbol: string
  addedAt: string
}

interface DashboardClientProps {
  user: UserWithRelations
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [newSymbol, setNewSymbol] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'predictions' | 'watchlist' | 'performance'>('predictions')

  useEffect(() => {
    fetchPredictions()
    fetchWatchlist()
  }, [])

  const fetchPredictions = async () => {
    try {
      const res = await fetch('/api/predictions')
      if (res.ok) {
        const data = await res.json()
        setPredictions(data.predictions)
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error)
    }
  }

  const fetchWatchlist = async () => {
    try {
      const res = await fetch('/api/watchlist')
      if (res.ok) {
        const data = await res.json()
        setWatchlist(data.watchlist)
      }
    } catch (error) {
      console.error('Failed to fetch watchlist:', error)
    }
  }

  const generatePrediction = async (symbol: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/predictions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
      })
      if (res.ok) {
        fetchPredictions()
      }
    } catch (error) {
      console.error('Failed to generate prediction:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWatchlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSymbol.trim()) return

    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: newSymbol.toUpperCase() }),
      })
      if (res.ok) {
        setNewSymbol('')
        fetchWatchlist()
      }
    } catch (error) {
      console.error('Failed to add to watchlist:', error)
    }
  }

  const removeFromWatchlist = async (symbol: string) => {
    try {
      const res = await fetch(`/api/watchlist/${symbol}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchWatchlist()
      }
    } catch (error) {
      console.error('Failed to remove from watchlist:', error)
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BUY': return <TrendingUp className="w-5 h-5 text-green-400" />
      case 'SELL': return <TrendingDown className="w-5 h-5 text-red-400" />
      default: return <Minus className="w-5 h-5 text-yellow-400" />
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY': return 'text-green-400 bg-green-400/10'
      case 'SELL': return 'text-red-400 bg-red-400/10'
      default: return 'text-yellow-400 bg-yellow-400/10'
    }
  }

  const watchlistLimit = user.role === 'FREE' ? 3 : user.role === 'PRO' ? 20 : 100
  const predictionLimit = user.role === 'FREE' ? 5 : 1000

  return (
    <main className="min-h-screen bg-ink-black relative">
      <div className="absolute inset-0 beam-effect opacity-10" />

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-bright/20 bg-indigo-deep/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-cyan-bright rounded-lg flex items-center justify-center">
              <span className="text-ink-black font-bold text-xl font-jetbrains-mono">S</span>
            </div>
            <span className="text-2xl font-bold text-white">Signal Lab</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">
              {user.email}
            </span>
            <span className="px-3 py-1 bg-cyan-bright/20 text-cyan-bright text-xs font-bold rounded-full">
              {user.role}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Predictions</span>
              <BarChart3 className="w-5 h-5 text-cyan-bright" />
            </div>
            <div className="text-3xl font-bold text-white font-jetbrains-mono">
              {predictions.length}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Limit: {user.role === 'FREE' ? '5/day' : 'Unlimited'}
            </div>
          </div>

          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Watchlist Stocks</span>
              <Eye className="w-5 h-5 text-cyan-bright" />
            </div>
            <div className="text-3xl font-bold text-white font-jetbrains-mono">
              {watchlist.length}/{watchlistLimit}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {watchlistLimit === 3 ? 'Upgrade for more' : 'Premium feature'}
            </div>
          </div>

          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Avg. Confidence</span>
              <Activity className="w-5 h-5 text-cyan-bright" />
            </div>
            <div className="text-3xl font-bold text-white font-jetbrains-mono">
              {predictions.length > 0
                ? `${Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length)}%`
                : 'N/A'}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Based on recent predictions
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-indigo-deep/30 p-1 rounded-lg w-fit">
          {(['predictions', 'watchlist', 'performance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-cyan-bright text-ink-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Quick Generate Buttons */}
            <div className="flex flex-wrap gap-3">
              {['AAPL', 'TSLA', 'MSFT', 'NVDA', 'AMZN'].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => generatePrediction(symbol)}
                  disabled={loading}
                  className="btn-secondary text-sm disabled:opacity-50"
                >
                  {loading ? 'Generating...' : `Predict ${symbol}`}
                </button>
              ))}
            </div>

            {/* Predictions List */}
            <div className="space-y-4">
              {predictions.length === 0 ? (
                <div className="card-dark p-8 text-center text-gray-400">
                  No predictions yet. Generate your first prediction above.
                </div>
              ) : (
                predictions.map((pred, i) => (
                  <motion.div
                    key={pred.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card-dark p-6 hover:border-cyan-bright/40 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {getSignalIcon(pred.signal)}
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-xl font-bold text-white font-jetbrains-mono">
                              {pred.symbol}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSignalColor(pred.signal)}`}>
                              {pred.signal}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{pred.reasoning}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-cyan-bright font-jetbrains-mono">
                          {pred.confidence}%
                        </div>
                        <div className="text-sm text-gray-400">
                          Target: ${pred.targetPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(pred.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Watchlist Tab */}
        {activeTab === 'watchlist' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <form onSubmit={addToWatchlist} className="flex gap-3">
              <input
                type="text"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                placeholder="Add stock symbol (e.g., AAPL)"
                className="flex-1 px-4 py-3 bg-ink-black/50 border border-cyan-bright/30 rounded-lg
                         text-white placeholder-gray-500 focus:border-cyan-bright focus:outline-none
                         focus:ring-1 focus:ring-cyan-bright transition-colors font-jetbrains-mono"
                maxLength={5}
              />
              <button
                type="submit"
                disabled={watchlist.length >= watchlistLimit}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add</span>
              </button>
            </form>

            <div className="space-y-3">
              {watchlist.length === 0 ? (
                <div className="card-dark p-8 text-center text-gray-400">
                  Your watchlist is empty. Add stocks to track them.
                </div>
              ) : (
                watchlist.map((item) => (
                  <div key={item.id} className="card-dark p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-white font-jetbrains-mono">
                        {item.symbol}
                      </span>
                      <span className="text-sm text-gray-400">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromWatchlist(item.symbol)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card-dark p-6">
              <h3 className="text-xl font-bold text-white mb-4">Prediction Accuracy</h3>
              {predictions.filter(p => p.actualReturn !== null).length === 0 ? (
                <p className="text-gray-400">
                  No completed predictions yet. Accuracy tracking will appear here once predictions are validated.
                </p>
              ) : (
                <div className="space-y-4">
                  {predictions
                    .filter(p => p.actualReturn !== null)
                    .map((pred) => (
                      <div key={pred.id} className="flex items-center justify-between py-3 border-b border-cyan-bright/10">
                        <div className="flex items-center space-x-4">
                          <span className="font-jetbrains-mono font-bold">{pred.symbol}</span>
                          <span className={`px-2 py-1 rounded text-xs ${getSignalColor(pred.signal)}`}>
                            {pred.signal}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`font-jetbrains-mono ${(pred.actualReturn || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {(pred.actualReturn || 0).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
