/// <reference types="cypress" />
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';
import AddressPage from '../../page-objects/AddressPage';
import DeleteAddressPage from '../../page-objects/DeleteAddressPage';

describe('AddAddress.Amazon Flow', function () {

  let addressData, loginData;
  const loginPage = new LoginToAccountPage();
  const addressPage = new AddressPage();
  const deleteAddress = new DeleteAddressPage();

  before(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
    cy.fixture('addressData').then((data) => {
      addressData = data;
    });
  });

  it('AddAddress_SC001', function () {

    expect(loginData).to.have.property('email');
    expect(addressData).to.have.property('fullName');

    loginPage.visit();
    loginPage.clickAccountAndLists();
    loginPage.enterEmail(loginData.email);
    loginPage.clickContinue();
    loginPage.enterPassword(loginData.password);
    loginPage.clickSignIn();
    loginPage.clickAccountAndLists();

    cy.wait(2000);

    addressPage.clickYourAddress();
    addressPage.clickAddAddressIcon();
    addressPage.checkCountryCode();
    addressPage.enterAddressDetails(
      addressData.fullName,
      addressData.phoneNumber,
      addressData.postalCode,
      addressData.addressLine1,
      addressData.addressLine2,
      addressData.landmark
    );
    addressPage.verifyCity(addressData.city);
    addressPage.verifyState(addressData.state);
    addressPage.submitAddress();

    deleteAddress.deleteAddressIfFound(addressData.fullName);
  });
});
