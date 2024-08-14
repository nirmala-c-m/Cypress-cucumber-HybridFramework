class LoginToAccountPage {
  // locators
  elements = {
    accountAndLists: 'span.nav-line-2:contains("Account & Lists")',
    emailInput: '#ap_email_login',
    continueButton: '.a-button-input',
    passwordInput: '#ap_password',
    signInButton: '#signInSubmit',
  };

  // methods
  visit() {
    cy.visit('/');
  }

  clickAccountAndLists() {
    cy.get(this.elements.accountAndLists).click();
  }

  enterEmail(email) {
    cy.get(this.elements.emailInput, { timeout: 10000 }).type(email);
  }

  clickContinue() {
    cy.get(this.elements.continueButton).invoke('removeAttr', 'target').click();
  }

  enterPassword(password) {
    cy.get(this.elements.passwordInput).type(password);
  }

  clickSignIn() {
    cy.get(this.elements.signInButton).click();
  }
}

export default LoginToAccountPage;
