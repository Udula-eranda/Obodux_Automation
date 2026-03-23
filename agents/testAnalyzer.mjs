/**
 * Test Analyzer Agent
 * Analyzes Playwright test files and POM models in the Obodux project,
 * reporting on coverage, patterns, and potential issues.
 *
 * Usage: node agents/testAnalyzer.mjs [optional: specific area to analyze]
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const topic = process.argv[2] || "all tests and POM models";

const prompt = `
You are a Playwright test automation expert analyzing the Obodux medical device compliance project.

Analyze the following in the project at ${projectRoot}:
- All files in /tests/ directory (spec files)
- All files in /PomModels/ directory (Page Object Models)
- All files in /Utils/ directory (helper utilities)

For the topic: "${topic}", provide:
1. A summary of what each test file covers
2. Which POM methods are used vs defined (find any gaps)
3. Any hardcoded waits (waitForTimeout) that could be replaced with proper waits
4. Any missing test coverage based on the existing POM methods
5. Suggestions for improvement

Be specific with file names and line numbers.
`;

console.log(`\nAnalyzing: ${topic}\n${"=".repeat(50)}\n`);

for await (const message of query({
  prompt,
  options: {
    cwd: projectRoot,
    allowedTools: ["Read", "Glob", "Grep"],
    maxTurns: 20,
  },
})) {
  if ("result" in message) {
    console.log(message.result);
  }
}
