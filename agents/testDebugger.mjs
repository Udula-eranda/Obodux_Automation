/**
 * Test Debugger Agent
 * Analyzes a failing test and suggests fixes based on the codebase.
 *
 * Usage: node agents/testDebugger.mjs "test file name or error message"
 *
 * Examples:
 *   node agents/testDebugger.mjs "ceComplete.spec.js"
 *   node agents/testDebugger.mjs "cerDocument.spec.js - timeout waiting for selector"
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const issue = process.argv[2];
if (!issue) {
  console.error(
    'Usage: node agents/testDebugger.mjs "test file or error description"\n' +
    'Example: node agents/testDebugger.mjs "ceComplete.spec.js"\n'
  );
  process.exit(1);
}

const prompt = `
You are a Playwright debugging expert working on the Obodux medical device compliance project.

The user reports a problem with: "${issue}"

Steps:
1. Read the relevant test spec file(s) in /tests/
2. Read the corresponding POM model(s) in /PomModels/
3. Read the utility files in /Utils/ that the test uses
4. Read the testData.js to understand test data
5. Identify likely failure points:
   - Selectors that may have changed or are fragile
   - Race conditions (missing waits or wrong wait strategy)
   - Data dependencies between steps
   - Navigation flow issues
6. Provide specific, actionable fixes with the exact code changes needed

Be concrete: show what line to change and what to change it to.
`;

console.log(`\nDebugging: ${issue}\n${"=".repeat(50)}\n`);

for await (const message of query({
  prompt,
  options: {
    cwd: projectRoot,
    allowedTools: ["Read", "Glob", "Grep"],
    maxTurns: 25,
  },
})) {
  if ("result" in message) {
    console.log(message.result);
  }
}
