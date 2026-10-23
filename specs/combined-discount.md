# Feature: Combined product discount

## User story
As a shopper, I want to receive a discount when I buy a regular + rental product together so that I save money.

## Requirements
- REQ-CMB-01: When the cart contains both a regular and a rental product, a 15% discount is applied
- REQ-CMB-02: When the cart contains only one type, no combined discount is applied
- REQ-CMB-03: Removing one of the two types removes the discount and the total is recalculated
- REQ-CMB-04: The discount and the cart total are calculated correctly for several items and quantities

## Acceptance criteria

### AC-CMB-01 (REQ-CMB-01) [EP] @smoke
Given an empty cart
When the user adds one regular product and one rental product
Then a 15% discount is applied
And the cart total equals the sum of the items minus 15%
(Whether the 15% applies to the whole cart or only to some items, to be confirmed on the real app.)

### AC-CMB-02 (REQ-CMB-02) [Decision table] @regression
Given a cart
When it contains only regular products, or only rental products, or is empty
Then no combined discount is displayed
And the total equals the plain sum of the items

### AC-CMB-03 (REQ-CMB-03) [State transition] @smoke
Given a cart with both types and the discount applied
When the user removes the rental product (then, in another run, the regular one)
Then the discount disappears
And the total is recalculated without it
(State: discount applied → discount removed.)

### AC-CMB-04 (REQ-CMB-04) [Decision table] @regression
Given a cart
When it holds each combination of regular count (0, 1, 2) x rental count (0, 1, 2)
Then the discount appears only when both counts are at least 1
And the total is correct in every combination

## Test data approach
- Fresh browser context per test, so each test starts with an empty cart
- Cart built through the API when possible, then the display is verified in the UI
- One regular and one rental product found through the API, not hardcoded
- Expected total computed in the test from the displayed unit prices, with a 0.01 tolerance for rounding

## Out of scope
- Stacking with other discounts 
- Checkout and payment
- Discount on products of the same type