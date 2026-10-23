# Feature: Customer invoices

## User story
As a customer, I want to view and download my invoices so that I can track my purchases.

## Requirements
- REQ-INV-01: A logged-in user sees the list of their invoices
- REQ-INV-02: Clicking an invoice opens its detail page
- REQ-INV-03: The detail page data matches the list (date, total)
- REQ-INV-04: The download button provides the correct PDF file
- REQ-INV-05: A user can only see their own invoices
- REQ-INV-06: A logged-out user cannot access invoices

## Acceptance criteria

### AC-INV-01 (REQ-INV-01) [EP] @smoke
Given a logged-in user who has placed at least one order
When they open the invoices page
Then their invoices are listed

### AC-INV-02 (REQ-INV-02, REQ-INV-03) [State transition] @smoke
Given the invoices list
When the user clicks an invoice
Then the detail page is shown (list view → detail view)
And its date and total match the values in the list

### AC-INV-03 (REQ-INV-04) [EP] @regression
Given an invoice detail page
When the user clicks the download button
Then a PDF file is downloaded
And its content matches the invoice (number, total)

### AC-INV-04 (REQ-INV-05) [Error guessing] @regression
Given user A is logged in
When they open the direct URL of an invoice belonging to user B
Then access is denied (403/404) and no data from user B is shown

### AC-INV-05 (REQ-INV-06) [EP] @regression
Given a logged-out user
When they try to open the invoices page or an invoice URL
Then they are redirected to login or receive an authorization error

## Test data approach
- Dedicated user created via API, with an order placed via API (invoice exists before the test; don't build it through the UI checkout)
- A second user for the cross-customer access test (AC-INV-04)
- Downloaded PDFs saved to a temp folder and cleaned up

## Out of scope
- Invoice generation logic and tax calculation
- Printing