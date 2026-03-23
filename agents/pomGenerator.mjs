/**
 * POM Generator Agent
 * Generates new Page Object Model methods or files following the
 * existing patterns in the Obodux project.
 *
 * Usage: node agents/pomGenerator.mjs "describe what you need"
 *
 * Examples:
 *   node agents/pomGenerator.mjs "new POM method for filling in the GSPR table"
 *   node agents/pomGenerator.mjs "new POM file for the Post Market Surveillance section"
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const request = process.argv[2];
if (!request) {
  console.error(
    'Usage: node agents/pomGenerator.mjs "describe what you need"\n' +
    'Example: node agents/pomGenerator.mjs "POM method for the GSPR compliance table"\n'
  );
  process.exit(1);
}

const prompt = `
You are a Playwright automation expert working on the Obodux medical device compliance project.

First, read the existing POM files in /PomModels/ and Utils files to understand:
- The class structure pattern (constructor with page, methods as async functions)
- How locators are defined (text-based, role-based, CSS selectors)
- How AI-filled fields are handled vs manual inputs
- The saveNcomplete pattern
- How sections are navigated

Then fulfill this request: "${request}"

Rules to follow from the existing codebase:
- Use the same class structure and export pattern as existing POM files
- Prefer text-based and role-based locators over fragile CSS selectors
- Use waitForTimeout sparingly — only where the existing code does
- Add JSDoc comments for each method
- Follow the same naming conventions (camelCase methods, descriptive names)

If generating a new file, show the complete file content.
If generating methods to add to an existing file, specify exactly where to add them.
`;

console.log(`\nGenerating: ${request}\n${"=".repeat(50)}\n`);

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
