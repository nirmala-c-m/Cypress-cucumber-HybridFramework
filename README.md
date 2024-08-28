# Cypress-cucumber-HybridFramework

A boilerplate framework that helps you to write automation tests for E2E using Cypress.


## Note
* Avoiding Cypress config file since it may complicate managing Page Objects in Cucumber.
* Parallel execution can be tricky with Cypress and Cucumber; managing state between tests requires careful handling.
* Do not use arrow functions in Hooks; use regular functions to maintain the correct this context. Arrow functions have their own lexical context and may cause errors in hooks.

## Plugins needed

- Cypress Test Runner for VSCode
- Cucumber (Gherkin) Full Support
- Open the settings in VSCode (ctrl + ,)
- Search for Cucumber and update the settings file (cypress.config.js) by adding the feature and step definitions paths:

	```
	 specPattern: 'cypress/e2e/feature_files/**/*.feature', // Feature files
    stepDefinitions: 'cypress/e2e/step_definition_files/**/*.steps.js', // Step definitions
    //supportFile: 'cypress/e2e/cypress_files/index.js', // Support file (index.js)
		
	```
## Debug
* Use the built-in Cypress Dashboard for detailed debugging and trace analysis.
* Debugging can be done using the Cypress interactive mode with breakpoints in the VSCode terminal.

## Tech stack used

#### E2E dependencies
* Cypress - E2E testing library
* Cucumber - BDD testing framework integrated with Cypress

#### Common framework dependencies (Removed some from package.json)
* cypress-multi-reporters - For multi-format reporting
* winston - For logging
* dotenv - For environment variable management
* fs-extra - Used to clean up test results before each execution
* cross-env - Helps pass environment variables properly across different platforms
* faker - For generating random test data

## Execution
We can execute the tests in different ways, either via the terminal or using the Cypress Test Runner interface.

* 1.  **Normal case**
	* Execute `npm run test`
	* To execute specific tags from command line we can use npm argument parser npm_config_ -> `npm run test --tags="@Smoke"`
	* If you need to specify a browser, you can do so with the --browsertype option[Default value for browser is chrome] -> `npm run test --tags="@Smoke" --browsertype="firefox"`

  * Rerun failed cases: run `npm run test test:failed`
    
* 2. **Executing Tests via Cypress Test Runner**
   * Opening the Cypress Test Runner `npx cypress open`
   * To execute specific tags  -> `npx cypress open --env tags="@Login_Scenario3"`
   * **Running Tests:**
     Once the Test Runner is open, you can select any .feature file from the list and execute it.
     The Test Runner allows you to see your tests run in real-time, along with the ability to interact with the application under test directly in the browser.
  * **Debugging with Test Runner:**
    You can pause test execution, inspect elements, and step through your code interactively.
    Test results, including errors and screenshots, are displayed within the runner interface, making it easier to diagnose issues.

  * **Rerunning Failed Cases in Test Runner:**
    The Cypress Test Runner also logs failed tests, which can be rerun directly from the interface by simply selecting the failed tests and clicking the "Run" button.

### Execution flow
Execution in this framework starts from `package.json`. Depending on the command executed in the CLI `test:failed` or `test` (test:failed or test), the corresponding script will be executed.
Tests to be executed are defined in the feature files located in the cypress/e2e folder. The set of test cases is identified by appropriate tag names using the tags section in cypress-cucumber-preprocessor or CLI.


#### Normal case
While executing `npm run test` package.json -> script -> test will be executed

test have below script:<br>
`"test": "cross-env ENV=staging FORCE_COLOR=0 cypress run --config-file config/cypress-cucumber.json"`

* `cross-env` - if we are planning to execute teston different OS the terminal will be different, to make the script compatible with all the OS we use this library.
* `ENV=staging` we can have multiple configurations for mutiple environment like staging and production, To specify which env we need to use we can use this.<br>
* `cross-env` and `ENV=staging` are from same library.
* `FORCE_COLOR=0` - Used to remove junk charectors from cucumber report
* `--config=config/cypress-cucumber.json` - Specifies the configuration path for Cypress and Cucumber.
* `|| true` - can be added in the test command the post test and pretest script will execute regardless of pass or fail of the test cases. If we do not give this, the pre and post test script will not execute after the test failure.

**Argument passing through CLI (tags, browser type etc) -**
The simplest way to pass arguments to an npm script is to prepend the arguments to the argument parser called npm_config_ and attach the result to the process.env object. In `npm_config_tags` or `npm_config_browsertype`, arguments can be passed from CLI, eg: `npm run test --tags="@Login_Scenario3"`<br>
**Note:** `TAGS` and `tags` are two different argument. TAGS is not working in linux env.

#### Rerun failed cases
While executing `npm run test test:failed` package.json -> script -> test:failed will be executed

* Create two profiles in `cucumber.js` file `default` and `rerun`
* Rerun profile should not contain `paths`, because if we provide path here then the scenarios from the path will be executed, we only need to execute failed scenarios hence we provide no path.
* Need to specify rerun in both profiles in cucumber.js -> format -> rerun (`"rerun:@rerun.txt"`)
* After specifying above if we execute the test and have failed test cases, Those failed feature file and scenarios  will be inserted in `rerun.txt`
* Add `cucumber-js -p rerun @rerun.txt` (`-p rerun` is selecting the rerun profile and passing the feature files through `@rerun.txt`)
* using `npm run test test:failed` we can execute failed test cases

## Test configurations
Execution configurations can be set in `cypress-cucumber-preprocessor` and `cypress.env.json`.

* Retry, parallel execution, and other settings are configured in `cypress-cucumber-preprocessor`.
* Browser settings, baseUrl, and headless mode are set in `cypress.config.json`.

## Test case creation

* Test cases are defined in the `cypress/e2e folder` as `.feature files`. The first step in the feature file is to provide the test data. After obtaining the appropriate test data, you can proceed with the rest of the steps.

### cypress/support/step_definitions
* This folder contains all the steps defined in the feature files, such as reading test data, performing actions like login, creating orders, etc.

### src/pages
* This folder contains all the Page Objects that encapsulate the UI elements and actions, such as login, create order, etc.

### src/helpers
* This folder contains classes for helping pages and steps creation
	* **AllPageObjects** - Contanis all the page's objects and this object is shared with cucumber world hence we can access the page object with respect to the scenario scope.
	* **InteractionHelper** - Created all the actions like click, type, screeshot etc in here so that we can add addional log and easy access.

## Read test data
**cypress/utils/dataReader.js**<br>
Test data reading start from test data path provided in step defined in the feature file. Test data is provided in JSON file in `TestData/{feature name}/{test case01}` path. data reading is implimented in `cypress/utils/dataReader.js`.
Since we're using cypress-cucumber-preprocessor for testing, the native Cypress report might not be sufficient. Instead, we use multiple-cucumber-html-reporter.

## Test reporting
(Please Note: multiple-cucumber-html-reporter is not implemetned in this framework )
**scypress/utils/reporter/reporter.js**<br>
Since we are using `cypress-cucumber-preprocessor` to run the tests,  the native Cypress report might not be sufficient. Instead, we use `multiple-cucumber-html-reporter`. 

**Impliment multiple-cucumber-html-reporter**<br>
* Use formater in `cucumber.js` to create json from cucumber report.
* Create `utils/reporter/reporter.ts` for creating report from the above json file.
* After the test execution, use `node reporter.ts` command to execute `reporter.ts` then it will convert json to cucumber-html-reporter.
* We dont want to execute command manually every time after a test execution, So we are putting the same command inside posttest.
`"posttest": "npx ts-node src/utils/reporter.ts"` in package.js
cucumber-html-reporter is more npm trendier than other reporters like allure reporter etc. thats why i choose this reporter.


## Scenario context
**cypress/utils/scenarioContext.js**<br>
Scenario context isolates scope for each scenario. All common operations at the scenario level, such as passing data between steps, are managed via the Cucumber world object. This allows sharing data like page objects or order numbers between steps.


## Logs
**cypress/utils/logger/logger.js**<br>
We use the Winston package for logging. Logs are managed in hooks, and the log object is shared between classes using fixtures. Each scenario has a separate log file.


## Other utils
* **cypress/utils/browserManager.js** - Manages browser selection and settings like headless mode, timeouts, and maximization.
* **cypress/utils/hooks.js** -Manages hooks like `Before`, `After`, `BeforeStep`, `AfterStep`, and coordinates browser context creation, page object initialization, logging, and tracing.
* **cypress/utils/preTest.js** - clears test-results folder after each execution, This is executed from `pretest` script in the `package.json`.

## Test output
*Test execution outputs, like order numbers or payment IDs, are logged in the report for later use. See `cypress/step_definitions/CommonStepDef.js`.


## Feature need to add
* dockerized the framework
	* https://codefresh.io/blog/not-ignore-dockerignore-2/
* Need to impliment DB validations
* Need to create artifactory for the framework

## Referece
* https://github.com/Tallyb/cucumber-playwright/tree/master
* https://github.com/Tallyb/cucumber-playwright/pull/95/files
