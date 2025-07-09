export default function handler(req, res) {
  // CORS headers - Vercel için optimize edilmiş
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, path } = req.body;
    
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }
    
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
      try {
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
      } catch (error) {
        pageType = 'pro_popular';
        welcomeMessage = 'You\'re on Jupiter Pro. Advanced trading tools and analytics.';
      }
    }
    
    res.status(200).json({
      pageType,
      welcomeMessage,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in detect-page:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 