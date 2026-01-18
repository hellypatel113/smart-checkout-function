# Smart Checkout – Shipping Based COD Payment Control

## Hackathon Challenge 3: Smart Checkout with Shopify Functions  
**Theme:** Smarter Checkout Experiences  
**Difficulty:** Beginner  
**Time Limit:** ~2 Hours  
**Technology:** Shopify Functions (JavaScript)  
**API Used:** Payment Customization API  

---

## Overview

This project implements a **Shopify Payment Customization Function** that dynamically controls the visibility of payment methods during checkout based on:

- Selected **shipping method**
- **Cart total value**

The goal is to reduce revenue loss caused by high-value **Cash on Delivery (COD)** orders while maintaining a smooth and intuitive checkout experience.

---

## Merchant Use Case

Shubham runs **Aiza**, an Arab beauty products Shopify store.  
While COD increases conversions for low-value orders, it causes high return rates for expensive orders.

To solve this, the checkout logic enforces:

- COD payment visibility only when **COD shipping** is selected
- Credit Card payment visibility only when **Standard shipping** is selected
- Complete removal of COD for carts worth **$550 or more**

All logic runs server-side using **Shopify Functions**, ensuring speed, security, and reliability.

---

## Prerequisites – Shipping Methods Setup

Before using this function, configure the following shipping methods in your Shopify store:

### 1️⃣ Standard Shipping
- **Name:** `Standard`
- **Rate:** Free ($0)
- **Description:** Regular delivery within 5–7 business days

### Cash on Delivery Shipping
- **Name:** `Cash on Delivery`
- **Rate:** $15
- **Description:** Pay when your order arrives (COD fee applies)

> ⚠️ Shipping method name matching is handled case-insensitively.

---

## Objective

Build a **Payment Customization Function** that enforces the following rules:

### Shipping-Based Rules
- **COD Shipping selected**
  - Show **Cash on Delivery** payment method *(only if cart < $550)*
  - Hide **Credit Card** payment method

- **Standard Shipping selected**
  - Show **Credit Card** payment method
  - Hide **Cash on Delivery** payment method

### Cart Value Restriction
- **Cart ≥ $550**
  - Hide **Cash on Delivery** completely (shipping + payment)
- **Cart < $550**
  - COD allowed **only when COD shipping is selected**

---

## Test Scenarios

| Shipping Method | Cart Total | Expected Behavior |
|----------------|-----------|------------------|
| Standard       | $150      | Credit Card visible, COD hidden |
| Standard       | $350      | Credit Card visible, COD hidden |
| COD            | $150      | COD visible, Credit Card hidden |
| COD            | $549      | COD visible, Credit Card hidden |
| COD            | $550      | COD hidden, only Standard + Credit Card visible |

---

## Key Features

- Server-side checkout logic using **Shopify Functions**
- Dynamic response to **shipping method changes**
- Exact threshold handling for `$550`
- Case-insensitive shipping name detection
- Clean and readable JavaScript logic
- No databases or external APIs required

---

## 🏗 Project Structure

