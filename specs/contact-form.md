# Feature: Contact form

## User story
As a logged-in user, I want to contact support and attach files so that I can report issues effectively.

## Requirements
- REQ-CON-01: Name (max 120 chars), subject (max 120) and message (max 250) are required
- REQ-CON-02: Email is required if it is not inferred from the user profile
- REQ-CON-03: Only txt, pdf and jpg files are accepted as attachments
- REQ-CON-04: Files larger than 500KB or empty (0KB) are rejected
- REQ-CON-05: An invalid file shows a descriptive error
- REQ-CON-06: Fields over their max length are rejected or blocked

## Acceptance criteria

### AC-CON-01 (REQ-CON-01, REQ-CON-02) [EP] @smoke
Given a logged-in user on the contact page
When they fill all required fields with valid values and submit
Then a success confirmation is shown
And the message appears in their messages list

### AC-CON-02 (REQ-CON-03) [EP] @regression
Given a valid contact form
When the user attaches a valid txt, pdf or jpg file (one case per type)
Then the message is sent successfully

### AC-CON-03 (REQ-CON-03, REQ-CON-05) [EP] @regression
Given a valid contact form
When the user attaches an invalid file type (e.g. .exe)
Then a descriptive error is shown
And the message is not sent

### AC-CON-04 (REQ-CON-04, REQ-CON-05) [BVA] @regression
Given a valid contact form
When the attached file is 0KB
Then it is rejected with a descriptive error
When the file is just below 500KB or exactly 500KB
Then it is accepted
When the file is just above 500KB
Then it is rejected with a descriptive error

### AC-CON-05 (REQ-CON-01, REQ-CON-02) [Decision table] @regression
Given the contact form
When each combination of (message filled / empty) x (file attached / none) is submitted
Then only the combinations with a filled message succeed
And the others show a validation error

### AC-CON-06 (REQ-CON-01) [EP] @regression
Given the contact form
When one required field (name, subject or message) is empty
Then an error appears on that field

### AC-CON-07 (REQ-CON-06) [BVA] @regression
Given the contact form
When name or subject is exactly 120 chars, or message exactly 250 chars
Then it is accepted
When any of them is one character over
Then it is rejected or blocked

### AC-CON-08 (robustness) [Error guessing] @regression
Given a valid contact form
When the attachment filename contains spaces or special characters
Then the upload is handled correctly with no crash

## Test data approach
- Test files generated in the test with `Buffer` (exact sizes), never committed to the repo
- Size boundaries defined once in `src/test-data/contact.json` (confirm whether 500KB means 500 x 1024 or 500 x 1000 bytes)
- Dedicated user via API; use `storageState` for the logged-in tests
- Unique message text per run (timestamp)

## Out of scope
- Support agent side of the conversation
- Virus scanning
- Email delivery