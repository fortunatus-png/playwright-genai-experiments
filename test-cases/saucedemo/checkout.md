# SauceDemo – Checkout Test Cases

This document contains the test cases for the checkout functionality of SauceDemo.

**Application:** https://www.saucedemo.com/  
**Feature:** Checkout  
**Test Type:** UI / Functional / Positive / Negative  
**Automation:** Playwright

# High Priority

## TC-CHECKOUT-001 – Checkout with valid data

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`
- First Name: `Max`
- Last Name: `Mustermann`
- Postal Code: `12345`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Click **Checkout**.
5. Enter `Max` as the first name.
6. Enter `Mustermann` as the last name.
7. Enter `12345` as the postal code.
8. Click **Continue**.
9. Verify that the checkout overview is displayed.

### Expected Result

- The checkout information form is displayed.
- The first name can be entered.
- The last name can be entered.
- The postal code can be entered.
- The user can continue to the next checkout step.
- The user is redirected to `/checkout-step-two.html`.
- The checkout overview is displayed.

## TC-CHECKOUT-002 – First name is required

**Priority:** High  
**Type:** Negative  

### Preconditions

- User has valid `standard_user` credentials.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`
- First Name: empty
- Last Name: `Mustermann`
- Postal Code: `12345`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Click **Checkout**.
5. Leave the first name empty.
6. Enter `Mustermann` as the last name.
7. Enter `12345` as the postal code.
8. Click **Continue**.
9. Verify the validation message.

### Expected Result

- The user remains on the checkout information page.
- The checkout cannot continue without a first name.
- The error message **Error: First Name is required** is displayed.

## TC-CHECKOUT-003 – Verify checkout order overview

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`
- First Name: `Max`
- Last Name: `Mustermann`
- Postal Code: `12345`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Click **Checkout**.
5. Enter valid checkout information.
6. Click **Continue**.
7. Verify the checkout overview.

### Expected Result

- The checkout overview is displayed.
- The URL is `/checkout-step-two.html`.
- **Sauce Labs Backpack** is displayed in the order.
- The product quantity is displayed as `1`.
- The product price is displayed.
- The payment information section is displayed.
- The shipping information section is displayed.
- The item total is displayed.
- The total price is displayed.
- The **Finish** button is displayed.

# Medium Priority

## TC-CHECKOUT-004 – Complete the order and verify confirmation

**Priority:** Medium  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`
- First Name: `Max`
- Last Name: `Mustermann`
- Postal Code: `12345`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Click **Checkout**.
5. Enter valid checkout information.
6. Click **Continue**.
7. Verify that the checkout overview is displayed.
8. Click **Finish**.
9. Verify the order confirmation page.
10. Verify the confirmation message.

### Expected Result

- The order can be completed successfully.
- The user is redirected to `/checkout-complete.html`.
- The order confirmation page is displayed.
- The confirmation title **Thank you for your order!** is displayed.
- The order confirmation message is displayed.

## TC-CHECKOUT-005 – Last name is required

**Priority:** Medium  
**Type:** Negative  

### Preconditions

- User has valid `standard_user` credentials.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`
- First Name: `Max`
- Last Name: empty
- Postal Code: `12345`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Click **Checkout**.
5. Enter `Max` as the first name.
6. Leave the last name empty.
7. Enter `12345` as the postal code.
8. Click **Continue**.
9. Verify the validation message.

### Expected Result

- The user remains on the checkout information page.
- The checkout cannot continue without a last name.
- The error message **Error: Last Name is required** is displayed.