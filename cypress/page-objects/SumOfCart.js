class SumOfCart {
  constructor() {
    this.locators = {
      cartProductPrice: '.a-size-medium.a-color-base.sc-price.sc-white-space-nowrap.sc-product-price.a-text-bold',
      cartSubtotal: '#sc-subtotal-amount-activecart',
    };
  }

  //methods
  verifyCartTotal() {
    let totalSum = 0;

    //Calculate the sum of all item prices
    cy.get(this.locators.cartProductPrice).each(($el) => {
      const price = parseFloat($el.text().replace(/[^0-9.-]+/g, ""));
      totalSum += price;
    }).then(() => {
      //Get the cart total from the cart total locator
      cy.get(this.locators.cartSubtotal).then(($cartTotal) => {
        const expectedTotal = parseFloat($cartTotal.text().replace(/[^0-9.-]+/g, ""));

        cy.log('Calculated Total:', totalSum);
        cy.log('Expected Total:', expectedTotal);

        //Assert that the calculated total matches the expected total
        expect(totalSum).to.equal(expectedTotal);
      });
    });
  }
}

export default SumOfCart;
