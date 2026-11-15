# Coffee Cart - Playwright Automation Framework

## Project Overview

This project is an automated testing framework for the [Coffee Cart](https://coffee-cart.app/) web application, built using Playwright and TypeScript.

The framework auto*mates th*e coffee purchasing process and validates key application functionalities. It follows the Page Object Model (POM) design pattern and uses Playwright fixtures to promote maintainability, reusability, and organized test execution.

## Tech Stack

- **Playwright** - Browser automation and testing
- **TypeScript** - Programming language
- **Node.js** - JavaScript runtime
- **GitHub Actions** - Continuous Integration (CI)

## Project Structure

```text
playwright-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test-fixtures.ts
├── pages/
│   └── CoffeeCartPage.ts
├── test-data/
│   └── coffee-data.ts
├── tests/
│   ├── coffee-cart.spec.ts
│   └── example.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
```

### Folder Description

- **fixtures/** - Contains reusable Playwright fixtures for test setup and page object initialization.
- **pages/** - Contains page object classes and reusable page interaction methods.
- **test-data/** - Stores test data separately from test logic.
- **tests/** - Contains automated test scenarios.
- **.github/workflows/** - Contains the GitHub Actions CI workflow configuration.

## Automated Test Coverage

The framework covers the following scenarios:

- Complete coffee purchase flow.
- Submit customer payment details and verify successful purchase.
- Verify promotional popup behavior.
- Accept and decline promotional offers.
- Verify promotional popup appears after adding the third coffee.
- Verify right-click interaction opens the add-to-cart dialog.
- Verify confirming or cancelling the right-click dialog.
- Verify coffee name translation through double-click interaction.

## Installation and Setup

### Prerequisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/johndeosantos/playwright-automation.git
cd playwright-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run a Specific Test File

```bash
npx playwright test tests/coffee-cart.spec.ts
```

### View HTML Test Report

```bash
npx playwright show-report
```

## Continuous Integration

This project uses GitHub Actions to automatically execute Playwright tests when code is pushed to the `main` or `master` branch or when a pull request is created for those branches.

The workflow installs dependencies, installs Playwright browsers, executes the test suite, and uploads the HTML report as an artifact.

## Design Approach

The framework uses:

- **Page Object Model (POM):** Separates page interactions from test scenarios.
- **Playwright Fixtures:** Provides reusable test setup and page object initialization.
- **Test Data Separation:** Keeps test data independent from test logic.
- **Playwright Auto-Waiting:** Uses Playwright's locator and assertion mechanisms to reduce timing-related issues.

---

**Project Type:** QA Automation Testing
**Application Under Test:** Coffee Cart
**Framework:** Playwright with TypeScript
