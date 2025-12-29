// geminiApi.js
// This module handles the actual interaction with the Gemini API, ensuring
// the API key is retrieved securely from the environment.

import { GoogleGenAI } from '@google/genai';

// Retrieve the API Key from the process environment.
// This relies on server.js having loaded the .env file first.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    // This throws an error if the key is not found, preventing module import.
    throw new Error("Missing GEMINI_API_KEY. Check server.js dotenv config and .env file.");
}

// Initialize the Gemini client
const ai = new GoogleGenAI(apiKey);

/**
* Generates plain text content based on a user prompt and system instruction.
* @param {string} userPrompt - The primary prompt text from the user.
* @param {string} systemInstruction - The persona and rules for the LLM.
* @returns {Promise<string>} The generated text response.
*/
export async function generateContent(userPrompt, systemInstruction) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-09-2025",
            contents: userPrompt,
            config: {
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Text Generation Error:", error.message);
        throw new Error("Failed to generate content from Gemini API.");
    }
}

/**
* Generates content that strictly adheres to a provided JSON schema.
* @param {string} userPrompt - The primary prompt text from the user.
* @param {string} systemInstruction - The persona and rules for the LLM.
* @param {object} responseSchema - The JSON schema for the output.
* @returns {Promise<object>} The parsed JSON object response.
*/
export async function generateStructuredContent(userPrompt, systemInstruction, responseSchema) {
    // Uses the direct fetch API for structured output
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=" + apiKey;

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        },
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
            return JSON.parse(jsonText);
        } else {
            console.error("Gemini Structured Generation Error. API Result:", result);
            throw new Error("API did not return parsable JSON. Check server logs for details.");
        }
    } catch (error) {
        console.error("Gemini Structured Generation Fetch Error:", error.message);
        throw new Error("Failed to connect or process structured content from Gemini API.");
    }
}


 
