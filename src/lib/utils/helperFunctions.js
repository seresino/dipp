import { authHandlers } from "$lib/utils/authHandlers";
import { ENCRYPTION_KEY } from '$env/static/private';

let PUBLIC_DEV_MODE = 'false';
let PUBLIC_TEST_DATE = new Date().toISOString();

try {
    const env = import('$env/static/public');
    PUBLIC_DEV_MODE = env.PUBLIC_DEV_MODE;
    PUBLIC_TEST_DATE = env.PUBLIC_TEST_DATE;
} catch (e) {
    // Environment variables not available, using defaults
    console.log('Using default development settings');
}

// Set default values for when env variables are not present
const isDevelopmentMode = Boolean(JSON.parse(PUBLIC_DEV_MODE ?? 'false'));

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here'; // Must be 32 chars for aes-256-gcm
const ALGORITHM = 'aes-256-gcm';

export function encryptId(text) {
    const iv = randomBytes(16);
    const cipher = createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
}

export function decryptId(text) {
    try {
        const [ivHex, encrypted, authTagHex] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Failed to decrypt ID:', error);
        return '';
    }
} 




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
	const today = isDevelopmentMode ? new Date(PUBLIC_TEST_DATE) : new Date();
	return subtractDatesInDays(today, date);
}

function daysSinceStart() {
	const startDate = new Date("2024-04-12");
	const today = isDevelopmentMode ? new Date(PUBLIC_TEST_DATE) : new Date();
	return subtractDatesInDays(today, startDate);
}

export function getDay(startDate) {
	return daysSince(new Date(startDate)) + 1;
}

export function getModuleID(startDate) {
	return Math.floor(daysSince(new Date(startDate)) / 7) + 1;
}

export function getTodaysDate() {
	const today = isDevelopmentMode ? new Date(PUBLIC_TEST_DATE) : new Date();
	today.setUTCHours(0, 0, 0, 0);
	return today;
}

export { authHandlers };

export function getDefaultRedirect() {
	return "/login";
}
