import { json } from "@sveltejs/kit";
import { seed } from "./seed";

export async function GET() {
	try {
		await seed();
		return json(
			{ message: "Database seeded successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error seeding database:", error);
		return json({ error: "Failed to seed database" }, { status: 500 });
	}
}
