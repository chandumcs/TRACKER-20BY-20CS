import oracledb from 'oracledb';

// Database configuration
const dbConfig = {
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SID}`,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1,
  poolTimeout: 60,
  stmtCacheSize: 23,
};

let pool: oracledb.Pool | null = null;

// Initialize Oracle client (required for Oracle DB)
export async function initializeOracleClient() {
  try {
    // Auto-detect Oracle Instant Client location
    oracledb.initOracleClient();
    console.log('Oracle client initialized successfully');
  } catch (err: any) {
    console.warn('Oracle client initialization warning:', err.message);
    // Continue even if client initialization has issues
  }
}

// Create connection pool
export async function createPool() {
  try {
    if (!pool) {
      pool = await oracledb.createPool(dbConfig);
      console.log('Oracle Database connection pool created successfully');
      console.log(`Connected to: ${dbConfig.connectString}`);
    }
    return pool;
  } catch (err: any) {
    console.error('Error creating Oracle DB pool:', err);
    throw err;
  }
}

// Get connection from pool
export async function getConnection() {
  try {
    if (!pool) {
      await createPool();
    }
    return await pool!.getConnection();
  } catch (err: any) {
    console.error('Error getting Oracle DB connection:', err);
    throw err;
  }
}

// Test database connection
export async function testConnection() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT SYSDATE FROM DUAL');
    console.log('Database connection test successful:', result.rows);
    return true;
  } catch (err: any) {
    console.error('Database connection test failed:', err);
    return false;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Close pool (for graceful shutdown)
export async function closePool() {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('Oracle Database pool closed');
    }
  } catch (err: any) {
    console.error('Error closing Oracle DB pool:', err);
  }
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await closePool();
  process.exit(0);
});
