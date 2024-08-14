Feature: Sum of Cart

  Scenario: Calculate the total sum of items in the cart
    Given I am  searching the page with apparel
    And I search for an apparel item with search term "apparel search term"
    And I select the item "item name" of size "item size"
    And the cart count is verified
    When I search for a mobile with search term "mobile search term"
    And I filter by brand "mobile brand"
    And I select the mobile "mobile name"
    And I go to the cart
    And the total cart count is verified
    Then I verify the total amount in the cart
