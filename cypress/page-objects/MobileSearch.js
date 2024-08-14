class MobileSearch {
  locators = {
    searchTextbox: '#twotabsearchtextbox',
    brandFilter: '#brandsRefinements',
    mobileListContainer: '.rush-component.s-latency-cf-section',
    mobileItem: '.puisg-row',
    mobileName: '.a-size-medium.a-color-base.a-text-normal',
    variantSelector: '.a-button.a-button-primary.a-button-icon',
    cartButton: '#nav-cart-count-container',
    cartMobileName: '.a-truncate-cut',
    cartCount: '#nav-cart-count',
  };

  visit() {
    cy.visit('/');
  }

  searchItem(item) {
    cy.get(this.locators.searchTextbox).should('be.visible').type(`${item}{enter}`);
  }

  filterByBrand(brand) {
    cy.get(this.locators.brandFilter)
      .contains(brand)
      .click();
  }

  findAndSelectMobile(mobileName) {
    cy.get(this.locators.mobileListContainer)
      .find(this.locators.mobileItem)
      .each(($el) => {
        const foundMobileName = $el.find(this.locators.mobileName).text().trim();
        if (foundMobileName.includes(mobileName)) {
          cy.wrap($el).find(this.locators.variantSelector).click();
          this.foundMobileName = mobileName; // Store the searched name for verification
          return false; // Stop the loop after finding the item
        }
      });
  }

  verifyCartCountTo2() {
    cy.get(this.locators.cartCount).should('contain', '2');
  }

  goToCart() {
    cy.get(this.locators.cartButton).click();
  }

  verifyMobileInCart() {
    cy.get(this.locators.cartMobileName).then(($element) => {
      const cartMobileName = $element.text().trim();
      expect(cartMobileName).to.include(this.foundMobileName.trim());
    });
  }

}

export default MobileSearch;
