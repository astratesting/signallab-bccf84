export interface UserWithRelations {
  id: string
  name: string | null
  email: string
  role: 'FREE' | 'PRO' | 'ENTERPRISE'
  predictions: Prediction[]
  watchlist: WatchlistItem[]
}

export interface Prediction {
  id: string
  symbol: string
  signal: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  targetPrice: number
  reasoning: string
  actualReturn: number | null
  createdAt: string
}

export interface WatchlistItem {
  id: string
  symbol: string
  addedAt: string
}
