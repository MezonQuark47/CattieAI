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
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.status(200).json({ 
      status: 'OK', 
      message: 'Cattie AI Backend is running',
      timestamp: new Date().toISOString(),
      environment: 'vercel'
    });
  } catch (error) {
    console.error('Error in health check:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 