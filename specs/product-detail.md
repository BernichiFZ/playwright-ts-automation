# Feature: Product detail page

## User story
As a customer, I want to view product details, set rental duration or quantity, and add to cart or favorites.

## Requirements
- REQ-PDP-01: The page shows the product's details (name, price, description)
- REQ-PDP-02: For rental products, the duration selector calculates the correct price
- REQ-PDP-03: Add to cart adds the correct product and quantity
- REQ-PDP-04: Quantity is validated at its boundaries (0 is rejected, max allowed is accepted)
- REQ-PDP-05: Add to favorites requires login, otherwise an error is shown
- REQ-PDP-06: Repeated rapid clicks on "Add to cart" are handled consistently

## Acceptance criteria

### AC-PDP-01 (REQ-PDP-01) [EP] @smoke
Given the product listing
When the user opens a product
Then the detail page shows its name, price and description
And they match the values shown in the listing

### AC-PDP-02 (REQ-PDP-02) [BVA] @regression
Given a rental product detail page
When the user changes the duration (min, a middle value, max)
Then the displayed price is recalculated according to the pricing rule
(Rule, linear or tiered, to be confirmed on the real app.)

### AC-PDP-03 (REQ-PDP-03) [EP] @smoke
Given a product detail page
When the user sets a valid quantity and adds it to the cart
Then the cart contains that product with that quantity
And the cart count is updated

### AC-PDP-04 (REQ-PDP-04) [BVA] @regression
Given a product detail page
When the quantity is 0 (or negative)
Then adding to the cart is rejected or blocked
When the quantity is 1, then the max allowed
Then it is accepted
When the quantity is max + 1
Then it is rejected or blocked

### AC-PDP-05 (REQ-PDP-05) [EP] @regression
Given a logged-out user on a product detail page
When they click "Add to favorites"
Then an error is shown (or they are redirected to login)
And nothing is added to favorites
(Overlaps with AC-FAV-06: automate it once, in one place.)

### AC-PDP-06 (REQ-PDP-05) [EP] @smoke
Given a logged-in user on a product detail page
When they click "Add to favorites"
Then the product is added to their favorites
(Full favorites behavior is covered in `customer-favorites.md`.)

### AC-PDP-07 (REQ-PDP-06) [Error guessing] @regression
Given a product detail page
When the user clicks "Add to cart" several times in rapid succession
Then the cart quantity is consistent with the number of accepted clicks
And the app does not crash or show a corrupted cart

## Test data approach
- Read-only for anonymous tests (AC-PDP-01, 02, 04, 05); no data created
- Cart tests use a fresh browser context, so each test starts with an empty cart
- Logged-in test (AC-PDP-06) uses `storageState` with a dedicated user
- Product and its limits (max quantity, rental duration range) read from the API or the page, not hardcoded
- Price rules and boundaries stored in `src/test-data/product-detail.json`

## Out of scope
- Cart page and checkout (see cart spec)
- Full favorites behavior (see `customer-favorites.md`)
- Product images, reviews and related products