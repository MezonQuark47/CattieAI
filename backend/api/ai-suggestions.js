module.exports = (req, res) => {
  // CORS headers
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
        title: 'DCA Strategy',
        description: 'Set up recurring buy/sell',
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
}; 