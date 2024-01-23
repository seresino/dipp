import {
	boolean,
	timestamp,
	integer,
	pgEnum,
	pgTable,
	serial,
	date,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 20 }).notNull(),
	password: varchar("password", { length: 20 }).notNull(),
	meditation: boolean("meditation").notNull().default(false),
	high_dosage: boolean("high_dosage").notNull(),
});

export const modules = pgTable("modules", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	instructions: varchar("instructions").notNull(),
	tasks: varchar("tasks").notNull(),
	audio: varchar("audio").notNull(),
});

export const journalPrompts = pgTable("journal-prompts", {
	id: serial("id").primaryKey(),
	content: varchar("instructions").notNull(),
});

export const questionnaire = pgEnum("questionnaire", [
	"Good",
	"Bad",
	"Neutral",
]);

export const mood = pgTable("mood", {
	id: serial("id").primaryKey(),
	q1: questionnaire("q1"),
	q2: questionnaire("q2"),
	q3: questionnaire("q3"),
	q4: questionnaire("q4"),
	q5: questionnaire("q5"),
	q6: questionnaire("q6"),
	q7: questionnaire("q7"),
});

export const dailyTasks = pgTable("daily-tasks", {
	id: serial("id").primaryKey(),
	day_number: integer("day_number"),
	date: date("date"),
	user_id: integer("user_id").references(() => users.id),
	journal: varchar("journal"),
	meditation: boolean("meditation"),
	mood_id: integer("mood_id").references(() => mood.id),
});
