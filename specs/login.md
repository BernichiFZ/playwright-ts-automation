# Feature: Login

## User story
As a registered user, I want to log in using my email and password so that I can access my account.

## Requirements
- REQ-LOG-01: A user can log in with valid credentials
- REQ-LOG-02: Login fails with an incorrect password, an unknown email or a disabled account
- REQ-LOG-03: Error messages are clear and specific
- REQ-LOG-04: A logged-in user can log out and return to the logged-out state

## Acceptance criteria

### AC-LOG-01 (REQ-LOG-01) [EP] @smoke
Given a registered user on the login page
When they submit a valid email and password
Then they are redirected to their account page
And they appear as logged in

### AC-LOG-02 (REQ-LOG-02, REQ-LOG-03) [EP]
Given a registered user on the login page
When they submit a valid email with an incorrect password
Then an error message is shown and the user stays logged out

### AC-LOG-03 (REQ-LOG-02, REQ-LOG-03) [EP]
Given the login page
When a user submits an email that is not registered
Then an error message is shown and the user stays logged out

### AC-LOG-04 (REQ-LOG-02, REQ-LOG-03) [EP]
Given a disabled account
When its owner submits valid credentials
Then an error message is shown and the user stays logged out
(Only if the app supports disabling accounts; otherwise mark as not applicable.)

### AC-LOG-05 (REQ-LOG-04) [State transition]
Given a logged-out user
When they log in, then log out
Then the state goes logged out → logged in → logged out
And protected pages are no longer accessible after logout

### AC-LOG-06 (robustness) [Error guessing]
Given the login page
When the email has different letter case, leading or trailing spaces, or a SQL injection string
Then the app behaves consistently and safely
(Expected behavior for case and spaces to be confirmed on the real app.)

## Test data approach
- Reusable test user created via API before the suite (not through the UI)
- Credentials in `.env`, never hardcoded
- Auth reuse with `storageState` for all other features

## Out of scope
- Password reset
- Social login