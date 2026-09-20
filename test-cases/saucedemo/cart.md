# SauceDemo – Cart Test Cases

This document contains the test cases for the shopping cart functionality of SauceDemo.

**Application:** https://www.saucedemo.com/  
**Feature:** Cart  
**Test Type:** UI / Functional / Positive  
**Automation:** Playwright

# High Priority

## TC-CART-001 – Product is displayed in the cart

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.
- User is on the inventory page.
- Products are displayed.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Verify the cart contents.

### Expected Result

- The shopping cart is displayed.
- **Sauce Labs Backpack** is displayed in the cart.
- The shopping cart contains exactly one product.
- The product is displayed with the expected product information.

## TC-CART-002 – Remove a product from the cart

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.
- User is on the inventory page.
- Products are displayed.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Verify that **Sauce Labs Backpack** is displayed.
5. Remove **Sauce Labs Backpack** from the cart.
6. Verify the shopping cart.

### Expected Result

- **Sauce Labs Backpack** is initially displayed in the cart.
- **Sauce Labs Backpack** is removed from the cart.
- The product is no longer displayed in the cart.
- The shopping cart is empty.

# Medium Priority

## TC-CART-003 – Verify product quantity and product name

**Priority:** Medium  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.
- User is on the inventory page.
- Products are displayed.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Products:
  - `Sauce Labs Backpack`
  - `Sauce Labs Bike Light`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Add **Sauce Labs Bike Light** to the cart.
4. Open the shopping cart.
5. Verify the shopping cart quantity.
6. Verify the product names.

### Expected Result

- The shopping cart displays a quantity of `2`.
- **Sauce Labs Backpack** is displayed in the cart.
- **Sauce Labs Bike Light** is displayed in the cart.
- No additional products are displayed in the cart.

## TC-CART-004 – Navigate back to shopping

**Priority:** Medium  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.
- User is on the inventory page.
- Products are displayed.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Product: `Sauce Labs Backpack`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Open the shopping cart.
4. Click **Continue Shopping**.
5. Verify the inventory page.

### Expected Result

- The user is navigated back to the inventory page.
- The **Products** title is displayed.
- The inventory products are displayed.
- **Sauce Labs Backpack** remains in the cart.
