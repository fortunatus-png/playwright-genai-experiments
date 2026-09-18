# SauceDemo – Inventory Test Cases

This document contains the test cases for the inventory functionality of SauceDemo.

**Application:** https://www.saucedemo.com/  
**Feature:** Inventory  
**Test Type:** UI / Functional / Positive / Edge Case  
**Automation:** Playwright


# High Priority

## TC-INVENTORY-001 – Products are displayed

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`

### Steps

1. Log in with `standard_user`.
2. Verify that the inventory page is displayed.
3. Verify that products are visible.

### Expected Result

- The inventory page is displayed.
- The page title **Products** is visible.
- Six products are displayed.
- Each product contains the expected product information, such as:
  - Product name
  - Product image
  - Product price
  - Add to cart button


## TC-INVENTORY-002 – Sort products by name

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.
- User is on the inventory page.
- Products are displayed.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`
- Sort options:
  - `Name (A to Z)`
  - `Name (Z to A)`

### Steps

1. Log in with `standard_user`.
2. Open the product sorting dropdown.
3. Select **Name (A to Z)**.
4. Verify the order of the displayed products.
5. Open the product sorting dropdown again.
6. Select **Name (Z to A)**.
7. Verify the order of the displayed products.

### Expected Result

- The sorting dropdown is displayed.
- **Name (A to Z)** can be selected.
- Products are sorted alphabetically in ascending order by product name.
- **Name (Z to A)** can be selected.
- Products are sorted alphabetically in descending order by product name.
- The products are displayed in the correct order for both sorting options.


## TC-INVENTORY-003 – Sort products by price

**Priority:** High  
**Type:** Positive  

### Preconditions

- User has valid `standard_user` credentials.
- User is on the inventory page.

### Test Data

- Username: `standard_user`
- Password: `secret_sauce`

### Steps

1. Log in with `standard_user`.
2. Open the product sorting dropdown.
3. Select **Price (low to high)**.
4. Verify the order of the displayed products.
5. Select **Price (high to low)**.
6. Verify the order of the displayed products again.

### Expected Result

- **Price (low to high)** can be selected.
- Products are sorted from the lowest price to the highest price.
- **Price (high to low)** can be selected.
- Products are sorted from the highest price to the lowest price.


# Medium Priority

## TC-INVENTORY-004 – Open product details

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
2. Click the product **Sauce Labs Backpack**.
3. Verify that the product details page is displayed.

### Expected Result

- The product details page is displayed.
- The product name **Sauce Labs Backpack** is displayed.
- The product image is displayed.
- The product description is displayed.
- The product price is displayed.
- The **Add to cart** button is displayed.
- The displayed product corresponds to the product selected on the inventory page.


## TC-INVENTORY-005 – Add a product to the cart

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
2. Locate the product **Sauce Labs Backpack**.
3. Click the **Add to cart** button for the product.
4. Verify the shopping cart.

### Expected Result

- The product is added to the shopping cart.
- The shopping cart displays a quantity of `1`.
- The selected product is displayed in the cart.
- The **Add to cart** button changes to **Remove** for the selected product.


## TC-INVENTORY-006 – Add multiple products to the cart

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
  - `Sauce Labs Bolt T-Shirt`

### Steps

1. Log in with `standard_user`.
2. Add **Sauce Labs Backpack** to the cart.
3. Add **Sauce Labs Bike Light** to the cart.
4. Add **Sauce Labs Bolt T-Shirt** to the cart.
5. Open the shopping cart.
6. Verify the selected products.

### Expected Result

- All selected products are added to the shopping cart.
- The shopping cart displays a quantity of `3`.
- All three selected products are displayed in the cart.
- No additional products are added to the cart.


## TC-INVENTORY-007 – Remove a product from the cart

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
5. Verify that both products are displayed.
6. Remove **Sauce Labs Backpack** from the cart.
7. Verify the shopping cart.

### Expected Result

- Both products are initially displayed in the cart.
- **Sauce Labs Backpack** is removed from the cart.
- **Sauce Labs Bike Light** remains in the cart.
- The shopping cart quantity is `1`.
- **Sauce Labs Backpack** is no longer displayed in the cart.
