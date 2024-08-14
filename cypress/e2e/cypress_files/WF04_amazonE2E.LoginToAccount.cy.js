/// <reference types="cypress" />
import LoginToAccountPage from '../../page-objects/LoginToAccountPage';

const loginPage = new LoginToAccountPage();

describe('LoginToApplication.Amazon Flow', () => {
  let loginData;

  before(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  it('Login_SC001', function () {
    loginPage.clickAccountAndLists();
    loginPage.enterEmail(loginData.email);
    loginPage.clickContinue();
    loginPage.enterPassword(loginData.password);
    loginPage.clickSignIn();
  });
});
