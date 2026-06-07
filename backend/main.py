from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime, timedelta

app = FastAPI(title="Signal Lab API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock stock data
MOCK_STOCKS = {
    "AAPL": {"name": "Apple Inc.", "basePrice": 178.50},
    "TSLA": {"name": "Tesla Inc.", "basePrice": 248.50},
    "MSFT": {"name": "Microsoft Corp.", "basePrice": 378.90},
    "NVDA": {"name": "NVIDIA Corp.", "basePrice": 495.20},
    "AMZN": {"name": "Amazon.com Inc.", "basePrice": 178.25},
}

class Prediction(BaseModel):
    symbol: str
    signal: str  # BUY, SELL, HOLD
    confidence: float
    targetPrice: float
    currentPrice: float
    reasoning: str
    timeHorizon: str
    generatedAt: str

class StockPrice(BaseModel):
    symbol: str
    name: str
    price: float
    change: float
    changePercent: float
    volume: int
    marketCap: str

class WatchlistItem(BaseModel):
    symbol: str
    alertEnabled: bool
    alertThreshold: Optional[float] = None

def generate_prediction(symbol: str) -> Prediction:
    stock = MOCK_STOCKS.get(symbol)
    if not stock:
        raise HTTPException(status_code=404, detail=f"Stock {symbol} not found")

    signals = ["BUY", "SELL", "HOLD"]
    signal = random.choice(signals)
    confidence = round(random.uniform(0.65, 0.95), 2)
    current_price = stock["basePrice"] + random.uniform(-10, 10)
    target_price = current_price * (1 + random.uniform(-0.15, 0.20))

    reasoning_map = {
        "BUY": f"Technical indicators show bullish momentum. RSI at {random.randint(30, 45)} suggests oversold condition. Moving averages aligning for upward trend.",
        "SELL": f"Bearish divergence detected on MACD. Price approaching resistance at ${round(current_price * 1.05, 2)}. Volume declining on recent rallies.",
        "HOLD": f"Stock trading in range between ${round(current_price * 0.97, 2)} and ${round(current_price * 1.03, 2)}. Awaiting catalyst for direction. Neutral sentiment."
    }

    return Prediction(
        symbol=symbol,
        signal=signal,
        confidence=confidence,
        targetPrice=round(target_price, 2),
        currentPrice=round(current_price, 2),
        reasoning=reasoning_map[signal],
        timeHorizon=random.choice(["1 week", "2 weeks", "1 month", "3 months"]),
        generatedAt=datetime.utcnow().isoformat()
    )

@app.get("/")
async def root():
    return {"message": "Signal Lab API", "status": "operational", "version": "1.0.0"}

@app.get("/api/stocks", response_model=List[StockPrice])
async def get_stocks():
    results = []
    for symbol, data in MOCK_STOCKS.items():
        price = data["basePrice"] + random.uniform(-10, 10)
        change = random.uniform(-5, 8)
        change_pct = (change / price) * 100
        results.append(StockPrice(
            symbol=symbol,
            name=data["name"],
            price=round(price, 2),
            change=round(change, 2),
            changePercent=round(change_pct, 2),
            volume=random.randint(10000000, 80000000),
            marketCap=f"${random.randint(500, 3000)}B"
        ))
    return results

@app.get("/api/predictions/{symbol}", response_model=Prediction)
async def get_prediction(symbol: str):
    return generate_prediction(symbol.upper())

@app.get("/api/predictions", response_model=List[Prediction])
async def get_all_predictions():
    return [generate_prediction(symbol) for symbol in MOCK_STOCKS.keys()]

@app.post("/api/watchlist/add")
async def add_to_watchlist(item: WatchlistItem):
    return {"message": f"{item.symbol} added to watchlist", "symbol": item.symbol}

@app.get("/api/watchlist")
async def get_watchlist():
    return {"items": list(MOCK_STOCKS.keys())}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
