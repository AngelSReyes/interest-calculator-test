# Interest Calculator - Playwright Test Automation  

## Background

This project automates the testing of the **Interest Calculator** application using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/). The tests are designed to perform UI tests of the web application, verifying core functionality through simulated user interactions in a variety of browsers (Chromium, Firefox, WebKit).


## Project Structure

```
📂 interest-calculator-tests  
├── 📂 models          # TypeScript interfaces representing data models  
│   ├── InterestCalc.ts  
│   └── ...  
├── 📂 mothers         # Test data generators (Mother Object pattern)  
│   ├── InterestCalcMother.ts  
│   └── ...  
├── 📂 pages           # Page Object Model (POM) - UI interactions  
│   ├── InterestCalcPage.ts  
│   └── ...  
├── 📂 tests           # Playwright test cases  
│   ├── interestCalc.spec.ts  
│   └── ...  
├── package.json       # Project dependencies & scripts  
├── playwright.config.ts # Playwright configuration  
└── README.md          # Documentation  
```



## Setup Instructions**

### ** 1. Prerequisites**  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [Playwright](https://playwright.dev/)  

### ** 2. Install Dependencies**  
Run the following command to install all necessary dependencies:  
```sh
npm install
```

### ** 3. Install Playwright Browsers**  
Playwright requires browser binaries. Install them using:  
```sh
npx playwright install
```


## Running Tests

### **Run All Tests**  
```sh
npm run test:all
```

or 

```sh
npx playwright test
```

### **Run Tests on Chrome**  
Run all tests on Chrome
```sh
npm run test
```

or 

```sh
npx playwright test --project=chromium
```

### **Run Tests in Headed Mode (With UI)**  
```sh
npx playwright test --headed
```

### **Run a Specific Test File**  
```sh
npx playwright test tests/interestCalc.spec.ts
```

### **View Test Report**  
```sh
npx playwright show-report
```


## **Next Steps**  

A few improvements and future enhancements for the project:  

1. **Expand Test Coverage**  
- Add negative test cases (e.g., invalid inputs, edge cases).  
- Include accessibility tests (ARIA roles, screen reader support). As well as incorporating [AXE](https://playwright.dev/docs/accessibility-testing).

2. **Enhance Test Stability**  
- Implement retry mechanisms for flaky tests.  
- Improve error handling for UI pop-ups and unexpected behaviours.  

3. **Code Quality & Linting**  
- Enforce ESLint & Prettier for consistent code formatting.  

4. **Configuration Improvements**  
- Standardise test execution across different environments with `.env` configuration.  

5. **Introduce CI/CD Integration**  
- Configure GitHub Actions or Jenkins to run tests automatically on each commit.  
- Generate and upload test reports to a dashboard for monitoring.  

6. **Performance Testing**  
- Use Playwright Trace Viewer to analyse test performance.  
- Measure execution time to detect potential bottlenecks.  

7. **Cross-Browser Testing**  
- Expand tests to run on Safari for broader coverage.  
- Ensure consistent behaviour across desktop and mobile views.  
