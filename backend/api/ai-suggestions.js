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
          icon: '⚡',
          url: '/perps',
          priority: 2
        },
        {
          type: 'info',
          title: 'Set up DCA',
          description: 'Dollar-cost average your investments',
          icon: '🔄',
          url: '/recurring',
          priority: 3
        }
      ];
    } else if (currentPage === 'swap') {
      suggestions = [
        {
          type: 'primary',
          title: 'Popular Tokens',
          description: 'Check out trending tokens on Jupiter Pro',
          icon: '🚀',
          url: '/pro?tab=popular',
          priority: 1
        },
        {
          type: 'secondary',
          title: 'Price Alerts',
          description: 'Set up limit orders for better prices',
          icon: '🔔',
          url: '/trigger',
          priority: 2
        }
      ];
    } else if (currentPage === 'perps') {
      suggestions = [
        {
          type: 'primary',
          title: 'Risk Management',
          description: 'Learn about position sizing and stop losses',
          icon: '⚠️',
          url: '/studio',
          priority: 1
        },
        {
          type: 'secondary',
          title: 'Funding Rates',
          description: 'Monitor funding rates for optimal entry',
          icon: '📊',
          url: '/pro?tab=alphascan',
          priority: 2
        }
      ];
    } else if (currentPage.startsWith('pro_')) {
      suggestions = [
        {
          type: 'primary',
          title: 'Quick Swap',
          description: 'Found an interesting token? Swap instantly',
          icon: '⚡',
          url: '/swap',
          priority: 1
        },
        {
          type: 'secondary',
          title: 'Set Alert',
          description: 'Create price alerts for this token',
          icon: '🔔',
          url: '/trigger',
          priority: 2
        }
      ];
    } else {
      // Default suggestions
      suggestions = [
        {
          type: 'primary',
          title: 'Start Trading',
          description: 'Swap tokens with the best rates',
          icon: '💱',
          url: '/swap',
          priority: 1
        },
        {
          type: 'secondary',
          title: 'Explore Pro',
          description: 'Advanced trading tools and analytics',
          icon: '🔥',
          url: '/pro',
          priority: 2
        }
      ];
    }
    
    res.status(200).json({
      suggestions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in ai-suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 