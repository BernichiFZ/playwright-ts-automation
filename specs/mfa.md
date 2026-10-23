# Feature: Multi-factor authentication (MFA)

## User story
As a security-conscious customer, I want to set up MFA so that I have extra protection when logging in.

## Requirements
- REQ-MFA-01: A customer can enable MFA by scanning a QR code (or entering the secret key manually)
- REQ-MFA-02: The system verifies the TOTP code during setup
- REQ-MFA-03: After enablement, each new login requires a TOTP code
- REQ-MFA-04: An invalid, expired or reused TOTP code is rejected

## Acceptance criteria

### AC-MFA-01 (REQ-MFA-01, REQ-MFA-02) [State transition] @smoke
Given a logged-in user with MFA disabled
When they start MFA setup and enter a valid TOTP generated from the displayed secret
Then MFA is enabled
(State: MFA disabled → MFA enabled)

### AC-MFA-02 (REQ-MFA-02) [EP] @regression
Given a user in the MFA setup step
When they enter an invalid TOTP code
Then it is rejected with an error
And MFA stays disabled

### AC-MFA-03 (REQ-MFA-03) [State transition] @smoke
Given a user with MFA enabled
When they log in with a valid email and password
Then a TOTP prompt is shown before access is granted
When they enter a valid TOTP
Then they are logged in

### AC-MFA-04 (REQ-MFA-04) [EP] @regression
Given a user with MFA enabled at the TOTP prompt
When they enter a wrong code
Then login is rejected with an error and the user stays logged out

### AC-MFA-05 (REQ-MFA-04) [Error guessing] @regression
Given a user with MFA enabled at the TOTP prompt
When they enter a code from an expired time window
Then it is rejected
When they reuse a code that was already accepted
Then it is rejected (if the app enforces single use)
(Exact behavior, including tolerance of one adjacent time window, to be confirmed on the real app.)

## Test data approach
- Dedicated user created via API for each test: enabling MFA changes how that account logs in, which would break every other test using it
- TOTP codes generated in the test with a library (e.g. `otplib`) from the secret shown during setup, never hardcoded
- The secret is kept in the test only, never committed; test credentials come from `.env`
- For AC-MFA-03 and AC-MFA-04, enable MFA via API when possible, to avoid repeating the setup flow

## Out of scope
- Recovery codes and backup methods
- Disabling MFA
- Scanning the QR code with a real authenticator app