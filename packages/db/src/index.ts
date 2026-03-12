import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sessions, users } from './schema';

export * from './schema';
export { createDb, type Database } from './db';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
