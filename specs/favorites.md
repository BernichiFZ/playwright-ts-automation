# Feature: Customer favorites

## User story
As a logged-in customer, I want to favorite products so that I can quickly find them later.

## Requirements
- REQ-FAV-01: A user can add a product to favorites from the product listing or the product detail page
- REQ-FAV-02: Favorited products appear in the Favorites list
- REQ-FAV-03: A user can remove a favorite, and it no longer appears
- REQ-FAV-04: Favorites persist across logout and login
- REQ-FAV-05: Adding the same product twice does not create a duplicate
- REQ-FAV-06: A logged-out user cannot favorite a product

## Acceptance criteria

### AC-FAV-01 (REQ-FAV-01, REQ-FAV-02) [State transition] @smoke
Given a logged-in user on the product detail page
When they add the product to favorites
Then the product appears in the Favorites list
(State: not favorite → favorite)

### AC-FAV-02 (REQ-FAV-01, REQ-FAV-02) [EP] @regression
Given a logged-in user on the product listing
When they favorite several products, from the listing and from detail pages
Then all of them appear in the Favorites list

### AC-FAV-03 (REQ-FAV-03) [State transition] @smoke
Given a user with several favorites
When they remove one from the list
Then only that product disappears
And the others remain
(State: favorite → not favorite)

### AC-FAV-04 (REQ-FAV-05) [Error guessing] @regression
Given a product already in favorites
When the user tries to add it again
Then no duplicate appears, and the app shows an error or ignores the action
(Exact behavior to be confirmed on the real app.)

### AC-FAV-05 (REQ-FAV-04) [State transition] @regression
Given a user with favorites
When they log out and log back in
Then the same favorites are still listed

### AC-FAV-06 (REQ-FAV-06) [Error guessing] @regression
Given a logged-out user on a product page
When they try to favorite a product
Then the action is refused (error or redirect to login)
And nothing is added to any list

### AC-FAV-07 (robustness) [EP] @regression
Given a product that is unavailable or does not exist
When a user tries to favorite it
Then the app handles it with a clear error
(Only if reachable through the UI or API; otherwise cover it in API tests.)

## Test data approach
- Dedicated user created via API, with favorites reset before each test (create via API, don't build state through the UI)
- Product names read from the real catalog, not hardcoded guesses
- `storageState` for the logged-in tests; a fresh context with no state for AC-FAV-06

## Out of scope
- Sharing a favorites list
- Sorting and filtering inside Favorites