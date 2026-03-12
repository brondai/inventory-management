import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDb } from '@my-app/db';

@Injectable()
export class DbService {
  readonly db;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL is not configured');
    }
    this.db = createDb(connectionString);
  }
}
