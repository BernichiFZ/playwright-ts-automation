# Project Guidelines

## Project

This repository is a TypeScript end-to-end test project using Playwright Test. The system under test is the external Practice Software Testing application at `https://practicesoftwaretesting.com/`; this workspace contains the tests, not that application's source code. Keep tests in `tests/` and use the existing `src/fixtures/`, `src/pages/`, `src/test-data/`, and `src/utils/` areas for shared test code. Tests run against the live site; do not configure a local application server unless the project changes to test a local copy.

## Spec-Driven Changes

- Before implementing a new feature or changing behavior, check for an existing spec under `specs/` and treat its acceptance criteria as the source of truth.
- For a substantial change without a spec, create `specs/<feature-name>.md` before implementation. Include the goal, scope, user scenarios, acceptance criteria, and relevant edge cases; keep small fixes lightweight.
- Map acceptance criteria to Playwright tests where practical. Update the spec when requirements change, and run the narrowest relevant tests followed by `npm test` when appropriate.

## Testing

- Use `@playwright/test` and the shared configuration in `playwright.config.ts`.
- Prefer Playwright's accessible locator APIs (`getByRole`, `getByLabel`, and `getByPlaceholder`) for UI interactions; use CSS or test-id selectors only when an accessible locator is not suitable.
- Run tests with `npm test`; use `npm run test:headed`, `npm run test:ui`, or `npm run test:report` when useful.
- The configured browser project is Chromium. Use `https://practicesoftwaretesting.com/` as the target URL; there is no local application startup command.

## MCP

- Use configured MCP tools only when they are relevant and available. The Playwright MCP server is for browser interaction; use Playwright Test for repeatable automated regression coverage.
- MCP configuration does not imply that a server is connected or running. Do not change `.mcp.json` or `.vscode/mcp.json` unless the task requires it.
