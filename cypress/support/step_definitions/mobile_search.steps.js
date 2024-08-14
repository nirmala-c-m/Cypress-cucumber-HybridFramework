import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import MobileSearch from '../../page-objects/MobileSearch';

let mobileData;

before(() => {
  // Load the JSON data
  cy.fixture('mobileData').then((data) => {
    mobileData = data;
  });
});
const mobileSearch = new MobileSearch();

Given('I am on the mobile search page', () => {
  mobileSearch.visit();
});

When('I search for a mobile', () => {
  mobileSearch.searchItem(mobileData.searchTerm);
  cy.wait(2000); // Wait for the search results to load
});

When('I filter by brand', () => {
  mobileSearch.filterByBrand(mobileData.brand);
});

When('I select the mobile', () => {
  mobileSearch.findAndSelectMobile(mobileData.mobileName);
});

When('I add the mobile to the cart', () => {
  mobileSearch.goToCart();
});

Then('I should see the mobile in the cart', () => {
  mobileSearch.verifyMobileInCart();
});
