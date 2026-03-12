import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NewUser, users } from '@my-app/db';
import { DbService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async findByEmail(email: string) {
    const rows = await this.dbService.db.select().from(users).where(eq(users.email, email)).limit(1);
    return rows[0] ?? null;
  }

  async findById(id: string) {
    const rows = await this.dbService.db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async create(input: Pick<NewUser, 'name' | 'email' | 'passwordHash'>) {
    const rows = await this.dbService.db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash
      })
      .returning();

    return rows[0] ?? null;
  }
}
