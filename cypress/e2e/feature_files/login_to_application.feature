Feature: Login to Amazon Application

  Scenario: User logs into the Amazon application
    Given I am on the Amazon login page
    When I enter the email from "loginData"
    And I click on Continue
    And I enter the password from "loginData"
    And I click on Sign In
    Then I should be logged in successfully
