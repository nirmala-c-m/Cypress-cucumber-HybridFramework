/// <reference types="cypress" />
import MobileSearch from '../../page-objects/MobileSearch'; // Adjust the path as needed

describe('MobileSearch.Amazon Flow', () => {

  const mobileSearch = new MobileSearch();

  it('MobileSearch_SC001', function () {
    cy.fixture('mobileData').then((data) => {
      mobileSearch.visit();
      mobileSearch.searchItem(data.searchTerm);

      cy.wait(2000);

      mobileSearch.filterByBrand(data.brand);
      mobileSearch.findAndSelectMobile(data.mobileName);
      mobileSearch.goToCart();
      mobileSearch.verifyMobileInCart();
    });
  });
});
