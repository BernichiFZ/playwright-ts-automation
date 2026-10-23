# Feature: Customer messages

## User story
As a customer, I want to view and reply to my contact messages so that I can continue conversations with support.

## Requirements
- REQ-MSG-01: All past messages appear in chronological order
- REQ-MSG-02: A reply field is available and a valid reply is sent successfully
- REQ-MSG-03: An empty reply is rejected with a validation error
- REQ-MSG-04: A message exceeding the max length is rejected or blocked
- REQ-MSG-05: Message and attachment combinations are handled correctly (if attachments are supported)
- REQ-MSG-06: Sending while offline fails gracefully

## Acceptance criteria

### AC-MSG-01 (REQ-MSG-01) [EP] @smoke
Given a logged-in user with an existing contact message thread
When they open the thread
Then all messages are listed in chronological order

### AC-MSG-02 (REQ-MSG-02) [EP] @smoke
Given an open message thread
When the user sends a valid reply
Then the reply appears in the thread (immediately or after refresh)
And it is still there after reloading the page

### AC-MSG-03 (REQ-MSG-03) [EP] @regression
Given an open message thread
When the user submits an empty reply
Then a validation error is shown
And nothing is added to the thread

### AC-MSG-04 (REQ-MSG-04) [BVA] @regression
Given an open message thread
When the reply is exactly at the max length
Then it is accepted
When it is one character over
Then it is rejected or blocked
(Max length to be read from the real app.)

### AC-MSG-05 (REQ-MSG-05) [Decision table] @regression
Given an open message thread and attachments supported
When the user sends: text only / attachment only / text + attachment / neither
Then each combination gives the expected result (accepted or validation error)
(Only if the app supports attachments; otherwise mark as not applicable.)

### AC-MSG-06 (REQ-MSG-06) [Error guessing] @regression
Given an open message thread
When the user goes offline and sends a reply
Then a clear error is shown
And no duplicate or ghost message is added
(Exact behavior to be confirmed on the real app.)

## Test data approach
- Dedicated user created via API, with a contact message already created via API (the thread exists before the test)
- Unique reply text per run (include a timestamp) so the test finds its own message
- Offline simulated with `context.setOffline(true)`

## Out of scope
- Support agent / admin side of the conversation
- Email notifications