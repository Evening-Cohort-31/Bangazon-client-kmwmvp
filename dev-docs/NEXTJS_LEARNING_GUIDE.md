# Quick Next.js Learning Guide

This guide is meant to help our team quickly understand the Next.js concepts we are most likely to encounter while working on this project.

Next.js is built on top of React, but it adds structure and conventions for routing, layouts, rendering, data fetching, and project organization. In a regular React project, we often define routes manually and decide most of the folder structure ourselves. In Next.js, the framework expects certain files and folders to have special meaning.

> **Important:** Next.js has two routing systems: the **Pages Router** (older, uses a `pages/` directory) and the **App Router** (newer, uses an `app/` directory). **This project uses the Pages Router.** If you search Next.js docs or tutorials online, make sure the example you are reading is for the Pages Router, not the App Router. The two systems work very differently.

---

## 1. File-Based Routing

In Next.js Pages Router, routes are created by the file structure inside the `pages/` directory. Every `.js` file in `pages/` automatically becomes a URL.

For example, this file:

```txt
pages/products/index.js
```

creates the route:

```txt
/products
```

And this file:

```txt
pages/products/new.js
```

creates the route:

```txt
/products/new
```

A folder with square brackets creates a dynamic route:

```txt
pages/products/[id]/index.js
```

creates a dynamic route like:

```txt
/products/5
```

### This Project's Routes

| File | URL |
| --- | --- |
| `pages/index.js` | `/` |
| `pages/login.js` | `/login` |
| `pages/register.js` | `/register` |
| `pages/profile.js` | `/profile` |
| `pages/cart.js` | `/cart` |
| `pages/my-orders.js` | `/my-orders` |
| `pages/payments.js` | `/payments` |
| `pages/products/index.js` | `/products` |
| `pages/products/new.js` | `/products/new` |
| `pages/products/[id]/index.js` | `/products/:id` |
| `pages/products/[id]/edit.js` | `/products/:id/edit` |
| `pages/stores/index.js` | `/stores` |
| `pages/stores/new.js` | `/stores/new` |
| `pages/stores/[id]/index.js` | `/stores/:id` |
| `pages/stores/[id]/edit.js` | `/stores/:id/edit` |

### Tips for This Project

- When you want to understand what a URL shows, find the matching file in `pages/`.
- Unlike some Next.js tutorials, there are no files named `page.jsx` in this project. Each route file is simply a `.js` file that exports a default React component.
- Dynamic route folders use square brackets, like `[id]`.

---

## 2. Page Files in the `pages/` Directory

In the Pages Router, the file itself IS the page. There is no special filename convention like `page.jsx`. You just export a default React component from the file, and Next.js renders it at the matching URL.

Here is the actual products page (`pages/products/index.js`):

```js
import { useEffect, useState } from 'react'
import { getProducts } from '../../data/products'
import { ProductCard } from '../../components/product/card'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(data => {
      if (data) setProducts(data)
    })
  }, [])

  return (
    <div className="columns is-multiline">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
```

### Tips for This Project

When debugging a page, find its file in `pages/`. From there, trace:

1. What state is being tracked with `useState`
2. What API call is being made in `useEffect`
3. Which components are being rendered
4. What props are being passed down

---

## 3. The `getLayout` Pattern

Most Next.js tutorials show a single global layout file that wraps every page. This project uses a different approach: each page declares its own layout by exporting a `getLayout` function at the bottom of the file.

Here is how it works, step by step.

**Step 1: `_app.js` checks for a `getLayout` function on each page.**

```js
// pages/_app.js
export default function Bangazon({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
```

`Component` is whatever page is currently being rendered. If that page exports a `getLayout` function, `_app.js` calls it to wrap the page in its layout. If not, the page renders without any wrapper.

**Step 2: Each page declares what layout it wants.**

```js
// pages/products/index.js (bottom of the file)
Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
```

`page` here is the `<Products />` component itself. The function wraps it in `<Layout>` and `<Navbar>` and returns the result.

**Step 3: `components/layout.js` provides the shared shell.**

```js
// components/layout.js
import { AppWrapper } from '../context/state'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <main className="container">{children}</main>
    </AppWrapper>
  )
}
```

`Layout` wraps its children in `AppWrapper`, which is what gives every page access to the shared `token` and `profile` context. This means **context is only available on pages that include `<Layout>` in their `getLayout`**.

### Tips for This Project

- If you add a new page and need the navbar and auth context to work, add a `getLayout` at the bottom of your page file.
- If a page is rendering without a navbar, check whether it has a `getLayout` defined.
- The `getLayout` pattern gives each page control over its own layout, rather than one global layout file controlling everything.

---

## 4. `_app.js`: The App Entry Point

`pages/_app.js` is the entry point for the entire Next.js application. Every page render passes through it.

```js
// pages/_app.js
import '../global.css'
import '../design/design.css'

export default function Bangazon({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
```

- `Component` is the page currently being rendered (e.g., `Products`, `Login`, `Cart`)
- `pageProps` are any props that Next.js pre-loads for that page (not used in this project, but required by the pattern)
- Global CSS imports live here so they apply to every page

### Tips for This Project

- Global styles are imported here. If a style is not applying, check whether it is imported in `_app.js`.
- If you need something to run on every page load (e.g., setting up analytics), this is where it would go.
- Do not move the `getLayout` logic out of `_app.js`. It is the mechanism every page depends on.

---

## 5. AppContext and `useAppContext()`

This project uses React Context to share two pieces of global state across all pages: the user's **auth token** and their **profile**. This lives in `context/state.js`.

### What it provides

```js
// context/state.js (simplified)
const AppContext = createContext()

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token) {
      getUserProfile().then(profileData => setProfile(profileData))
    }
  }, [token])

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
```

On app load, `AppWrapper` reads the token from `localStorage`. When the token is set, it fetches the user's profile from the API and stores it in context. Both values are then available to any component inside a `<Layout>`.

### How to use it in a component

```js
import { useAppContext } from '../context/state'

export default function Navbar() {
  const { token, profile } = useAppContext()

  // token is the auth string, e.g. "abc123"
  // profile is the user's profile object, e.g. { id: 1, username: "dale", store: {...} }
}
```

### The four values in context

| Value | Type | What it is |
| --- | --- | --- |
| `token` | string | The auth token from `localStorage`. Empty string if not logged in. |
| `setToken` | function | Call this after login to store the token and trigger the profile fetch. |
| `profile` | object | The user's profile from `GET /my-profile`. Empty object if not logged in. |
| `setProfile` | function | Rarely called directly; profile updates automatically when token changes. |

### Tips for This Project

- Use `useAppContext()` in any component that needs to know who the user is or check if they are logged in.
- `profile.store` will exist if the logged-in user owns a store. This is how the navbar decides whether to show "View Your Store" or "Interested in selling?".
- Context is only available inside a `<Layout>` wrapper. A page that skips `getLayout` will not have access to `token` or `profile`.

---

## 6. Data Fetching with `useEffect`

This project does not use server-side data fetching. All API calls happen in the browser after the page loads, using the standard React pattern: `useEffect` to trigger the fetch and `useState` to store the result.

### The pattern

```js
const [products, setProducts] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  getProducts().then(data => {
    if (data) {
      setProducts(data)
      setIsLoading(false)
    }
  })
}, [])
```

- The empty array `[]` means the effect runs once when the component mounts.
- The API function comes from the `data/` directory (e.g., `data/products.js`).
- The result is stored in `useState` and passed down to child components as props.

### Where API functions live

All API calls are organized in `data/`, one file per resource:

| File | What it handles |
| --- | --- |
| `data/products.js` | Fetch, create, update, delete products; like, recommend, rate |
| `data/orders.js` | Fetch cart, fetch order history, complete an order |
| `data/stores.js` | Fetch, create, update stores; favorite/unfavorite |
| `data/auth.js` | Login, register, fetch user profile |
| `data/payment-types.js` | Fetch, add, delete payment types |
| `data/fetcher.js` | Base fetch utility used by all of the above |

### How `fetcher.js` works

Every function in the `data/` modules calls one of two helpers from `fetcher.js`:

- **`fetchWithResponse`**: use when the API returns a JSON body (GET, POST that returns data)
- **`fetchWithoutResponse`**: use when the API returns no body (DELETE, some PUTs)

Both helpers automatically:

- Add the base URL (`http://localhost:8000`)
- Redirect to `/login` on a `401` response
- Return `null` on a `404` response

The auth token is read directly from `localStorage` in each data function. You do not need to pass the token manually.

### Tips for This Project

When debugging data:

1. Find the page or component that displays the data.
2. Find the `data/` function being called in the `useEffect`.
3. Check the URL being requested (open the Network tab in browser dev tools).
4. Check whether the response shape matches what the component expects.
5. Check whether the backend server is running on `localhost:8000`.

---

## 7. Route Params and `useRouter`

Dynamic routes like `pages/products/[id]/index.js` expose the `[id]` value through the `useRouter` hook.

**Important:** In this project, `useRouter` is always imported from `next/router`. Some tutorials show `next/navigation`, but that is for the App Router and will not work here.

```js
import { useRouter } from 'next/router'  // correct for this project

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query  // reads the [id] from the URL

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => setProduct(data))
    }
  }, [id])
}
```

The `if (id)` guard is important. On the first render, `router.query` may be empty while Next.js is still hydrating the page. Checking that `id` exists before making the API call prevents a fetch with an undefined ID.

### Tips for This Project

- Always check `if (id)` before using a route param in a `useEffect`.
- Put `id` in the dependency array `[id]` so the effect re-runs if the route changes.
- For nested routes like `pages/stores/[id]/edit.js`, the param name is still `id` and is accessed the same way.

---

## 8. Navigation

### `Link` for standard navigation

Use the `Link` component from `next/link` for any navigation that happens when a user clicks something.

```js
import Link from 'next/link'

<Link href="/products">Products</Link>
<Link href={`/stores/${store.id}`}>View Store</Link>
```

`Link` handles client-side navigation without a full page reload.

### `useRouter` for programmatic navigation

Use `router.push()` when navigation needs to happen as the result of an action, not a direct click on a link.

```js
import { useRouter } from 'next/router'  // not 'next/navigation'

const router = useRouter()

// after login:
router.push('/products')

// after logout:
localStorage.removeItem('token')
router.push('/login')
```

### Tips for This Project

Use `Link` for:

- Navbar links
- Product/store card links
- Any static "go to this page" interaction

Use `router.push()` for:

- After a form is submitted (redirect to the detail page)
- After login (redirect to products)
- After logout (redirect to login)
- After deleting something (redirect away from the deleted resource)

---

## 9. Environment Variables

Next.js projects use `.env.local` for environment variables that should not be committed to source control.

Variables that need to be available in the browser must start with `NEXT_PUBLIC_`:

```txt
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Variables without that prefix are server-only and will be `undefined` in the browser.

### This project's current setup

The API base URL is currently **hardcoded** in `data/fetcher.js`:

```js
const API_URL = 'http://localhost:8000'
```

There is a `data/settings.js` file that exports `apiHost`, but it is not connected to `fetcher.js` and is effectively unused. It also uses the `REACT_APP_` prefix, which is a Create React App convention and does not work in Next.js. If we ever want to make the API URL configurable via an environment variable, the variable would need to be `NEXT_PUBLIC_API_URL` and `fetcher.js` would need to import it.

### Tips for This Project

If the frontend is failing to reach the backend:

- Make sure the Django backend is running on `localhost:8000`
- Check `data/fetcher.js` to confirm the hardcoded URL is correct
- Open the browser Network tab and check the request URL and response

---

## 10. Error Messages and Debugging

Next.js provides helpful browser error overlays during development. These often show:

- Which file caused the error
- The line number
- A description of what went wrong

### Tips for This Project

When an error appears:

1. Read the first meaningful error message before scrolling.
2. Note the file and line number.
3. If the error says something about hooks being called conditionally or in the wrong order, check your `useEffect` and `useState` calls.
4. If the error says a value is undefined, check whether the data has loaded yet. API calls are async, so components often render once before data arrives.
5. If a page is blank and there is no visible error, open the browser console (F12) and check for errors there.
6. Use `console.log()` to inspect values during debugging. Remove logs before opening a PR.

---

## 11. TanStack Query (Future Work)

TanStack Query is a library that manages server state in React applications. It can replace the `useEffect` + `useState` data-fetching pattern with a more powerful caching and refetching system.

**This is not currently in use in this project.** It is planned as a learning spike (ticket #35) to explore whether it makes sense to adopt for this codebase.

When that ticket is worked on, TanStack Query would be useful for:

- Fetching and caching products, cart contents, profile data
- Automatically refetching after a mutation (e.g., re-loading the cart after adding a product)
- Tracking loading and error states without manual `useState` flags
- Reducing duplicate fetch calls across components

If you want to get ahead of that ticket, the TanStack Query docs have a good Pages Router quickstart that fits this project's setup.

---

## 12. TypeScript (Stretch Goal)

This project is written in plain JavaScript (`.js` files). TypeScript is on the stretch goal list (ticket #36) but is not in scope for the current sprint.

Common TypeScript file extensions:

```txt
.ts   — TypeScript without JSX
.tsx  — TypeScript with JSX/React components
```

If you encounter TypeScript in a branch or are curious what it would look like, here is an example of how a `Product` type might be defined:

```ts
type Product = {
  id: number
  name: string
  price: number
  description: string
  location: string
}
```

TypeScript makes the shape of API responses explicit, which helps prevent bugs when the backend returns something unexpected. But until ticket #36 is picked up, stay in `.js`.

---

## 13. This Project's Files and Folders

```txt
bangazon-client/
├── pages/                  # Every file here is a route
│   ├── _app.js             # App entry point; applies per-page layouts
│   ├── index.js            # / → renders the Products page
│   ├── login.js            # /login
│   ├── register.js         # /register
│   ├── profile.js          # /profile
│   ├── cart.js             # /cart
│   ├── my-orders.js        # /my-orders
│   ├── payments.js         # /payments
│   └── products/
│   │   ├── index.js        # /products
│   │   ├── new.js          # /products/new
│   │   └── [id]/
│   │       ├── index.js    # /products/:id
│   │       └── edit.js     # /products/:id/edit
│   └── stores/
│       ├── index.js        # /stores
│       ├── new.js          # /stores/new
│       └── [id]/
│           ├── index.js    # /stores/:id
│           └── edit.js     # /stores/:id/edit
│
├── components/             # Reusable UI components
│   ├── layout.js           # Shared page shell; wraps children in AppWrapper
│   ├── navbar.js           # Top nav; reads token and profile from AppContext
│   ├── filter.js           # Product search/filter UI
│   ├── product/            # ProductCard, ProductDetail, ProductForm
│   ├── store/              # StoreCard, StoreDetail, StoreForm
│   ├── order/              # CartDetail, CompleteFormModal
│   ├── rating/             # Rating components
│   └── payments/           # PaymentModal
│
├── context/
│   └── state.js            # AppContext: token + profile; useAppContext() hook
│
├── data/                   # API service modules (one file per resource)
│   ├── fetcher.js          # Base fetch utility; handles auth errors and 401 redirect
│   ├── auth.js             # login, register, getUserProfile
│   ├── products.js         # CRUD, like, unlike, recommend, rate, add/remove from order
│   ├── orders.js           # getCart, getOrders, completeCurrentOrder
│   ├── stores.js           # CRUD, favorite, unfavorite
│   └── payment-types.js    # getPaymentTypes, addPaymentType, deletePaymentType
│
├── public/images/          # Static assets (logo, images)
├── global.css              # Global styles; imports Bulma and FontAwesome
└── package.json            # Dependencies and scripts
```

---

## 14. Practical Debugging Checklist

When something breaks in the frontend:

- What URL am I on? Which file in `pages/` controls that route?
- Which component is rendering the broken UI?
- Is there a `useEffect` fetching data? Has the data loaded yet?
- What does the API actually return? (Check the Network tab in browser dev tools)
- Does the frontend expect a different field name than what the backend returns?
- Is the user logged in? Is the token in `localStorage`? Is it being sent in the request?
- Is the backend server running on `localhost:8000`?
- Is the backend route working when tested directly in Postman or Thunder Client?
- If state seems stale, check the dependency array of the `useEffect`.
- If `useAppContext()` returns empty values, check that the page has `<Layout>` in its `getLayout`.
- Is this bug frontend-only, backend-only, or a mismatch between the two?

---

## 15. Team Tips While Working in Next.js

- Do not move or rename files in `pages/` casually. The filename is the route.
- Keep reusable UI in `components/`. Keep API calls in `data/`.
- Every new page that needs the navbar and auth context needs a `getLayout` at the bottom of the file.
- Always import `useRouter` from `next/router`, not `next/navigation`.
- Use `Link` from `next/link` for navigation links, not plain `<a>` tags.
- If a page renders but `token` or `profile` is empty, check that the page includes `<Layout>` in its `getLayout`.
- If a dynamic page loads but the data does not, check that `router.query.id` exists before using it in a fetch call.
- Do not duplicate fetch logic across components. Add a function to the relevant `data/` module and import it.
- Pay close attention to the shape of API responses. When the frontend expects `product.store_id` but the backend returns `product.store`, things break silently.
- Remove `console.log()` statements before opening a PR.

---

## Final Mental Model

React helps us build components.

Next.js helps us organize a full application.

In this project specifically:

- **`pages/`** tells Next.js what URL maps to what component
- **`getLayout`** tells Next.js how to wrap each page
- **`AppContext`** shares the logged-in user's token and profile across all components
- **`data/`** is where all communication with the Django backend lives
- **`components/`** is where reusable UI pieces live

The more clearly you can trace the flow from URL to page file to data fetch to component render, the easier every bug and feature will be.
