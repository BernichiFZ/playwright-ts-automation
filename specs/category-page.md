# Feature: Category page

## User story
As a customer, I want to browse products by category so that I can shop within my area of interest.

## Requirements
- REQ-CAT-01: A category page shows only products of that category
- REQ-CAT-02: Filtering, sorting and price range behave as in Product listing, scoped to the category
- REQ-CAT-03: Navigating category → product detail → back keeps the category context
- REQ-CAT-04: Pagination works when the category has many products
- REQ-CAT-05: An invalid or non-existent category is handled gracefully

## Acceptance criteria

### AC-CAT-01 (REQ-CAT-01) [EP] @smoke
Given the home page
When the user opens a category
Then every displayed product belongs to that category
And the category name is shown as the page title or breadcrumb

### AC-CAT-02 (REQ-CAT-02) [Decision table] @regression
Given a category page
When the user combines sort order x price range (and brand filter if available)
Then results stay within the category
And satisfy all applied filters, in the correct order
(Same rules as AC-LST-02, AC-LST-03 and AC-LST-05, scoped to one category.)

### AC-CAT-03 (REQ-CAT-03) [State transition] @smoke
Given a category page
When the user opens a product, then navigates back
Then the category page is displayed again
And the same category (and applied filters, if the app keeps them) is still active
(State: category → product detail → category.)

### AC-CAT-04 (REQ-CAT-04) [EP] @regression
Given a category with more products than fit on one page
When the user goes to the next page, then back
Then each page shows the correct products with no duplicates between pages
(Only if the app paginates this category; otherwise mark as not applicable.)

### AC-CAT-05 (REQ-CAT-05) [Error guessing] @regression
Given the category page URL
When the category is replaced with an invalid or non-existent value
Then the app does not crash
And shows an empty state or an error page

## Test data approach
- Read-only feature: no login and no data created
- Categories read from the API, not hardcoded, so tests survive catalog changes
- Run the same tests over 2 to 3 categories with a data-driven loop
- Reuse the `ProductListPage` page object (the category page is the same component with a category parameter)

## Out of scope
- Filter, sort and search logic itself 
- Product detail page content
- Performance with a large catalog