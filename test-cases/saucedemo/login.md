# SauceDemo – Login Test Cases

This document contains the test cases for the login functionality of SauceDemo.

**Application:** https://www.saucedemo.com/  
**Feature:** Login  
**Test Type:** UI / Functional / Negative / Edge Case / Security  
**Automation:** Playwright


# High Priority

## TC-LOGIN-001 – Successful login with standard_user

**Priority:** High  
**Type:** Positive  

### Preconditions

- User is on the SauceDemo login page.
- User is not already authenticated.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`

### Steps

1. Enter `standard_user` into the username field.
2. Enter `secret_sauce` into the password field.
3. Click the **Login** button.

### Expected Result

- Login succeeds.
- User is redirected to `/inventory.html`.
- Inventory page is displayed.
- Products are visible.


## TC-LOGIN-002 – Locked out user cannot log in

**Priority:** High  
**Type:** Negative  

### Preconditions

- User is on the SauceDemo login page.
- User is not already authenticated.

### Test Data

- Username: `locked_out_user`
- Password: `secret_sauce`

### Steps

1. Enter `locked_out_user` into the username field.
2. Enter `secret_sauce` into the password field.
3. Click the **Login** button.

### Expected Result

- Login is rejected.
- User remains on the login page.
- An error message is displayed.
- The error message is:

`Epic sadface: Sorry, this user has been locked out.`


## TC-LOGIN-003 – Login with empty username and password

**Priority:** High  
**Type:** Negative

### Preconditions

- User is on the SauceDemo login page.
- User is not authenticated.

### Test Data

- Username: empty
- Password: empty

### Steps

1. Leave the username field empty.
2. Leave the password field empty.
3. Click the **Login** button.

### Expected Result

- Login is not successful.
- User remains on the login page.
- An appropriate validation error is displayed.
- User is not redirected to `/inventory.html`.


# Medium Priority

## TC-LOGIN-004 – Valid username with blank password

**Priority:** Medium  
**Type:** Negative

### Preconditions

- User is on the SauceDemo login page.
- User is not authenticated.

### Test Data

- Username: `standard_user`
- Password: empty

### Steps

1. Enter `standard_user` into the username field.
2. Leave the password field empty.
3. Click the **Login** button.

### Expected Result

- Login is rejected.
- User remains on the login page.
- An appropriate validation error is displayed.
- User is not redirected to `/inventory.html`.


## TC-LOGIN-005 – Blank username with valid password

**Priority:** Medium  
**Type:** Negative

### Preconditions

- User is on the SauceDemo login page.
- User is not authenticated.

### Test Data

- Username: empty
- Password: `secret_sauce`

### Steps

1. Leave the username field empty.
2. Enter `secret_sauce` into the password field.
3. Click the **Login** button.

### Expected Result

- Login is rejected.
- User remains on the login page.
- An appropriate validation error is displayed.
- User is not redirected to `/inventory.html`.


## TC-LOGIN-006 – Login with invalid credentials

**Priority:** Medium  
**Type:** Negative

### Preconditions

- User is on the SauceDemo login page.
- User is not authenticated.

### Test Data

| Username | Password |
|---|---|
| `invalid_user` | `secret_sauce` |
| `standard_user` | `wrong_password` |
| `invalid_user` | `wrong_password` |

### Steps

1. Enter an invalid username and/or password.
2. Click the **Login** button.
3. Repeat the test with the other invalid credential combinations.

### Expected Result

- Login is rejected for every invalid credential combination.
- User remains on the login page.
- An appropriate authentication error is displayed.
- User is not redirected to `/inventory.html`.


## TC-LOGIN-007 – Password is case-sensitive

**Priority:** Medium  
**Type:** Negative

### Preconditions

- User is on the SauceDemo login page.
- User is not authenticated.

### Test Data

- Username: `standard_user`
- Correct password: `secret_sauce`
- Incorrect case variations:
  - `Secret_sauce`
  - `secret_Sauce`
  - `SECRET_SAUCE`

### Steps

1. Enter `standard_user` into the username field.
2. Enter a case-modified version of `secret_sauce`.
3. Click the **Login** button.
4. Repeat with additional case variations.

### Expected Result

- Login fails when the password differs only by letter case.
- User remains on the login page.
- An appropriate authentication error is displayed.
- User is not redirected to `/inventory.html`.


## TC-LOGIN-008 – Successful login with problem_user

**Priority:** Medium  
**Type:** Positive  

### Preconditions

- User is on the SauceDemo login page.
- User is not already authenticated.

### Test Data

- Username: `problem_user`
- Password: `secret_sauce`

### Steps

1. Enter `problem_user` into the username field.
2. Enter `secret_sauce` into the password field.
3. Click the **Login** button.

### Expected Result

- Login succeeds.
- User is redirected to `/inventory.html`.
- Inventory page is displayed.
- Products are visible.


## TC-LOGIN-009 – performance_glitch_user reaches inventory within a maximum of 10 seconds

**Priority:** Medium  
**Type:** Positive / Performance  

### Preconditions

- User is on the SauceDemo login page.
- User is not already authenticated.

### Test Data

- Username: `performance_glitch_user`
- Password: `secret_sauce`

### Steps

1. Enter `performance_glitch_user` into the username field.
2. Enter `secret_sauce` into the password field.
3. Click the **Login** button.

### Expected Result

- Login succeeds within a maximum of 10 seconds.
- The application does not fail because of the intentional loading delay.
- User is redirected to `/inventory.html`.
- Inventory page is displayed.
- Products are visible.

# Low Priority

## TC-LOGIN-010 – Submit login form using Enter key

**Priority:** Low  
**Type:** Usability / Edge Case

### Preconditions

- User is on the SauceDemo login page.
- User is not authenticated.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`

### Steps

1. Enter `standard_user` into the username field.
2. Enter `secret_sauce` into the password field.
3. Press the **Enter** key while the password field is focused.
4. Verify the login result.
5. Repeat the test by pressing **Enter** while the username field is focused, if supported by the application.

### Expected Result

- The login form can be submitted using the Enter key where the application supports this behavior.
- Login succeeds with valid credentials.
- User is redirected to `/inventory.html`.
