/// <reference types="cypress" />
import ApparelSearch from '../../page-objects/ApparelSearch';
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';

describe('ApparelSearch.Amazon Flow', () => {
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

  it('ApparelSearch_SC001', function () {
    const apparelSearch = new ApparelSearch();
    const loginPage = new LoginToAccountPage();

    expect(apparelData).to.have.property('searchTerm');
    expect(loginData).to.have.property('email');

    apparelSearch.visit();
    apparelSearch.searchItem(apparelData.searchTerm);
    cy.wait(2000);

    apparelSearch.findAndSelectItem(apparelData.itemName, apparelData.size);
    loginPage.clickAccountAndLists();
    loginPage.enterEmail(loginData.email);
    loginPage.clickContinue();
    loginPage.enterPassword(loginData.password);
    loginPage.clickSignIn();
  });
});
