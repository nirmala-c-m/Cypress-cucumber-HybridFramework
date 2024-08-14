class AddressPage {
  // Locators
  elements = {
    yourAddressesIcon: 'img[alt="Your Addresses"]',
    addAddressIcon: '.a-box.first-desktop-address-tile',
    countryCodeDropdown: '#address-ui-widgets-countryCode-dropdown-nativeId',
    fullNameInput: '#address-ui-widgets-enterAddressFullName',
    phoneNumberInput: '#address-ui-widgets-enterAddressPhoneNumber',
    postalCodeInput: '#address-ui-widgets-enterAddressPostalCode',
    addressLine1Input: '#address-ui-widgets-enterAddressLine1',
    addressLine2Input: '#address-ui-widgets-enterAddressLine2',
    landmarkInput: '#address-ui-widgets-landmark',
    cityInput: '#address-ui-widgets-enterAddressCity',
    stateDropdown: 'span.a-button-text.a-declarative span.a-dropdown-prompt',
    submitButton: 'input.a-button-input[type="submit"][aria-labelledby="address-ui-widgets-form-submit-button-announce"]',
  };

  // Methods
  clickYourAddress() {
    cy.get(this.elements.yourAddressesIcon).should('be.visible').click();
  }
  clickAddAddressIcon() {
    cy.get(this.elements.addAddressIcon).should('be.visible').click();
  }

  checkCountryCode() {
    cy.get(this.elements.countryCodeDropdown).should('have.value', 'IN');
  }

  verifyCity() {
    cy.get(this.elements.cityInput)
      .should('be.visible')
      .invoke('val')
      .then((city) => {
        expect(city).to.not.be.empty;
      });
  }

  verifyState() {
    cy.get(this.elements.stateDropdown)
      .should('be.visible')
      .invoke('text')
      .then((state) => {
        expect(state).to.not.be.empty;
      });
  }
  enterAddressDetails(name, phoneNumber, postalCode, addressLine1, addressLine2, landmark) {
    cy.get(this.elements.fullNameInput).should('be.visible').type(name);
    cy.get(this.elements.phoneNumberInput).should('be.visible').type(phoneNumber);
    cy.get(this.elements.postalCodeInput).should('be.visible').type(postalCode);
    cy.get(this.elements.addressLine1Input).should('be.visible').type(addressLine1);
    cy.get(this.elements.addressLine2Input).should('be.visible').type(addressLine2);
    cy.get(this.elements.landmarkInput).should('be.visible').type(landmark);
  }



  submitAddress() {
    cy.get(this.elements.submitButton).should('be.visible').click();
  }
}

export default AddressPage;
