// @ts-ignore
const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor/browserify').default;

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", preprocessor(config));
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.amazon.in',
    watchForFileChanges: false,
    setupNodeEvents,
    
    specPattern: 'cypress/e2e/feature_files/**/*.feature', // Feature files
    stepDefinitions: 'cypress/e2e/step_definition_files/**/*.steps.js', // Step definitions
    //supportFile: 'cypress/e2e/cypress_files/index.js', // Support file (index.js)
  
    retries: {
      runMode: 2,
      // openMode: 1,
    },
  },
});


