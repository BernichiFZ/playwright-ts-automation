# Feature: Register

## User story
As a visitor, I want to register an account so that I can log in and use personalized features.

## Requirements
- REQ-REG-01: Age must be between 18 and 75 inclusive
- REQ-REG-02: Email must be in a valid format and unique
- REQ-REG-03: All mandatory fields must be filled (first name, last name, email, password, confirm password)
- REQ-REG-04: Name, address and phone fields respect max lengths and validation rules
- REQ-REG-05: Password must be at least 8 characters with upper, lower, digit and symbol, not compromised, and match the confirmation

## Acceptance criteria

### AC-REG-01 (REQ-REG-01) [BVA]
Given the registration form with otherwise valid data
When the age is 17 or 76
Then registration is rejected with an age error
When the age is 18 or 75
Then registration succeeds

### AC-REG-02 (REQ-REG-02) [EP]
Given the registration form
When the email format is invalid
Then an email format error is shown
When the email is already registered
Then an "already used" error is shown
When the email is valid and new
Then registration succeeds

### AC-REG-03 (REQ-REG-03) [EP + Decision table]
Given the registration form
When one mandatory field is empty
Then an error appears on that field
When several mandatory fields are empty
Then an error appears on each of them

### AC-REG-04 (REQ-REG-04) [BVA]
Given the registration form
When a field is exactly at its max length
Then it is accepted
When it is one character over
Then it is rejected or blocked

### AC-REG-05 (REQ-REG-05) [BVA + EP]
Given the registration form
When the password is shorter than 8 characters, or lacks upper, lower, digit or symbol
Then a password rule error is shown
When the password and confirmation differ
Then a mismatch error is shown
When the password is known as compromised (if supported)
Then it is rejected
When the password meets all rules
Then registration succeeds

### AC-REG-06 (robustness) [Error guessing]
Given the registration form
When fields contain SQL injection strings, emoji or only spaces
Then the app does not crash and shows a validation error or safely stores the value

## Test data approach
- Unique email per run (e.g. `user+<timestamp>@example.com`) to avoid collisions
- Data-driven tables in `src/test-data/register.json`
- One known existing email for the "already used" case

## Out of scope
- Email confirmation flow
- Performance and load