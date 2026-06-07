from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import random
from datetime import datetime

app = FastAPI(title="Signal Lab API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    symbol: str

class PredictionResponse(BaseModel):
    symbol: str
    signal: str
    confidence: float
    target_price: float
    reasoning: str
    timestamp: str

# Mock prediction data for supported symbols
MOCK_PREDICTIONS = {
    "AAPL": {
        "signal": "BUY",
        "confidence_range": (82, 92),
        "target_price_range": (190.0, 200.0),
        "reasoning": "Strong iPhone sales momentum, growing services revenue, and positive analyst sentiment."
    },
    "TSLA": {
        "signal": "HOLD",
        "confidence_range": (65, 78),
        "target_price_range": (230.0, 260.0),
        "reasoning": "EV market saturation concerns balanced by autonomous driving progress."
    },
    "MSFT": {
        "signal": "BUY",
        "confidence_range": (88, 95),
        "target_price_range": (410.0, 430.0),
        "reasoning": "Azure cloud dominance, AI integration across product suite."
    },
    "NVDA": {
        "signal": "BUY",
        "confidence_range": (90, 97),
        "target_price_range": (920.0, 980.0),
        "reasoning": "AI chip demand surge, data center expansion, leading ML hardware position."
    },
    "AMZN": {
        "signal": "SELL",
        "confidence_range": (62, 75),
        "target_price_range": (155.0, 175.0),
        "reasoning": "Increased competition in cloud, margin pressure from logistics costs."
    }
}

SUPPORTED_SYMBOLS = list(MOCK_PREDICTIONS.keys())

@app.get("/")
async def root():
    return {
        "name": "Signal Lab API",
        "version": "1.0.0",
        "status": "operational",
        "supported_symbols": SUPPORTED_SYMBOLS
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/predict", response_model=PredictionResponse)
async def generate_prediction(request: PredictionRequest):
    symbol = request.symbol.upper()
    
    if symbol not in MOCK_PREDICTIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported symbol. Supported: {', '.join(SUPPORTED_SYMBOLS)}"
        )
    
    mock = MOCK_PREDICTIONS[symbol]
    confidence = random.uniform(mock["confidence_range"][0], mock["confidence_range"][1])
    target_price = random.uniform(mock["target_price_range"][0], mock["target_price_range"][1])
    
    return PredictionResponse(
        symbol=symbol,
        signal=mock["signal"],
        confidence=round(confidence, 1),
        target_price=round(target_price, 2),
        reasoning=mock["reasoning"],
        timestamp=datetime.now().isoformat()
    )

@app.get("/api/predict/{symbol}", response_model=PredictionResponse)
async def get_prediction(symbol: str):
    request = PredictionRequest(symbol=symbol)
    return await generate_prediction(request)

@app.get("/api/symbols")
async def get_supported_symbols():
    return {
        "symbols": SUPPORTED_SYMBOLS,
        "count": len(SUPPORTED_SYMBOLS)
    }

@app.get("/api/historical/{symbol}")
async def get_historical_predictions(symbol: str, limit: int = 20):
    symbol = symbol.upper()
    
    if symbol not in MOCK_PREDICTIONS:
        raise HTTPException(status_code=400, detail="Unsupported symbol")
    
    historical = []
    mock = MOCK_PREDICTIONS[symbol]
    
    for i in range(min(limit, 10)):
        confidence = random.uniform(mock["confidence_range"][0], mock["confidence_range"][1])
        target_price = random.uniform(mock["target_price_range"][0], mock["target_price_range"][1])
        actual_return = round(random.uniform(-5.0, 15.0), 2) if random.random() > 0.3 else None
        
        historical.append({
            "symbol": symbol,
            "signal": mock["signal"],
            "confidence": round(confidence, 1),
            "target_price": round(target_price, 2),
            "reasoning": mock["reasoning"],
            "created_at": datetime.now().isoformat(),
            "actual_return": actual_return
        })
    
    return {"predictions": historical}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
