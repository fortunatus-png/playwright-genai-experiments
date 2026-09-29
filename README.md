# Experiments in Writing E2E Tests with Codegen & GenAI

This project explores writing E2E tests for [SauceDemo](https://www.saucedemo.com/) using Playwright, Playwright Codegen, and GenAI.

I started with a test automation prompt from the Bootcamp “Test Automation for Complete Beginners” and asked two GenAI tools how the prompt could be adapted to SauceDemo. I compared their suggestions and selected suitable test cases for this project.

For the test implementation, I used Playwright Codegen as a starting point. I then reviewed and refactored the generated code and used GenAI as a reviewer to identify potential improvements.

The goal of this project is to explore how GenAI can support the test automation process while keeping human review and decisions in the loop.

The tests run against the publicly available SauceDemo website.

## Prerequisites

- Node.js
- npm

## Setup

Install the project dependencies and the Playwright browsers:

```bash
npm ci
npx playwright install
```

## Running Tests

Run all tests in all configured browser projects:

```bash
npx playwright test
```

Run the tests in Chromium only:

```bash
npx playwright test --project=chromium
```

## HTML Test Report

After a test run, open the HTML report with:

```bash
npx playwright show-report
```

## Continuous Integration

GitHub Actions runs the Playwright tests on pushes to `main` and `master`, as well as on pull requests targeting these branches.
