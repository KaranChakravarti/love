
import dotenv from 'dotenv';
import { generateLoveReasons } from './src/ai/flows/generate-love-reasons-flow';

// Load env vars explicitly for the test script
dotenv.config();

console.log("Checking API Key availability...");
if (process.env.GEMINI_API_KEY) {
    console.log("GEMINI_API_KEY is present (starts with " + process.env.GEMINI_API_KEY.substring(0, 4) + ")");
} else {
    console.error("GEMINI_API_KEY is MISSING in process.env");
}

async function test() {
    try {
        console.log("Calling generateLoveReasons...");
        const result = await generateLoveReasons({ numReasons: 3 });
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (error: any) {
        console.error("Test failed:", error);
        if (error.response) {
            console.error("Response data:", await error.response.text());
        }
    }
}

test();
