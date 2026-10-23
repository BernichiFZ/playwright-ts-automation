# Feature: Locked account

## User story
As a user, I want my account to lock after repeated failed logins so that my account is protected against brute-force attacks.

## Requirements
- REQ-LCK-01: After 3 consecutive failed password attempts, the account is locked
- REQ-LCK-02: A lock message is shown: "Account locked, too many failed attempts. Please contact the administrator."
- REQ-LCK-03: A locked account stays blocked, even with the correct password
- REQ-LCK-04: An admin can unlock the account, and the user can then log in again
- REQ-LCK-05: Fewer than 3 failed attempts do not lock the account

## Acceptance criteria

### AC-LCK-01 (REQ-LCK-01, REQ-LCK-02) [State transition] @smoke
Given an active user on the login page
When they submit a wrong password 3 times
Then the account is locked
And the lock message is shown
(State: active → locked)

### AC-LCK-02 (REQ-LCK-01, REQ-LCK-05) [BVA] @regression
Given an active user
When they submit a wrong password 2 times, then the correct password
Then the login succeeds and the account is not locked
When they submit a wrong password 3 times
Then the account is locked
(Boundary: 2 attempts allowed, 3rd locks. Whether the counter resets after a successful login is to be confirmed on the real app.)

### AC-LCK-03 (REQ-LCK-03) [State transition] @regression
Given a locked account
When the user submits the correct password
Then login is still refused with the lock message

### AC-LCK-04 (REQ-LCK-04) [State transition] @smoke
Given a locked account
When an admin unlocks it
Then the user can log in with the correct password
(State: locked → active)

### AC-LCK-05 (robustness) [Error guessing] @regression
Given an active user
When failed logins happen in parallel from two browser contexts
Then the account ends up locked consistently, with no crash and no login accepted after the lock
(Expected behavior to be confirmed on the real app.)

## Test data approach
- Dedicated user created via API for each test: a locked account breaks any other test using it
- Admin unlock done via API using admin credentials from `.env` (not through the UI)
- Wrong password values come from config; the correct password is never hardcoded

## Out of scope
- Automatic unlock after a time delay
- Email notification to the user or admin
- Real brute-force or load testing