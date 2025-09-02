# ClassavoQAAssignment (Cypress Automation Framework)

## 📌 Overview

This repository contains end-to-end (E2E) Cypress test automation for
**Classavo's platform**.\
It validates core user flows such as **signup, login, course join, and
subscription/license checks**, along with edge cases to ensure platform
reliability.

------------------------------------------------------------------------

## 🏗️ Project Structure

    ClassavoQAAssignment
    │── config/                  # Environment-specific configs (dev, qa, staging)
    │   ├── dev.json
    │   ├── qa.json
    │   ├── staging.json
    │
    │── cypress/
    │   ├── downloads/           # Cypress downloads
    │   ├── e2e/                 # Test specs
    │   │   ├── edge_cases.cy.js               #api-automation
    │   │   ├── invalid_course_details.js      #negative case
    │   │   ├── signup_login_joinCourse.cy.js  #intercepting
    │   │   ├── subscription_validation.cy.js  #mocking
    │   │
    │   ├── fixtures/            # Test data (if needed)
    │   ├── support/             # Helpers & custom commands
    │   │   ├── apiFunctions/
    │   │   │   └── apiHelperFunctions.js 
    │   │   ├── helperConstants/
    │   │   │   └── helperConstants.js
    │   │   ├── helperLocators/
    │   │   ├── uiFunctions/
    │   │   │   └── uiHelperFunctions.js
    │   │   ├── commands.js      # Custom Cypress commands
    │   │   └── e2e.js           # Global test setup
    │
    │── .gitignore
    │── cypress.config.js        # Cypress configuration
    │── package.json             # Dependencies & scripts
    │── package-lock.json
    │── README.md                # Project documentation

------------------------------------------------------------------------

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

``` bash
git clone <repo_url>
cd ClassavoQAAssignment
```

### 2️⃣ Install Dependencies

``` bash
npm install
```

### 3️⃣ Configure Environment

## 🔑 Environment Configs

- Located in `/config` folder (`dev.json`, `qa.json`, `staging.json`)
- Example:
  ```json
  {
    "baseUrl": "https://qa.classavo.com",
    "username": "student@classavo.com",
    "password": "Password123"
  }
  ```

- Loaded dynamically in `cypress.config.js`

Select environment via CLI:

``` bash
npx cypress run --env configFile=qa
```

------------------------------------------------------------------------

## 🚀 Running Tests

### Open Cypress UI

``` bash
npx cypress open --env configFile=qa
```

### Run All Tests (Headless)

``` bash
npx cypress run --env configFile=qa
```

### Run Specific Test File

``` bash
npx cypress run --spec "cypress/e2e/signup_login_joinCourse.cy.js" --env configFile=qa
```

------------------------------------------------------------------------

## 🧪 Test Scenarios Covered

1. **Successful Flow**
   - User signup, verify email, login
   - Join course with valid course code and password
   - Redirect to Course Dashboard and validate course title
   - Verify "Start Course" button appears only after joining successfully

2. **Invalid Course Details**
   - Wrong course code
   - Wrong course password
   - Error messages displayed correctly

3. **Subscription Validation**
   - Allows access when subscription is Active
   - Blocks access when subscription is Expired and navigates to Billing/Subscriptions page
   - Shows upgrade when subscription is Not Available and navigated to Billing/Subscriptions Page

4. **Edge Cases**
   - Blocks access to course dashboard without enrollment
   - handles API timeout gracefully

---


## 🛠️ Custom Helpers

- **apiHelperFunctions.js** → API-level interactions (e.g., login via API)
- **locators.js** → Storage file for locators
- **uiHelperFunctions.js** → UI workflows (e.g., course join actions)
- **helperConstants.js** → Test constants and values

------------------------------------------------------------------------

## 🔑 Key Features

-   **Multi-environment support** via `config/` JSON files\
-   **Custom commands & helper utilities** for reusability\
-   **API + UI test integration** (Cypress intercepts + Mocking + UI checks)\
-   **Edge case validation** (Blocks access to course without enrollment, handles API timeout gracefully
-   **Scalable folder structure** (fixtures, locators, API helpers)

------------------------------------------------------------------------

## ✅ Approach, Assumptions & Strategy

### 🔹 How I Approached the Flow
- Broke the flow into **modular test cases** (signup, login, join course, edge cases,subscription).  
- Used **separation of concerns**: API helpers for backend validation, UI helpers for frontend.
- Progressive Coverage – Started with the happy path to establish a working baseline, then expanded to cover negative scenarios and advanced edge cases.
- Optimization Mindset : Minimized test data dependencies, reused locators/constants, and applied environment-based configs (dev, qa, staging) for flexibility.
- Scalability in Mind – Structured tests and utilities to make it easy to add new features without rewriting existing flows.
- Used **Interception and Mocking** for effective backend testing and ensuring we are covering functional flows in efficient way

### 🔹 Assumptions Made
- Email confirmation is handled via a test environment mock API (not actual email).  
- Course codes are static for test purposes.  
- The system resets test data daily or provides dedicated QA accounts.  
- Error messages are consistent and user-friendly.
- Courses are accessed as per subscription modal.
- Have the API RestEndpoints and using REST API's for backend operations
- Allowed to intercept and mock response

### 🔹 Strategy: Staging vs Production
- **Staging** → Focus on **exploratory & destructive testing & functionally e2e well covered regression testing** (invalid inputs, API error simulation, edge cases)[ Automation Testing / Manual Testing].  
- **Production** → Focus on **smoke/regression tests** (core workflows only, minimal data impact). Avoid destructive tests.  
- In production, rely more on **monitoring + synthetic transactions** rather than full E2E destructive tests.  

### 🔹 If I Had Only 1 Day/Week for QA
I would prioritize automating:  
1. **Login & Authentication** (since every flow depends on it).  
2. **Course Join Flow** (main student use case).  
3. **Start Course Visibility** (critical path to course content).  
4. **Basic Subscription Validation** (ensures monetization logic isn’t broken).  

Remaining flows (advanced edge cases, UI polish) can be tested manually or added incrementally.

---

## 📌 Future Improvements
- Add CI/CD integration (GitHub Actions / GitLab CI / AWS CodeBuild)
- Parallel test execution for faster runs
- Enhanced reporting & dashboarding
- Data seeding utilities for clean test setup
- Add more API Automation coverage for effective Test Data Setup
---

## 👤 Author

**Shubham Ladhe**\
  Senior SDET
