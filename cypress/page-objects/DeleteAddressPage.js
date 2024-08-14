class DeleteAddressPage {
  // Locators
  elements = {
    addressSection: '.a-section.a-spacing-double-large',
    addressColumn: '.a-column.a-span4.a-spacing-none.a-spacing-top-mini.address-column',
    addressName: '#address-ui-widgets-FullName',
    deleteButton: '#ya-myab-address-delete-btn-2',
    confirmationDialog: '.a-popover-wrapper',
    confirmationHeader: '#a-popover-header-7',
    confirmDeleteButton: '#deleteAddressModal-2-submit-btn input.a-button-input[type="submit"]',
  }

  // Methods
  deleteAddressIfFound(name) {
    cy.get(this.elements.addressSection, { timeout: 10000 })
      .find(this.elements.addressColumn)
      .contains(this.elements.addressName, name, { timeout: 10000 })
      .should('be.visible')
      .should('have.text', name)
      .then(() => {
        // If the address name is found, click the remove button
        cy.get(this.elements.deleteButton).click();

        // Wait for the custom confirmation dialog to appear
        cy.get(this.elements.confirmationDialog, { timeout: 10000 }).should('be.visible');

        // Optionally, verify the text in the dialog
        cy.get(this.elements.confirmationHeader).should('have.text', 'Confirm Deletion');

        // Click the 'Yes' button in the custom confirmation dialog
        cy.get(this.elements.confirmDeleteButton).click();

        // Verify that the address name is no longer present
        cy.get(this.elements.addressSection)
          .find(this.elements.addressColumn)
          .should('not.contain', name);
      });
  }
}

export default DeleteAddressPage;

