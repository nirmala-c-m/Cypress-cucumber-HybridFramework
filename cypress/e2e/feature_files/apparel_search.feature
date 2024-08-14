Feature: Apparel Search on Amazon

  Scenario: Mobile search and login
    Given I am on the apparel search page
    When I search for an item
    And I select the item
    And I log in with valid credentials
    Then I should be signed in successfully
