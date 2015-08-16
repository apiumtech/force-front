Feature: Widget Administration panel
  As a SFM user
  I want to have an administration panel
  So that I can manage visibility, order and size of the current SFM page Widgets

  Background:
    Given I'm logged In
    Given I'm on the distribution page

  Scenario: Panel is closed by default
    Then the panel should not be opened

  Scenario: Panel opens
    When I press the Widget Administration button
    Then the panel should be opened
