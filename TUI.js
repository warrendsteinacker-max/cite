// client.js
// Interactive TUI client for running the LLM Orchestration Engine.

import inquirer from 'inquirer';
import fetch from 'node-fetch';

// Define the server connection details
const SERVER_URL = 'http://localhost:3000';

/**
* Fetches the available golden contexts (agents) from the server.
*/
async function getAvailableContexts() {
    // Since we don't have a direct GET endpoint to list contexts,
    // we'll assume the client loads the goldenContext.json locally for display purposes.
    // In a real scenario, the server would expose an endpoint like /contexts
    try {
        const fs = await import('fs');
        const path = await import('path');
        const CONTEXT_FILE = path.resolve(process.cwd(), 'goldenContext.json');
       
        if (!fs.existsSync(CONTEXT_FILE)) {
             console.error("❌ Context file not found locally. Ensure server.js is running and the file exists.");
             return {};
        }

        const data = fs.readFileSync(CONTEXT_FILE, 'utf8');
        const contexts = JSON.parse(data);
       
        const contextMap = {};
        for (const [key, details] of Object.entries(contexts)) {
            contextMap[key] = details.description;
        }
        return contextMap;

    } catch (e) {
        console.error("❌ Failed to read goldenContext.json locally:", e.message);
        return {};
    }
}

/**
* Displays the main menu and handles user input.
*/
async function mainMenu() {
    console.log(`\n======================================================`);
    console.log(`🚀 LLM Orchestrator Engine Client`);
    console.log(`======================================================`);

    const availableContexts = await getAvailableContexts();
    const contextChoices = Object.keys(availableContexts).map(key => ({
        name: `${key}: ${availableContexts[key]}`,
        value: key
    }));

    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'Select an LLM Agent to interact with:',
            choices: [
                ...contextChoices,
                new inquirer.Separator(),
                { name: 'Exit Client', value: 'exit' }
            ],
        },
        {
            type: 'input',
            name: 'prompt',
            message: (answers) => `[${answers.action}] Enter your prompt/text:`,
            when: (answers) => answers.action !== 'exit',
        }
    ];

    const answers = await inquirer.prompt(questions);

    if (answers.action === 'exit') {
        console.log("👋 Shutting down client. Goodbye!");
        process.exit();
    }

    if (answers.action && answers.prompt) {
        console.log(`\n🤖 Running ${answers.action} with prompt: "${answers.prompt.substring(0, 50)}..."`);
        await orchestrateTask(answers.action, answers.prompt);
    }
   
    // Loop back to the main menu
    mainMenu();
}

/**
* Sends the task to the running server orchestration engine.
* @param {string} keyId - The ID of the agent/context to use.
* @param {string} userPrompt - The user's input.
*/
async function orchestrateTask(keyId, userPrompt) {
    try {
        const response = await fetch(`${SERVER_URL}/orchestrate/${keyId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userPrompt })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`\n------------------------------------------------------`);
            console.log(`✅ RESULT [Model: ${data.modelUsed}]`);
            console.log(`------------------------------------------------------`);
           
            // Handle JSON (structured) vs. plain text output
            if (typeof data.response === 'object' && data.response !== null) {
                console.log(JSON.stringify(data.response, null, 2));
            } else {
                console.log(data.response);
            }
            console.log(`------------------------------------------------------\n`);
        } else {
            console.error(`\n❌ SERVER ERROR (${response.status}):`, data.error || 'Unknown error.', data.details);
        }

    } catch (error) {
        console.error('\n❌ FAILED TO CONNECT TO SERVER. Ensure your server.js is running.', error.message);
    }
}

// Start the client application
mainMenu();


 
