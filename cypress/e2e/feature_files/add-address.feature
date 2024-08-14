Feature: Add Address to Amazon Account

  Scenario: User adds a new address
    Given the user is logged in
    When the user adds a new address
    Then the user deletes the address added
