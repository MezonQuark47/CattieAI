export default function handler(req, res) {
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
  
  const { walletAddress, pageType, actionType, transactionSignature } = req.body;
  
  // Log to console for now, will save to database later
  console.log('User activity:', {
    walletAddress,
    pageType,
    actionType,
    transactionSignature,
    timestamp: new Date().toISOString()
  });
  
  res.status(200).json({ 
    success: true, 
    message: 'Activity tracked successfully',
    timestamp: new Date().toISOString()
  });
} 