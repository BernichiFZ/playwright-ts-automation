# Feature: Forgot password

## User story
As a user who forgot my password, I want to reset it using my email so that I can log back in.

## Requirements
- REQ-FPW-01: The email must exist in the system
- REQ-FPW-02: After a successful reset, the password is set to the demo value 'welcome02'
- REQ-FPW-03: The user can log in with the new password immediately
- REQ-FPW-04: An unknown email gives a clear error

## Acceptance criteria

### AC-FPW-01 (REQ-FPW-01, REQ-FPW-02) [EP] @smoke
Given a registered user on the forgot password page
When they submit their existing email
Then a success message is shown

### AC-FPW-02 (REQ-FPW-04) [EP] @regression
Given the forgot password page
When a user submits an email that is not registered
Then a clear error message is shown
And no password is changed

### AC-FPW-03 (REQ-FPW-02, REQ-FPW-03) [State transition] @smoke
Given a registered user who cannot log in with their old password
When they reset the password with their email
Then they can log in with the new password
And the old password no longer works
(State: cannot log in → can log in)

## Test data approach
- Use a dedicated user created via API for each run: never the shared auth user
- Reason: a reset changes the password, which would break every other test using that account
- The new demo password comes from config, not hardcoded in the test

## Out of scope
- Real email delivery and reset links (the demo sets the password directly)
- Password strength rules (covered in Register)