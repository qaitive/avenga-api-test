# 📘 Simplified API Automation Testing with Axios

This project automates testing of a RESTful API using **JavaScript**, **Axios**, **Mocha**, **Chai**, and **Mochawesome** for reporting.

## 📦 Dependencies

| Tool / Library | Purpose |
|---------------|---------|
| **Axios**     | For making HTTP API requests |
| **Mocha**     | Test runner for managing test cases |
| **Chai**      | Assertion library for test validations |
| **Mochawesome** | Generates HTML test reports |
| **Babel**     | For ES6+ support |
| **npm**       | Dependency management |

## 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd axios-api-testing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Generate Mochawesome report:
   ```bash
   npm run report
   ```
   Open `mochawesome-report/mochawesome.html` in a browser to view the report.

## 🐳 Running with Docker

### Prerequisites
- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Steps
1. Build and run tests using Docker Compose:
   ```bash
   docker-compose up
   ```
   This builds the Docker image and runs `npm test`.

2. Generate Mochawesome report:
   ```bash
   docker-compose run test-runner npm run report
   ```
   The report is saved in `./mochawesome-report/mochawesome.html`.

3. Stop and clean up:
   ```bash
   docker-compose down
   ```
   Optionally, remove the image:
   ```bash
   docker rmi axios-api-testing-test-runner
   ```

## 📂 Project Structure

- `support/apiService.js` - API service with endpoint methods for authors and books.
- `support/bookValidator.js.js` - Validates book data and responses.
- `testdata/testData.js` - Test data objects.
- `test/bookTests.js` - All book-related tests.
- `test/authorTests.js` - All author-related tests.
- `Dockerfile` - Defines the Docker image for running tests.
- `docker-compose.yml` - Configures the test runner service.