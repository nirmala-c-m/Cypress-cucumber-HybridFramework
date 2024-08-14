Feature: Delete Address in Amazon Application

  Scenario: User deletes an address from the Amazon account
    Given I am logged in with email from "loginData"
    When I navigate to the addresses page
    And I delete the address with the full name from "addressData"
    Then the address should be deleted successfully
