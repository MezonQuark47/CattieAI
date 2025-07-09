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
    const { action, data, timestamp } = req.body;
    
    // Log the activity (in production, this would go to a database)
    console.log('Activity tracked:', {
      action,
      data,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: req.headers['user-agent']
    });
    
    res.status(200).json({ 
      success: true,
      message: 'Activity tracked successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in track-activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 