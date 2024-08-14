Feature: Mobile Search on Amazon

  Scenario: Search for a mobile and verify it is in the cart
    Given I am on the mobile search page
    When I search for a mobile
    And I filter by brand
    And I select the mobile
    And I add the mobile to the cart
    Then I should see the mobile in the cart
