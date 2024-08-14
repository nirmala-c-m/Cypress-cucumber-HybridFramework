import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ApparelSearch from '../../page-objects/ApparelSearch';
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';

let apparelData, loginData;

before(() => {
  // Load the JSON data
  cy.fixture('apparelData').then((data) => {
    apparelData = data;
  });
  cy.fixture('loginData').then((data) => {
    loginData = data;
  });
});
const apparelSearch = new ApparelSearch();
const loginPage = new LoginToAccountPage();

Given('I am on the apparel search page', () => {
  apparelSearch.visit();
});

When('I search for an item', () => {
  apparelSearch.searchItem(apparelData.searchTerm);
  cy.wait(2000);
});

When('I select the item', () => {
  apparelSearch.findAndSelectItem(apparelData.itemName, apparelData.size);
});

When('I log in with valid credentials', () => {
  loginPage.clickAccountAndLists();
  loginPage.enterEmail(loginData.email);
  loginPage.clickContinue();
  loginPage.enterPassword(loginData.password);
  loginPage.clickSignIn();
});

Then('I should be signed in successfully', () => {
  // Add assertions here to verify successful login if needed
});
