# Playwright TypeScript Tests

End-to-end test project using Playwright Test and TypeScript.

## Setup

```powershell
npm install
npx playwright install chromium
```

## Run

```powershell
npm test
npm run test:headed
npm run test:ui
npm run test:report
```

Tests live in `tests/`. Browser projects and shared test options are configured in `playwright.config.ts`.