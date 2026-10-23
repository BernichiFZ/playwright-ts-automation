# Feature: Customer profile

## User story
As a logged-in user, I want to update my profile information and reset my password so that my account details remain correct and secure.

## Requirements
- REQ-PRO-01: First name, last name, phone and address fields can be updated
- REQ-PRO-02: Invalid values (phone, postal code, over-length) are rejected
- REQ-PRO-03: A password reset cannot reuse the current password
- REQ-PRO-04: After a password reset, the user is logged out automatically

## Acceptance criteria

### AC-PRO-01 (REQ-PRO-01) [EP] @smoke
Given a logged-in user on the profile page
When they update a field (first name, last name, phone, or an address field) with a valid value and save
Then a success confirmation is shown
And after reloading the page the new value is still displayed
(Repeated for each field individually.)

### AC-PRO-02 (REQ-PRO-02) [EP] @regression
Given a logged-in user on the profile page
When they enter an invalid phone number or postal code and save
Then a validation error is shown
And the previous value is kept after reload

### AC-PRO-03 (REQ-PRO-02) [BVA] @regression
Given a logged-in user on the profile page
When a field (e.g. city) is exactly at its max length
Then it is accepted and persisted
When it is one character over
Then it is rejected or blocked

### AC-PRO-04 (REQ-PRO-03) [EP] @regression
Given a logged-in user changing their password
When the new password equals the current password
Then the change is rejected with a clear message
And the user stays logged in

### AC-PRO-05 (REQ-PRO-03, REQ-PRO-04) [State transition] @smoke
Given a logged-in user
When they change their password to a new valid one
Then they are logged out automatically
And logging in with the old password fails
And logging in with the new password succeeds
(State: logged in → logged out → logged in)

## Test data approach
- Dedicated user created via API per test or run, never the shared auth user
- Reason: changing the password invalidates the session and credentials used by other tests
- Max lengths read from the real form, stored in `src/test-data/profile.json`

## Out of scope
- Profile picture upload
- Account deletion