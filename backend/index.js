const express = require('express');
const cors = require('cors');
const { createJupiterApiClient } = require('@jup-ag/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Jupiter API client
const jupiterQuoteApi = createJupiterApiClient();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cattie AI Backend is running' });
});

// Sayfa algılama endpoint'i
app.post('/api/detect-page', (req, res) => {
  const { url, path } = req.body;
  
  let pageType = 'unknown';
  let welcomeMessage = '';
  
  if (path.includes('swap') || path === '/') {
    pageType = 'swap';
    welcomeMessage = 'Welcome to Jupiter Swap! Here you can instantly trade between 600+ tokens.';
  } else if (path.includes('perps')) {
    pageType = 'perps';
    welcomeMessage = 'You\'re on Perpetual trading page. Open leveraged positions here.';
  } else if (path.includes('trigger')) {
    pageType = 'trigger';
    welcomeMessage = 'You\'re on Limit order page. Create conditional orders here.';
  } else if (path.includes('recurring')) {
    pageType = 'recurring';
    welcomeMessage = 'You\'re on DCA page. Set up recurring buy/sell strategies.';
  } else if (path.includes('lend')) {
    pageType = 'lend';
    welcomeMessage = 'You\'re on Lending page. Lend your tokens or borrow assets.';
  } else if (path.includes('studio')) {
    pageType = 'studio';
    welcomeMessage = 'You\'re on Studio page. API documentation and developer tools available.';
  } else if (path.includes('pro')) {
    // Pro tabs detection
    const urlObj = new URL(url);
    const tab = urlObj.searchParams.get('tab') || 'popular';
    
    pageType = `pro_${tab}`;
    
    const tabMessages = {
      'cooking': 'You\'re on Jupiter Pro - Cooking section. Discover trending tokens with high momentum.',
      'stocks': 'You\'re on Jupiter Pro - Stocks section. Explore tokenized stocks and traditional assets.',
      'alphascan': 'You\'re on Jupiter Pro - AlphaScan section. Advanced token analytics and screening tools.',
      'launchpads': 'You\'re on Jupiter Pro - Launchpads section. Discover new token launches and IDOs.',
      'toptraded': 'You\'re on Jupiter Pro - Top Traded section. See the most actively traded tokens.',
      'organic': 'You\'re on Jupiter Pro - Organic section. Tokens with genuine organic growth.',
      'popular': 'You\'re on Jupiter Pro - Popular section. Trending tokens in the ecosystem.'
    };
    
    welcomeMessage = tabMessages[tab] || 'You\'re on Jupiter Pro. Advanced trading tools and analytics.';
  }
  
  res.json({
    pageType,
    welcomeMessage,
    timestamp: new Date().toISOString()
  });
});

// Jupiter token info endpoint
app.get('/api/token/:mint', async (req, res) => {
  try {
    const { mint } = req.params;
    
    // Get token info from Jupiter Token API
    const response = await fetch(`https://lite-api.jup.ag/tokens/v1/token/${mint}`);
    const tokenData = await response.json();
    
    res.json(tokenData);
  } catch (error) {
    console.error('Error fetching token info:', error);
    res.status(500).json({ error: 'Failed to fetch token info' });
  }
});

// Real Jupiter Quote API endpoint
app.post('/api/jupiter/quote', async (req, res) => {
  try {
    const { inputMint, outputMint, amount, slippageBps = 50 } = req.body;
    
    // Jupiter Quote API call
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amount.toString(),
      slippageBps: slippageBps.toString(),
    });
    
    const response = await fetch(`https://lite-api.jup.ag/swap/v1/quote?${params}`);
    const quoteData = await response.json();
    
    if (!response.ok) {
      throw new Error(quoteData.error || 'Failed to get quote');
    }
    
    res.json(quoteData);
  } catch (error) {
    console.error('Error fetching Jupiter quote:', error);
    res.status(500).json({ error: 'Failed to get swap quote' });
  }
});

// Jupiter token prices endpoint
app.get('/api/jupiter/prices', async (req, res) => {
  try {
    const { ids } = req.query; // comma-separated token mints
    
    const response = await fetch(`https://lite-api.jup.ag/price/v2?ids=${ids}`);
    const priceData = await response.json();
    
    res.json(priceData);
  } catch (error) {
    console.error('Error fetching Jupiter prices:', error);
    res.status(500).json({ error: 'Failed to get token prices' });
  }
});

// Popular tokens endpoint
app.get('/api/jupiter/tokens', async (req, res) => {
  try {
    // Manual popüler token listesi (daha güvenilir)
    const popularTokens = [
      {
        address: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Solana',
        decimals: 9,
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
      },
      {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
      },
      {
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        symbol: 'RAY',
        name: 'Raydium',
        decimals: 6,
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png'
      },
      {
        address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
        symbol: 'mSOL',
        name: 'Marinade staked SOL',
        decimals: 9,
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png'
      },
      {
        address: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
        symbol: 'JitoSOL',
        name: 'Jito Staked SOL',
        decimals: 9,
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn/logo.png'
      }
    ];
    
    res.json(popularTokens);
  } catch (error) {
    console.error('Error fetching Jupiter tokens:', error);
    res.status(500).json({ error: 'Failed to get token list' });
  }
});

// AI suggestions endpoint
app.post('/api/ai-suggestions', async (req, res) => {
  const { actionType, currentPage, userProfile } = req.body;
  
  // Simple rule-based suggestions (will be replaced with AI later)
  let suggestions = [];
  
  if (actionType === 'swap_completed' && currentPage === 'swap') {
    suggestions = [
      {
        type: 'primary',
        title: 'Explore Jupiter Pro',
        description: 'Discover trending tokens and advanced analytics',
        icon: '🔥',
        url: '/pro?tab=cooking',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Perps Trading',
        description: 'Open leveraged positions',
        icon: '📈',
        url: '/perps',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'Set up DCA',
        description: 'Create recurring buy strategy',
        icon: '🔄',
        url: '/recurring',
        priority: 3
      }
    ];
  } else if (actionType === 'perp_opened' && currentPage === 'perps') {
    suggestions = [
      {
        type: 'primary',
        title: 'Set Stop-Loss',
        description: 'Create stop-loss on Trigger for risk management',
        icon: '🛡️',
        url: '/trigger',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Portfolio Analysis',
        description: 'Check your risk analysis',
        icon: '📊',
        url: '/portfolio',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'Optimize Collateral',
        description: 'Optimize collateral on Lend',
        icon: '💰',
        url: '/lend',
        priority: 3
      }
    ];
  } else if (actionType === 'trigger_created' && currentPage === 'trigger') {
    suggestions = [
      {
        type: 'primary',
        title: 'DCA Strategy',
        description: 'Set up recurring DCA for regular purchases',
        icon: '🔄',
        url: '/recurring',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Perps Hedge',
        description: 'Use Perps to hedge your position',
        icon: '📈',
        url: '/perps',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'Portfolio Tracking',
        description: 'Track your orders in portfolio',
        icon: '📊',
        url: '/portfolio',
        priority: 3
      }
    ];
  } else if (actionType === 'dca_created' && currentPage === 'recurring') {
    suggestions = [
      {
        type: 'primary',
        title: 'Set Stop-Loss',
        description: 'Create automatic stop-loss on Trigger',
        icon: '🛡️',
        url: '/trigger',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Earn on Lend',
        description: 'Lend your accumulated tokens',
        icon: '💰',
        url: '/lend',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'Perps Leverage',
        description: 'Scale your position with leverage',
        icon: '📈',
        url: '/perps',
        priority: 3
      }
    ];
  } else if (actionType === 'lend_deposit' && currentPage === 'lend') {
    suggestions = [
      {
        type: 'primary',
        title: 'Scale with DCA',
        description: 'Set up recurring DCA for continuous lending',
        icon: '🔄',
        url: '/recurring',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Perps Collateral',
        description: 'Use lend position as collateral on Perps',
        icon: '📈',
        url: '/perps',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'Portfolio Management',
        description: 'Check your risk analysis',
        icon: '📊',
        url: '/portfolio',
        priority: 3
      }
    ];
  } else if (actionType === 'api_key_created' && currentPage === 'studio') {
    suggestions = [
      {
        type: 'primary',
        title: 'Join Community',
        description: 'Connect with Jupiter developers',
        icon: '🤝',
        url: '/community',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Developer Discord',
        description: 'Join the developer community',
        icon: '💬',
        url: '/discord',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'Test Swap',
        description: 'Test your API with a swap',
        icon: '🔄',
        url: '/swap',
        priority: 3
      }
    ];
  } else if (actionType === 'pro_token_analyzed' && currentPage.startsWith('pro_')) {
    suggestions = [
      {
        type: 'primary',
        title: 'Swap This Token',
        description: 'Trade this token on Jupiter Swap',
        icon: '🔄',
        url: '/swap',
        priority: 1
      },
      {
        type: 'secondary',
        title: 'Set Price Alert',
        description: 'Create trigger order for this token',
        icon: '🔔',
        url: '/trigger',
        priority: 2
      },
      {
        type: 'tertiary',
        title: 'DCA Strategy',
        description: 'Set up recurring buy for this token',
        icon: '📈',
        url: '/recurring',
        priority: 3
      }
    ];
  }
  
  res.json({
    suggestions,
    timestamp: new Date().toISOString()
  });
});

// User activity tracking endpoint
app.post('/api/track-activity', (req, res) => {
  const { walletAddress, pageType, actionType, transactionSignature } = req.body;
  
  // Log to console for now, will save to database later
  console.log('User activity:', {
    walletAddress,
    pageType,
    actionType,
    transactionSignature,
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Cattie AI Backend server running on port ${PORT}`);
}); 