import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';

const loginPage = new LoginToAccountPage();
let loginData;

before(() => {
  cy.fixture('loginData').then((data) => {
    loginData = data;
  });
});

Given('I am on the Amazon login page', () => {
  loginPage.visit();
  loginPage.clickAccountAndLists();
});

When('I enter the email from {string}', (fixture) => {
  cy.fixture(fixture).then((data) => {
    loginPage.enterEmail(data.email);
  });
});

When('I click on Continue', () => {
  loginPage.clickContinue();
});

When('I enter the password from {string}', (fixture) => {
  cy.fixture(fixture).then((data) => {
    loginPage.enterPassword(data.password);
  });
});

When('I click on Sign In', () => {
  loginPage.clickSignIn();
});

Then('I should be logged in successfully', () => {
  // Add verification steps if needed, such as checking the URL or user dashboard
});
