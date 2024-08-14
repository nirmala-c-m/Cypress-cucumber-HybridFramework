class ApparelSearch {
  //locators
  elements = {
    searchBox: '#twotabsearchtextbox',
    productListContainer: '.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16',
    productItem: '.sg-col-4-of-24',
    productName: '.a-size-base-plus.a-color-base.a-text-normal',
    sizeDropdown: '#native_dropdown_selected_size_name',
    addToCartButton: '#add-to-cart-button',
    cartCount: '#nav-cart-count',
  }

  //methods
  visit() {
    cy.visit('/');
  }

  searchItem(item) {
    cy.get(this.elements.searchBox).should('be.visible').type(`${item}{enter}`);
  }

  findAndSelectItem(itemName, itemSize) {
    cy.get(this.elements.productListContainer)
      .find(this.elements.productItem)
      .each(($el) => {
        const apparelName = $el.find(this.elements.productName).text();
        if (apparelName.includes(itemName)) {
          cy.wrap($el)
            .find('a')
            .invoke('removeAttr', 'target')
            .first()
            .click();


          cy.get(this.elements.sizeDropdown, { timeout: 10000 })
            .should('be.visible')
            .select(itemSize);


          cy.get(this.elements.addToCartButton
            , { timeout: 10000 })
            .as('addToCartButton')
            .should('be.visible')
            .invoke('removeAttr', 'target');

          // Click the "Add to Cart" button after it has been stabilized
          cy.get('@addToCartButton').click({ force: true });

          // Break the loop after finding and adding the item to the cart
          return false;
        }
      });
  }

  verifyCartCountTo1() {
    cy.get(this.elements.cartCount).should('contain', '1');

  }




}

export default ApparelSearch;
