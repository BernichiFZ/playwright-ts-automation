# Feature: Shopping cart

## User story
As a customer, I want to manage my cart so that I can control what I purchase.

## Requirements
- REQ-CRT-01: An empty cart shows an empty cart message
- REQ-CRT-02: A product added to the cart appears in it, with the correct quantity and price
- REQ-CRT-03: A removed product disappears from the cart, and the total is updated
- REQ-CRT-04: A discounted price is shown when a discount applies, and the total is calculated correctly
- REQ-CRT-05: The cart persists after a page refresh
- REQ-CRT-06: Removing a product while in the checkout flow is handled consistently

## Acceptance criteria

### AC-CRT-01 (REQ-CRT-01) [State transition] @smoke
Given a user with no items in the cart
When they open the cart page
Then an empty cart message is shown
And no checkout action is available

### AC-CRT-02 (REQ-CRT-02) [State transition] @smoke
Given an empty cart
When the user adds a product
Then it appears in the cart with the right name, quantity and price
And the cart icon count is updated
(State: empty → has items.)

### AC-CRT-03 (REQ-CRT-02, REQ-CRT-03) [EP] @regression
Given a cart with several products
When the user removes one of them
Then only that product disappears
And the total is recalculated
When the user removes the last one
Then the empty cart message is shown
(State: has items → empty.)

### AC-CRT-04 (REQ-CRT-04) [EP] @regression
Given a cart containing a product with a discount, and one without
Then the discounted price is displayed for the first only
And the cart total equals the sum of the displayed prices x quantities

### AC-CRT-05 (REQ-CRT-05) [State transition] @regression
Given a cart with items
When the user refreshes the page
Then the same items, quantities and total are still shown
(Also check after closing and reopening the page if the cart is stored on the server.)

### AC-CRT-06 (REQ-CRT-06) [Error guessing] @regression
Given a user in the checkout flow with items in the cart
When a product is removed (e.g. from another tab)
Then the checkout reflects the change or blocks with a clear message
And the order is never placed with the removed product
(Exact behavior to be confirmed on the real app.)

## Test data approach
- Anonymous tests use a fresh browser context, so each test starts with an empty cart
- Create the cart through the API when possible (add products via API, then verify in the UI)
- Products with and without a discount found through the API, not hardcoded
- Expected totals computed in the test from displayed unit prices, never hardcoded numbers

## Out of scope
- Checkout, payment and order creation
- Product detail page (see `product-detail.md`)
- Shipping costs and taxes