import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, QueryResultRow } from 'pg';

// I know that typeORM is somewhat idiomatic for nestjs, but I like as little abstraction as possible
// so I used pg, which gives me more control and more direct access to the database.
// I realize that for bigger projects, something like typeORM may be more appropriate
// as it provides more features and can save some time, but for this project pg is more than enough.
// I guess its like with everything else - 'it depends'. Happy to discuss.

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get('DB_HOST') || 'localhost',
      port: Number(this.configService.get('DB_PORT')) || 5432,
      user: this.configService.get('DB_USER') || 'postgres',
      password: this.configService.get('DB_PASSWORD') || 'postgres',
      database: this.configService.get('DB_NAME') || 'starwars',
    });
  }

  async onModuleInit() {
    try {
      const client = await this.pool.connect();
      client.release();
      console.log('Database connection established');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any,
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }
}
