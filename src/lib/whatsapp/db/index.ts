import { Client } from 'pg';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const client = new Client({
    connectionString: process.env.WHATSAPP_POSTGRES_URL,
});
client.connect();
export const db = drizzle(client);
