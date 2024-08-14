import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ApparelSearch from '../../page-objects/ApparelSearch';
import MobileSearch from '../../page-objects/MobileSearch';
import SumOfCartPage from '../../page-objects/SumOfCart';

let apparelData, mobileData;

before(() => {
  // Load the JSON data
  cy.fixture('apparelData').then((data) => {
    apparelData = data;
  });
  cy.fixture('mobileData').then((data) => {
    mobileData = data;
  });
});
const apparelSearch = new ApparelSearch();
const mobileSearch = new MobileSearch();
const cartSum = new SumOfCartPage();


Given('I am  searching the page with apparel', () => {
  apparelSearch.visit();
});

Given('I search for an apparel item with search term {string}', (searchTerm) => {
  apparelSearch.searchItem(apparelData.searchTerm);
  cy.wait(2000);
});

Given('I select the item {string} of size {string}', (itemName, size) => {
  apparelSearch.findAndSelectItem(apparelData.itemName, apparelData.size);
});

Given('the cart count is verified', () => {
  apparelSearch.verifyCartCountTo1();
});

When('I search for a mobile with search term {string}', (searchTerm) => {
  mobileSearch.searchItem(mobileData.searchTerm);
  cy.wait(2000);
});

When('I filter by brand {string}', (brand) => {
  mobileSearch.filterByBrand(mobileData.brand);
});

When('I select the mobile {string}', (mobileName) => {
  mobileSearch.findAndSelectMobile(mobileData.mobileName);
});

When('I go to the cart', () => {
  mobileSearch.goToCart();
});

Given('the total cart count is verified', () => {
  mobileSearch.verifyCartCountTo2();
});

Then('I verify the total amount in the cart', () => {
  cartSum.verifyCartTotal();
});
