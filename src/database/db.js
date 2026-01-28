import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('yuksel.db');

export const initDatabase = async () => {
    try {
        await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY, 
        name TEXT, 
        status TEXT, 
        latitude REAL, 
        longitude REAL, 
        image TEXT
      );

      CREATE TABLE IF NOT EXISTS varieties (
        id TEXT PRIMARY KEY,
        code TEXT,
        name TEXT,
        crop TEXT,
        stock_qty REAL,
        price REAL,
        uom TEXT,
        item_code TEXT
      );

      CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        local_id TEXT, -- UUID for sync
        customer_id TEXT,
        start_time TEXT,
        end_time TEXT,
        status TEXT, -- In Progress, Completed
        summary TEXT,
        outcome TEXT,
        sync_status INTEGER DEFAULT 0,
        server_id TEXT
      );
      
      CREATE TABLE IF NOT EXISTS expense_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL,
        type TEXT,
        payment_source TEXT,
        description TEXT,
        image_uri TEXT,
        date TEXT,
        sync_status INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `);
        console.log('Database initialized');
    } catch (error) {
        console.log('Error initializing database', error);
    }
};

export const getDB = () => db;
