import { json } from '@sveltejs/kit';

const FELLES_OKTER_SHEET_URL = process.env.FELLES_OKTER_SHEET_URL;

if (!FELLES_OKTER_SHEET_URL) {
    throw new Error('FELLES_OKTER_SHEET_URL environment variable is not set');
}

export async function GET() {
    return json({ 
        url: FELLES_OKTER_SHEET_URL 
    });
}