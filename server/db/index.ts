import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TaskManager',
    password: 'password',
    port: 5432,
});

module.exports = {
    query: (text: string, params: any[]) => pool.query(text, params),
}