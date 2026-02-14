
const dotenv = require('dotenv');
const { generateLoveReasons } = require('./src/ai/flows/generate-love-reasons-flow');

// Load env vars explicitly for the test script
try {
    dotenv.config();
} catch (e) {
    console.warn("dotenv could not be loaded via require, assuming already loaded");
}

console.log("Checking API Key availability...");
if (process.env.GEMINI_API_KEY) {
    console.log("GEMINI_API_KEY is present (starts with " + (process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 4) : 'undefined') + ")");
} else {
    console.error("GEMINI_API_KEY is MISSING in process.env");
}

async function test() {
    try {
        console.log("Calling generateLoveReasons...");
        // Since it's a server action export, we might need to handle it differently if invoking directly?
        // But in TSX context, it should just execute the function.
        // Wait, 'use server' directives might interfere when running outside Next.js context.
        // Let's see if we can just import the flow definition directly if possible or simulate it.
        // But first, let's just try running it.
        
        const result = await generateLoveReasons({ numReasons: 3 });
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
