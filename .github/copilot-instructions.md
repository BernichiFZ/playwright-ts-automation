# Project Guidelines

## Project

This repository is a TypeScript end-to-end test project using Playwright Test. Keep tests in `tests/` and use the existing `src/fixtures/`, `src/pages/`, `src/test-data/`, and `src/utils/` areas for shared test code. Follow existing patterns; do not assume this repository contains the portfolio application or a configured local web server.

## Spec-Driven Changes

- Before implementing a new feature or changing behavior, check for an existing spec under `.github/specs/` and treat its acceptance criteria as the source of truth.
- For a substantial change without a spec, create `.github/specs/<feature-name>.md` before implementation. Include the goal, scope, user scenarios, acceptance criteria, and relevant edge cases; keep small fixes lightweight.
- Map acceptance criteria to Playwright tests where practical. Update the spec when requirements change, and run the narrowest relevant tests followed by `npm test` when appropriate.

## Testing

- Use `@playwright/test` and the shared configuration in `playwright.config.ts`.
- Run tests with `npm test`; use `npm run test:headed`, `npm run test:ui`, or `npm run test:report` when useful.
- The configured browser project is Chromium. The base URL and local web server are not currently configured, so do not invent an application URL or startup command.

## MCP

- Use configured MCP tools only when they are relevant and available. The Playwright MCP server is for browser interaction; use Playwright Test for repeatable automated regression coverage.
- MCP configuration does not imply that a server is connected or running. Do not change `.mcp.json` or `.vscode/mcp.json` unless the task requires it.
