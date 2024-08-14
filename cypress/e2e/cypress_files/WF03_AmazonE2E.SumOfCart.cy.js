/// <reference types="cypress" />
import ApparelSearch from '../../page-objects/ApparelSearch';
import MobileSearch from '../../page-objects/MobileSearch';
import SumOfCartPage from '../../page-objects/SumOfCart';

describe('SumOfCart.Amazon Flow', () => {
  let apparelData, mobileData;

  before(() => {
    // Load the JSON data
    cy.fixture('apparelData').then((data) => {
      apparelData = data;
    });
    cy.fixture('mobileData').then((data) => {
      mobileData = data;
    });
  });

  it('CartSum_SC001', function () {
    const apparelSearch = new ApparelSearch();
    const mobileSearch = new MobileSearch();
    const cartSum = new SumOfCartPage();

    apparelSearch.visit();
    apparelSearch.searchItem(apparelData.searchTerm);
    cy.wait(2000);
    apparelSearch.findAndSelectItem(apparelData.itemName, apparelData.size);
    apparelSearch.verifyCartCountTo1();

    mobileSearch.searchItem(mobileData.searchTerm);
    cy.wait(2000);
    mobileSearch.filterByBrand(mobileData.brand);
    mobileSearch.findAndSelectMobile(mobileData.mobileName);
    mobileSearch.goToCart();

    mobileSearch.verifyCartCountTo2();

    cartSum.verifyCartTotal();
  });
});

