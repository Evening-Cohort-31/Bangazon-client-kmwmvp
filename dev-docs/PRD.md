<!-- Last updated: 2026-05-04 -->
<!-- Last change: Initial PRD creation -->

# Bangazon - Product Requirements Document

## Problem Statement

Bangazon is a Nashville Software School (NSS) group project that simulates a real e-commerce platform. The goal is to give students hands-on experience building and debugging a Django REST API that powers a pre-built Next.js frontend client.

The project spans 6 sprint sessions over 6 weeks. The team inherits a working but incomplete system: a Next.js client provided by NSS, a Django backend with known bugs and missing features, and a predefined set of tickets covering features, bug fixes, tests, and reports.

The team is responsible for completing all provided tickets in the backend (primary work), making targeted frontend modifications where tickets require it, writing integration tests, generating Django template-based HTML reports, and completing two learning spikes.

## Target Users

- **Shoppers:** Authenticated users who browse products, manage a cart, complete orders, and interact with sellers.
- **Sellers:** Authenticated users who create stores and list products for sale.
- **Business Analysts:** Users who access Django-rendered HTML reports on orders, products, and customer behavior.
- **Development Team:** Dale Hobbs, James Freeman, Nicole D'Anton, Lea Edwards.

## Core Requirements

### Features

- Store listing: store name, description, seller name, product count, and current products
- Cart management: delete a full order or remove individual line items
- Product filtering: by minimum price, by category, by location
- Product recommendations: send a product recommendation to another user by username
- Seller profile: "My Store" view with selling and sold product sections
- Store creation: form to create a new store with name and description
- Product likes: like and unlike products; liked products appear on user profile
- Favorite sellers: add a store to favorites; favorites appear on user profile
- Category-based product list: five most recent products grouped by category; filtered view shows a single "Products matching filters" header

### Bug Fixes

- Orders view: order data not displaying in table rows
- Cart item removal: trash icon does not remove item from cart
- Complete Order flow: order not marked complete after payment type is selected
- Payment types: all payment types returned instead of only the authenticated user's
- Payment type expiration dates displaying incorrectly
- Line item deletion: DELETE to /lineitems/n not removing the item
- Products number_sold filter not working
- ZeroDivisionError on all product requests caused by average rating calculation
- User profile: wrong profile returned regardless of auth token
- New cart after completed order: products incorrectly associated with the closed order
- Cart response: duplicate line_items key needs to be removed

### Reports (Django Templates)

- Favorite sellers: customers and their favorited sellers, filtered by customer id
- Complete orders: order id, customer name, total paid, payment type
- Incomplete orders: order id, customer name, total cost of items
- Inexpensive products: all products priced at $999 or less
- Expensive products: all products priced at $1000 or more

### Tests

- Product rating: verify rating can be added and avg_rating is correct
- Product deletion: verify deleted product is not returned to users
- Payment type deletion: verify a payment type can be deleted
- Cart/order integrity: verify adding a product to cart uses an open order, not a closed one
- Payment type on order: verify a payment type can be assigned to an order

### Learning Spikes

- TanStack Query: investigate and partially implement as a replacement for useAppContext() on shared state in the Next.js client
- TypeScript: team introduction to core concepts; exploration only, no conversion required

## Technical Stack

### Stack Decisions

- **Frontend: Next.js + Bulma CSS** - Pre-built and provided by NSS. The team makes targeted modifications where tickets require it.
- **Backend: Django + Django REST Framework (Python)** - The primary area of work. NSS provided a starter repo with known bugs and missing features.
- **Database: SQLite (Django default)** - Development only; no production deployment planned.
- **Reports: Django Templates** - HTML reports rendered server-side; no React pages for reports.
- **Testing: Django Test Framework** - Integration and unit tests written in Python.
- **Version Control: Git / GitHub** - Team workflow defined in PROJECT_WORKFLOW.md.

## Scope

### In Scope (6 Sprints)

- All 36 provided tickets (features, bugs, reports, tests, learning spikes)
- Backend API development and bug fixes (primary effort)
- Django template-based HTML reports
- Integration and unit tests for key behaviors
- Targeted frontend modifications required by tickets
- TanStack Query spike in the Next.js client
- TypeScript learning spike (exploration only)

### Out of Scope

- Full TypeScript conversion of the codebase
- Production deployment or hosting
- Features not listed in the provided tickets
- Full redesign or restructure of the Next.js client

## Success Criteria

- All 36 tickets completed by the end of sprint 6
- All team members contribute across frontend and backend
- Test suite passes with no failures
- ZeroDivisionError on /products resolved early (sprint 1 or 2, critical bug)
- TanStack Query implemented for at least one shared state use case
- Each team member can explain TypeScript basics by end of the TypeScript spike

## Learning Goals

- Build, extend, and debug Django REST API endpoints with Django REST Framework
- Write integration and unit tests in Django that cover real database behavior
- Understand and implement TanStack Query as an alternative to prop drilling and useAppContext()
- Get introduced to TypeScript fundamentals and understand when and why to use it
- Practice a real team Git workflow: branching, PRs, code review, and the team working agreement in PROJECT_WORKFLOW.md
- Understand the full-stack data flow between a Next.js client and a Django API
