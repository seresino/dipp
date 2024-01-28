import { writable } from "svelte/store";
import { authHandlers } from "$lib/utils/authHandlers";

// Start date for testing purposes --------------------------------
const startDate = new Date("2024-01-15");
// Todays date for testing purposes --------------------------------
const today = new Date("2024-01-25");

function subtractDatesInDays(date1, date2) {
	date1.setUTCHours(0, 0, 0, 0);
	date2.setUTCHours(0, 0, 0, 0);
	// Calculate the time difference in milliseconds
	const differenceInMilliseconds = date1.getTime() - date2.getTime();

	// Convert milliseconds to days
	const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

	return differenceInDays;
}

function daysSince(date) {
	const today = new Date();
	return subtractDatesInDays(today, date);
}

function daysSinceStart() {
	// Live site will use todays date like below - uncomment this lines --------------------------------
	// return daysSince(startDate)

	return subtractDatesInDays(today, startDate);
}

export function getDay() {
	return daysSinceStart() + 1;
}

export function getModuleID() {
	return Math.floor(daysSinceStart() / 7) + 1;
}

export function getTodaysDate() {
	// const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	return today;
}

// // Date Segments
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
// const day = currentDate.getDate().toString().padStart(2, '0');

// const formattedDate = `${year}-${month}-${day}`;
// const formattedDate2 = currentDate.toLocaleDateString()

export const authStore = writable({
	userID: null,
	user: null,
	data: {},
});

export function setUserID(userID) {
	console.log("AuSt/ ID: " + userID);

	// Maybe try using set, see if its simpler
	// authStore.set({ userID: userID });

	authStore.update(() => {
		return {
			userID: userID,
		};
	});
}

export function getUserID() {
	// Live site will retrieve id from session --------------------------------
	let userID;

	authStore.subscribe((value) => {
		userID = value.userID;
	});
	return userID;
}

export { authHandlers };

import { auth } from "$lib/firebase/firebase";
import { goto } from "$app/navigation";
const nonAuthRoutes = ["/", "/login", "/about"];
export function mount(user, page) {
	console.log("Mounting layout.svelte");
	console.log("user: " + user.username);

	const unsubscribe = auth.onAuthStateChanged(async (user) => {
		const currentPath = page.url.pathname;

		if (!user && !nonAuthRoutes.includes(currentPath)) {
			// window.location.href = "/login";
			goto("/login");
			return;
		}

		if (user && currentPath == "/login") {
			// window.location.href = "/dashboard";
			goto("/dashboard");
			return;
		}

		if (!user) {
			return;
		}

		// Does the order of this need to switch ----------------------------------------------------
		if (user) {
			// Reset authStore on every mount
			console.log("onMount");
		}
	});
}
