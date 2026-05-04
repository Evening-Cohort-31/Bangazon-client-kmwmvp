# Bangazon

Bangazon is a full-stack e-commerce platform where users can browse products, manage their own store, add items to a cart, and complete orders with saved payment methods. This repository is the **Next.js client** that consumes the [Bangazon API](https://github.com/Evening-Cohort-31/Bangazon-api-kmwmvp).

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bulma](https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=bulma&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

---

## Related Repository

| Repo                                                                     | Description                    |
| ------------------------------------------------------------------------ | ------------------------------ |
| [Bangazon API](https://github.com/Evening-Cohort-31/Bangazon-api-kmwmvp) | Django REST Framework back end |

---

## Documentation

Project docs live in [`dev-docs/`](dev-docs/):

| File | Description |
| ---- | ----------- |
| [PRD.md](dev-docs/PRD.md) | Project requirements, scope, and learning goals |
| [ARCHITECTURE.md](dev-docs/ARCHITECTURE.md) | System overview, codebase map, API endpoints, and key technical decisions |
| [erd.dbml](dev-docs/erd.dbml) | Full database schema in DBML format |

---

## Features

- **Authentication** — register and log in with token-based auth
- **Products** — browse, search, filter, create, edit, and delete products
- **Stores** — view all stores, manage your own store and its inventory
- **Cart** — add products to a cart and update quantities
- **Orders** — check out, view order history, and review order details
- **Payments** — save and manage payment methods at checkout
- **Ratings** — leave and view product ratings

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- The [Bangazon API](https://github.com/Evening-Cohort-31/Bangazon-api-kmwmvp) running locally on port `8000`

### Steps

1. Clone the repository:

   ```bash
   git clone git@github.com:Evening-Cohort-31/Bangazon-client-kmwmvp.git
   cd Bangazon-client-kmwmvp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

> The client expects the API to be available at `http://localhost:8000`. Make sure the Django server is running before starting the client.

---

## Contributors

| Name | GitHub |
| ---- | ------ |
| Dale Hobbs | [@DaleHobbs-Dev](https://github.com/DaleHobbs-Dev) |
| James Freeman | [@jamesfreeman114](https://github.com/jamesfreeman114) |
| Nicole D'Anton | [@nicolecdanton](https://github.com/nicolecdanton) |
| Lea Edwards | [@LeaEdw](https://github.com/LeaEdw) |
| Steve Brownlee | [@stevebrownlee](https://github.com/stevebrownlee) |
| Valerie Freeman | [@Valerie-Freeman](https://github.com/Valerie-Freeman) |

## Examples

![](./demo_resrcs/site_demo.gif)
![](./demo_resrcs/product_detail.png)
![](./demo_resrcs/store_detail.png)
