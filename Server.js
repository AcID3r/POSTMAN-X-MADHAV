const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Alpha Vantage API key
const API_KEY = '';  // Replace with your Alpha Vantage API key

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Discord bot token and channel ID
const DISCORD_TOKEN = ''; // Replace with your token
const CHANNEL_ID = '';  // Replace with your channel ID

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Variables for current stock symbol and target price
let currentSymbol = 'ZOMATO.BSE';  // Default value, can be overridden
let currentTargetPrice = ;     // Default value, can be overridden

// Function to get stock price from Alpha Vantage
async function getStockPrice(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data['Time Series (Daily)']) {
      throw new Error("API response does not contain 'Time Series (Daily)' data.");
    }

    // Extract the latest available date
    const timeSeries = data['Time Series (Daily)'];
    const latestDate = Object.keys(timeSeries).sort().pop(); // Get the latest date
    const latestData = timeSeries[latestDate];

    const latestPrice = parseFloat(latestData['4. close']);
    return latestPrice;
  } catch (error) {
    console.error('Error fetching stock price:', error);
  }
}

// Function to check stock price and notify Discord
async function checkPrice() {
    while (true) {
        const currentPrice = await getStockPrice(currentSymbol);
        if (currentPrice !== undefined) {
            console.log(`${new Date().toISOString()}: Current price of ${currentSymbol} is ₹${currentPrice}`);
            // Check if the current price meets or exceeds the target price
            if (currentPrice >= currentTargetPrice) {
                // Send notification to Discord
                const channel = await client.channels.fetch(CHANNEL_ID); // Fetch the channel
                if (channel) {
                    channel.send(`Target price reached! Current price of ${currentSymbol} is ₹${currentPrice}`);
                } else {
                    console.error('Channel not found!');
                }
                break; // Exit the loop after notification
            }
        }
        await new Promise(resolve => setTimeout(resolve, 300000));  // Wait for 5 minutes before checking again
    }
}

// API route to set stock symbol and target price from frontend
app.post('/api/set-target', (req, res) => {
    const { symbol, targetPrice } = req.body;
    
    if (symbol && targetPrice) {
        currentSymbol = symbol;
        currentTargetPrice = parseFloat(targetPrice);
        res.json({ message: 'Target price and stock symbol updated.' });

        // Optionally restart checking prices
        checkPrice();
    } else {
        res.status(400).json({ error: 'Symbol and target price are required.' });
    }
});

// Run the Discord bot
client.login(DISCORD_TOKEN);

// Start Express server
app.get('/', (req, res) => {
  res.send('Stock price monitoring bot is running.');
});

app.get('/api/stock-price', async (req, res) => {
  const symbol = req.query.symbol;
  
  if (!symbol) {
    return res.status(400).json({ error: 'Stock symbol is required' });
  }

  try {
    const currentPrice = await getStockPrice(symbol);
    if (!currentPrice) {
      return res.status(404).json({ error: `Could not fetch data for ${symbol}` });
    }

    res.json({ symbol, currentPrice });
  } catch (error) {
    console.error('Error fetching stock price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get company information
app.get('/api/company-info', (req, res) => {
  res.json({ name: 'Zomato', sector: 'Food Delivery' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
