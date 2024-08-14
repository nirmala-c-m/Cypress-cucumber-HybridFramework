import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';
import AddressPage from '../../page-objects/AddressPage';
import DeleteAddressPage from '../../page-objects/DeleteAddressPage';

const loginPage = new LoginToAccountPage();
const addressPage = new AddressPage();
const deleteAddress = new DeleteAddressPage();

Given('the user is logged in', function () {
  cy.fixture('loginData').then((data) => {
    loginPage.visit();
    loginPage.clickAccountAndLists();
    loginPage.enterEmail(data.email);
    loginPage.clickContinue();
    loginPage.enterPassword(data.password);
    loginPage.clickSignIn();
    loginPage.clickAccountAndLists();
  });
});

When('the user adds a new address', function () {
  cy.fixture('addressData').then((address) => {
    addressPage.clickYourAddress();
    addressPage.clickAddAddressIcon();
    addressPage.checkCountryCode();
    addressPage.enterAddressDetails(
      address.fullName,
      address.phoneNumber,
      address.postalCode,
      address.addressLine1,
      address.addressLine2,
      address.landmark
    );
    addressPage.verifyCity(address.city);
    addressPage.verifyState(address.state);
    addressPage.submitAddress();
  });
});

Then('the user deletes the address added', function () {
  cy.fixture('addressData').then((address) => {
    deleteAddress.deleteAddressIfFound(address.name);
  });
});