import { json } from '@sveltejs/kit';

const FELLES_OKTER_SHEET_URL = "https://docs.google.com/spreadsheets/d/1x826BqPtWSGNR9_6y30Ph2XIOwDb3FmnUZihLGSdeCQ/export?format=csv";

export async function GET() {
    return json({ 
        url: FELLES_OKTER_SHEET_URL 
    });
}