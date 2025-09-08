import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  password: text("password").notNull(),
  city: text("city"),
  company: text("company"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const createUserSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  username: true,
});

export const updateWorkInfoSchema = createInsertSchema(users).pick({
  city: true,
  company: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateWorkInfo = z.infer<typeof updateWorkInfoSchema>;
export type User = typeof users.$inferSelect;
