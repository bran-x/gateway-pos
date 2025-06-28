import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT) || 5432,
            user: process.env.POSTGRES_USER || 'admin',
            password: process.env.POSTGRES_PASSWORD || 'admin',
            database: process.env.POSTGRES_DB || 'gateway_pos',
        },
        migrations: {
            directory: path.join(__dirname, '../../migrations'),
        },
        seeds: {
            directory: path.join(__dirname, '../../seeds'),
        },
    }
};

export default config;