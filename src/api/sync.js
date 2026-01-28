import client from './client';
import { getDB } from '../database/db';
import * as SecureStore from 'expo-secure-store';

const db = getDB();

export const syncDown = async () => {
    try {
        // 1. Get Bootstrap Data
        const res = await client.get('/api/method/yuksel_app.api.mobile.get_bootstrap_data');
        const data = res.data.message;

        // 2. Get Customer Map
        const custRes = await client.get('/api/method/yuksel_app.api.mobile.get_customer_map');
        const customers = custRes.data.message;

        // 3. Get Catalog
        const catRes = await client.get('/api/method/yuksel_app.api.mobile.get_product_catalog');
        const catalog = catRes.data.message;

        // Save to SQLite
        await db.withTransactionAsync(async () => {
            // Upsert Customers
            if (customers) {
                for (const c of customers) {
                    await db.runAsync(
                        `INSERT OR REPLACE INTO customers (id, name, status, latitude, longitude, image) VALUES (?, ?, ?, ?, ?, ?)`,
                        [c.id, c.name, c.status, c.latitude, c.longitude, c.image || '']
                    );
                }
            }

            // Upsert Varieties
            if (catalog) {
                for (const v of catalog) {
                    await db.runAsync(
                        `INSERT OR REPLACE INTO varieties (id, code, name, crop, stock_qty, price, uom, item_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        [v.id, v.code, v.name, v.crop, v.stock_qty, v.price, v.uom, v.item_code]
                    );
                }
            }
        });

        return { success: true };
    } catch (e) {
        console.error("Sync Down Error", e);
        return { success: false, error: e.message };
    }
};

export const syncUp = async () => {
    try {
        // 1. Fetch pending visits
        const pendingVisits = await db.getAllAsync(`SELECT * FROM visits WHERE sync_status = 0 AND status = 'Completed'`);

        for (const visit of pendingVisits) {
            // Post to API
            // await client.post(...)
            // Mark as synced
            // await db.runAsync(`UPDATE visits SET sync_status = 1 WHERE id = ?`, [visit.id]);
        }

        return { success: true };
    } catch (e) {
        return { success: false };
    }
};
