'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function StockPriceViewer() {
  const [symbol, setSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState(null);
  const [targetPrice, setTargetPrice] = useState(''); // New state for target price
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSetTarget = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send the symbol and target price to the server
      await axios.post('http://localhost:3000/api/set-target', {
        symbol,
        targetPrice
      });
      console.log('Target price and symbol set successfully');
    } catch (err) {
      setError('Error setting target price. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  const handleFetchPrice = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/stock-price`, {
        params: { symbol },
      });
      setStockPrice(response.data.currentPrice);
      console.log('response.data.currentPrice:' + response.data.currentPrice);
    } catch (err) {
      setError('Error fetching stock price. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="background">
        <div className="dots"></div>
        <div className="dots"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="title-card">
          <h1>Stock Price Viewer</h1>
          <div className="select-wrapper">
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            >
              <option value="">Select a stock</option>
              <option value="HDFCBANK.BSE">HDFC.BSE - HDFC Bank</option>
              <option value="RELIANCE.BSE">RELIANCE - Reliance Industries</option>
              <option value="TCS.BSE">TCS - Tata Consultancy Services</option>
              <option value="INFY.BSE">INFY - Infosys</option>
              <option value="ICICIBANK.BSE">ICICIBANK - ICICI Bank</option>
            </select>
          </div>

          <div className="input-wrapper">
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Enter Target Price"
            />
          </div>

          <button onClick={handleSetTarget} disabled={!symbol || !targetPrice || loading}>
            {loading ? 'Setting Target...' : 'Set Target Price'}
          </button>

          <button onClick={handleFetchPrice} disabled={!symbol || loading}>
            {loading ? 'Fetching...' : 'Get Price'}
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {stockPrice && (
            <div id="stockInfo">
              <h2 id="stockName">{symbol}</h2>
              <p id="stockPrice">₹{stockPrice}</p>
            </div>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          height: 100%;
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #1a202c, #2d3748);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px);
          background-size: 20px 20px;
          mask-image: linear-gradient(to bottom, white, transparent);
        }

        .dots:last-child {
          animation: moveBackground 8s linear infinite;
        }

        @keyframes moveBackground {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-20px, -20px); }
        }

        .card {
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          width: 100%;
          max-width: 24rem;
          position: relative;
          z-index: 10;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s ease-out forwards;
        }

        .title-card {
          background-color: rgba(255, 255, 255, 0.85);
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-align: center;
          color: #1a202c;
        }

        .select-wrapper, .input-wrapper {
          margin-bottom: 1rem;
        }

        select, input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          background-color: white;
          font-size: 1rem;
          color: black;
        }

        button {
          width: 100%;
          padding: 0.5rem;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 1rem; // Added margin for spacing
        }

        button:hover {
          background-color: #3182ce;
        }

        button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }

        #stockInfo {
          background-color: #f7fafc;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 1rem;
        }

        #stockInfo h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 0.5rem 0;
        }

        #stockInfo p {
          font-size: 1.5rem;
          font-weight: bold;
          color: #38a169;
          margin: 0;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
