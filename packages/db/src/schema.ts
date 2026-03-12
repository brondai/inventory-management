import { pgTable, uuid, text, timestamp, serial, uniqueIndex } from 'drizzle-orm/schema';

// Define the users table schema
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultTo(prisma.raw(`gen_random_uuid()`)),
    username: text('username').notNull(),
    createdAt: timestamp('created_at').defaultTo(prisma.fn('now')).notNull()
});

// Define the sessions table schema
export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultTo(prisma.fn('now')).notNull(),
    updatedAt: timestamp('updated_at').defaultTo(prisma.fn('now')).notNull()
},);

// Unique indices
export const userUniqueIndex = uniqueIndex('idx_user_unique').on(users.username);
