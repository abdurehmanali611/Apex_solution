import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'apex_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Database initialization
const initializeDatabase = async () => {
  const connection = await pool.getConnection();
  
  try {
    console.log('📦 Initializing database tables...');
    
    // Create tables if they don't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS HeroFooter (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        amount INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ HeroFooter table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        icon VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Services table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        link VARCHAR(500),
        type VARCHAR(100),
        image VARCHAR(500),
        duration INT,
        version INT,
        special BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Portfolio table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        source VARCHAR(255),
        date DATETIME,
        link VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Blogs table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        profession VARCHAR(255),
        image VARCHAR(500),
        content TEXT,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Testimonials table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Partner (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Partner table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        image VARCHAR(500),
        title VARCHAR(255),
        description TEXT,
        facebook VARCHAR(500),
        instagram VARCHAR(500),
        linkedin VARCHAR(500),
        telegram VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Teams table created/verified');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Contacts table created/verified');

    // Insert default hero footer data
    const [heroFooterRows] = await connection.query('SELECT COUNT(*) as count FROM HeroFooter');
    if (heroFooterRows[0].count === 0) {
      await connection.query(`
        INSERT INTO HeroFooter (name, amount) VALUES 
        ('projects', 0),
        ('clients', 0),
        ('awards', 0),
        ('experience', 0)
      `);
      console.log('✅ Default hero footer data inserted');
    } else {
      console.log('✅ HeroFooter data already exists');
    }

    // Insert default admin user (password: admin123)
    // FIX: Use parameterized query to properly handle string values
    const [userRows] = await connection.query('SELECT COUNT(*) as count FROM Users WHERE username = ?', ['admin']);
    if (userRows[0].count === 0) {
      // Dynamically import bcrypt
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash('admin123', 10);
      await connection.query(
        'INSERT INTO Users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      console.log('✅ Default admin user created (username: admin, password: admin123)');
    } else {
      console.log('✅ Admin user already exists');
    }

    console.log('🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Database query functions
const db = {
  query: async (sql, params = []) => {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  queryOne: async (sql, params = []) => {
    try {
      const [rows] = await pool.query(sql, params);
      return rows[0] || null;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  execute: async (sql, params = []) => {
    try {
      const [result] = await pool.query(sql, params);
      return result;
    } catch (error) {
      console.error('Database execute error:', error);
      throw error;
    }
  },

  getConnection: () => pool.getConnection(),

  // Helper methods for common operations
  insert: async (table, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    const result = await db.execute(sql, values);
    return { id: result.insertId, ...data };
  },

  update: async (table, id, data) => {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    const sql = `UPDATE ${table} SET ${updates} WHERE id = ?`;
    await db.execute(sql, values);
    return { id, ...data };
  },

  delete: async (table, id) => {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    await db.execute(sql, [id]);
    return { success: true, id };
  },

  findAll: async (table, conditions = {}, orderBy = 'created_at DESC') => {
    let sql = `SELECT * FROM ${table}`;
    const params = [];
    
    if (Object.keys(conditions).length > 0) {
      const whereClauses = Object.keys(conditions).map(key => `${key} = ?`);
      sql += ` WHERE ${whereClauses.join(' AND ')}`;
      params.push(...Object.values(conditions));
    }
    
    if (orderBy) {
      sql += ` ORDER BY ${orderBy}`;
    }
    
    return await db.query(sql, params);
  },

  findById: async (table, id) => {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    return await db.queryOne(sql, [id]);
  },

  findOne: async (table, conditions) => {
    const keys = Object.keys(conditions);
    const values = Object.values(conditions);
    const whereClauses = keys.map(key => `${key} = ?`).join(' AND ');
    const sql = `SELECT * FROM ${table} WHERE ${whereClauses} LIMIT 1`;
    return await db.queryOne(sql, values);
  }
};

export { db, testConnection, initializeDatabase };