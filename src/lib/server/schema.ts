import {
	boolean,
	timestamp,
	integer,
	pgEnum,
	pgTable,
	serial,
	date,
	uniqueIndex,
	text,
	varchar,
	json,
	PgArray,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 20 }).unique().notNull(),
	start_date: date("start_date").notNull(),
	meditation: boolean("meditation").notNull().default(false),
	high_dosage: boolean("high_dosage").notNull().default(true),
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
	title: varchar("title"),
	prompt: varchar("prompt"),
});

export const questionnaire = pgEnum("questionnaire", [
	"Good",
	"Bad",
	"Neutral",
]);

// Mood Table  - generating fields first...
let fields = { id: serial("id").primaryKey() };
for (let i = 1; i <= 9; i++) {
	fields[`q${i}`] = integer(`q${i}`);
}
fields["q8"] = varchar("q8");
//... then exporting
export const mood = pgTable("mood", fields);
//

export const dailyTasks = pgTable("daily-tasks", {
	id: serial("id").primaryKey(),
	day_number: integer("day_number"),
	date: date("date"),
	user_id: integer("user_id").references(() => users.id),
	journal: varchar("journal"),
	meditation: boolean("meditation"),
	mood_id: integer("mood_id").references(() => mood.id),
});

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	task: varchar("task"),
	time: integer("time"),
	goal: text("goal"),
	background: text("background"),
	materials: text("materials").array(),
	instructions: json("instructions"),
	module_id: integer("module_id").references(() => modules.id),
});

export const weeklyTasks = pgTable("weekly-tasks", {
	id: serial("id").primaryKey(),
	start_timestamp: timestamp("start_timestamp").defaultNow(),
	complete_timestamp: timestamp("complete_timestamp"),
	task_id: integer("task_id").references(() => tasks.id),
	user_id: integer("user_id").references(() => users.id),
});
