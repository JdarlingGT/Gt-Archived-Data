export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // List of critical environment variables to check
      const requiredEnvVars = [
        'DATABASE_URL',
        'VITE_SUPABASE_URL', 
        'VITE_SUPABASE_ANON_KEY',
        'CORS_ORIGIN',
        'SESSION_SECRET',
        'SUPABASE_JWT_SECRET',
        'DIRECT_URL'
      ];

      // Check presence of each environment variable (never return actual values)
      const envPresent = {};
      requiredEnvVars.forEach(envVar => {
        envPresent[envVar] = !!(process.env[envVar] && process.env[envVar].trim().length > 0);
      });

      // Count how many are present vs total
      const presentCount = Object.values(envPresent).filter(Boolean).length;
      const totalCount = requiredEnvVars.length;

      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        envPresent,
        summary: {
          present: presentCount,
          total: totalCount,
          allPresent: presentCount === totalCount
        }
      });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Health API Error:', error);
    res.status(500).json({ 
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Internal server error' 
    });
  }
}