import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';
import AddressPage from '../../page-objects/AddressPage';
import DeleteAddressPage from '../../page-objects/DeleteAddressPage';

const loginPage = new LoginToAccountPage();
const addressPage = new AddressPage();
const deleteAddress = new DeleteAddressPage();
let loginData, addressData;

before(() => {
  cy.fixture('loginData').then((data) => {
    loginData = data;
  });
  cy.fixture('addressData').then((data) => {
    addressData = data;
  });
});

Given('I am logged in with email from {string}', (fixture) => {
  cy.fixture(fixture).then((data) => {
    loginPage.visit();
    loginPage.clickAccountAndLists();
    loginPage.enterEmail(data.email);
    loginPage.clickContinue();
    loginPage.enterPassword(data.password);
    loginPage.clickSignIn();
  });
});

When('I navigate to the addresses page', () => {
  loginPage.clickAccountAndLists();
  cy.wait(2000);
  addressPage.clickYourAddress();
});

When('I delete the address with the full name from {string}', (fixture) => {
  cy.fixture(fixture).then((data) => {
    deleteAddress.deleteAddressIfFound(data.fullName);
  });
});

Then('the address should be deleted successfully', () => {
  // You can add assertions or verifications here if necessary
});
