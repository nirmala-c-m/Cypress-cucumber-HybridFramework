/// <reference types="cypress" />
import AddressPage from '../../page-objects/AddressPage';
import DeleteAddressPage from '../../page-objects/DeleteAddressPage';

describe('DeleteAddress.Amazon Flow', function () {

  let addressData;
  const addressPage = new AddressPage();
  const deleteAddress = new DeleteAddressPage();

  before(() => {
    cy.fixture('addressData').then((data) => {
      addressData = data;
    });
  });

  it('DeleteAddress_SC001', function () {

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
    deleteAddress.deleteAddressIfFound(addressData.fullName);
  });
});

