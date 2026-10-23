# Feature: Product listing

## User story
As a customer, I want to filter, sort, and search products so that I can find what I need quickly.

## Requirements
- REQ-LST-01: Filtering by category or brand shows only matching products
- REQ-LST-02: Sorting by name or price works in both directions (ascending and descending)
- REQ-LST-03: The price range filter shows only products within the range
- REQ-LST-04: Resetting the search clears all filters and shows all products again
- REQ-LST-05: Filters and sorting can be combined and stay correct
- REQ-LST-06: A search with no matching product shows a clear "no results" state
- REQ-LST-07: Searching by keyword returns matching products (to confirm on the real app)

## Acceptance criteria

### AC-LST-01 (REQ-LST-01) [EP] @smoke
Given the product listing
When the user filters by a category (then by a brand)
Then every displayed product belongs to that category (or brand)

### AC-LST-02 (REQ-LST-02) [EP] @smoke
Given the product listing
When the user sorts by name A-Z, then Z-A
Then the products are in alphabetical order, then in reverse order
When the user sorts by price low-high, then high-low
Then the prices are in ascending order, then in descending order

### AC-LST-03 (REQ-LST-03) [BVA] @regression
Given the product listing
When the user sets a price range
Then every displayed product has a price within the range, bounds included
(Test values at, just inside and just outside the bounds.)

### AC-LST-04 (REQ-LST-04) [State transition] @smoke
Given a listing with filters and a search applied
When the user resets the search
Then all filters are cleared
And the full product list is displayed again

### AC-LST-05 (REQ-LST-05) [Decision table] @regression
Given the product listing
When the user combines category/brand filter x price range x sort order
Then results satisfy all the filters
And are in the correct order

### AC-LST-06 (REQ-LST-06) [Error guessing] @regression
Given the product listing
When the filters or search match no product
Then a clear "no results" message is shown and no product card is displayed

### AC-LST-07  [EP] @regression
Given the product listing URL
When a category or filter value is tampered with in the URL (invalid or non-existent value)
Then the app does not crash
And shows an empty or default listing

### AC-LST-08 (REQ-LST-07) [EP] @regression
Given the product listing
When the user searches for an existing keyword
Then matching products are displayed
When the keyword matches nothing
Then the "no results" state is shown

## Test data approach
- Read-only feature: no user, no login, no data created
- Expected values derived from the API (e.g. fetch products, compute the expected filtered/sorted list, compare with the UI) rather than hardcoded product names
- Alternative: assert the rule on what is displayed (all prices within range, order is sorted)
- Price bounds and categories stored in `src/test-data/listing.json`

## Out of scope
- Pagination
- Product detail page
- Performance with a large catalog