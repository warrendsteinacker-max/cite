// ----------------------------------------------------------------------
// 1. ENVIRONMENT VARIABLE LOADING (MUST BE FIRST)
// This loads GEMINI_API_KEY and other variables from the .env file
// into process.env before the rest of the app loads.
// ----------------------------------------------------------------------
import { config } from 'dotenv';
config();

// ----------------------------------------------------------------------
// 2. DEPENDENCIES AND SETUP
// ----------------------------------------------------------------------
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { generateContent, generateStructuredContent } from './geminiApi.js';

const app = express();
const PORT = process.env.PORT || 3000;
const CONTEXT_FILE = path.resolve(process.cwd(), 'goldenContext.json');

app.use(express.json());

let goldenContexts = {};

// ----------------------------------------------------------------------
// 3. CORE FUNCTIONS
// ----------------------------------------------------------------------

/**
* Loads predefined golden prompts and context templates from the JSON file.
*/
function loadGoldenContexts() {
    if (!fs.existsSync(CONTEXT_FILE)) {
        console.log("🟡 goldenContext.json not found. Creating empty context.");
        goldenContexts = {};
        return;
    }
   
    try {
        const data = fs.readFileSync(CONTEXT_FILE, 'utf8');
        goldenContexts = JSON.parse(data);
        console.log(`✅ Loaded ${Object.keys(goldenContexts).length} Golden Context key(s) from ${CONTEXT_FILE}`);
    } catch (error) {
        console.error("❌ Failed to load goldenContext.json. Exiting:", error.message);
        process.exit(1);
    }
}

/**
* Saves the current state of golden contexts back to the JSON file.
* (Used for 'training' by saving a new agent/context configuration)
*/
function saveGoldenContexts() {
    try {
        fs.writeFileSync(CONTEXT_FILE, JSON.stringify(goldenContexts, null, 2), 'utf8');
        console.log(`💾 Golden Contexts saved to ${CONTEXT_FILE}`);
    } catch (error) {
        console.error("❌ Failed to save goldenContext.json:", error.message);
    }
}

// ----------------------------------------------------------------------
// 4. API ENDPOINTS (The Orchestration Layer)
// ----------------------------------------------------------------------

// Endpoint to save or update a golden context (e.g., training/customizing an agent)
app.post('/save-context', (req, res) => {
    const { keyId, newContext } = req.body;

    if (!keyId || !newContext || !newContext.model) {
        return res.status(400).send({ error: "Missing keyId or valid newContext structure." });
    }

    goldenContexts[keyId] = newContext;
    saveGoldenContexts(); // Persist the change
    res.send({ message: `Context for key '${keyId}' updated successfully.`, context: newContext });
});

// Endpoint to execute a prompt using a specific golden context (AGENT)
app.post('/orchestrate/:keyId', async (req, res) => {
    const { keyId } = req.params;
    const { userPrompt } = req.body;

    const context = goldenContexts[keyId];

    if (!context) {
        return res.status(404).send({ error: `Context key '${keyId}' not found.` });
    }

    try {
        let result;

        // Check if the context requires structured JSON output (like AGENT_JSON_EXTRACTOR)
        if (context.responseSchema) {
            result = await generateStructuredContent(userPrompt, context.systemInstruction, context.responseSchema);
        } else {
            // Default text generation (like AGENT_APA_SYNTHESIS_V1)
            result = await generateContent(userPrompt, context.systemInstruction);
        }

        res.json({
            keyId: keyId,
            modelUsed: context.model,
            response: result
        });

    } catch (error) {
        console.error(`❌ Orchestration Error for key ${keyId}:`, error);
        res.status(500).send({ error: "LLM generation failed.", details: error.message });
    }
});


// ----------------------------------------------------------------------
// 5. SERVER STARTUP
// ----------------------------------------------------------------------

// Execute the function to load context files before starting the server
loadGoldenContexts();

// Check if API key is present after loading .env
if (!process.env.GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not set in the environment. Please check your .env file.");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`🚀 Orchestration Engine running on http://localhost:${PORT}`);
});


 



 