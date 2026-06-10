# TypeScript Learning Spike

This document supports the TypeScript learning spike for the Bangazon project. It covers what TypeScript is, why we added it, how to set it up in two different ways, and an example of how to convert a real component from this project from JavaScript to TypeScript.

Related tickets: [#85](https://github.com/Evening-Cohort-31/Bangazon-client-kmwmvp/issues/85) (setup), [#86](https://github.com/Evening-Cohort-31/Bangazon-client-kmwmvp/issues/86), [#87](https://github.com/Evening-Cohort-31/Bangazon-client-kmwmvp/issues/87), [#88](https://github.com/Evening-Cohort-31/Bangazon-client-kmwmvp/issues/88), [#89](https://github.com/Evening-Cohort-31/Bangazon-client-kmwmvp/issues/89) (first conversions)

---

## Contents

- [What is TypeScript and Why Use It](#what-is-typescript-and-why-use-it)
- [Core Concepts You Will Use](#core-concepts-you-will-use)
- [File Extensions: `.ts` vs `.tsx`](#file-extensions-ts-vs-tsx)
- [Setup Method 1: Starting a New React Project with Vite](#setup-method-1-starting-a-new-react-project-with-vite)
- [Setup Method 2: Adding TypeScript to an Existing Next.js Project](#setup-method-2-adding-typescript-to-an-existing-nextjs-project)
- [Good Habits During Conversion](#good-habits-during-conversion)
- [Converting a Component: Step-by-Step Examples](#converting-a-component-step-by-step-examples)
- [Updating `design/index.js` After Converting Files](#updating-designindexjs-after-converting-files)
- [Quick Reference](#quick-reference)

---

## What is TypeScript and Why Use It

TypeScript is essentially JavaScript with a type system layered on top. You write `.ts` or `.tsx` files instead of `.js` or `.jsx`, and the TypeScript compiler checks your code for type errors before it ever runs in the browser.

Here is an example of the kind of mistake TypeScript catches that plain JavaScript would not:

```js
// JavaScript: no error shown in editor, bug found at runtime
function greet(name) {
  return name.toUpperCase()
}

greet(42)  // crashes at runtime: 42.toUpperCase is not a function
```

```ts
// TypeScript: error shown immediately in editor
function greet(name: string) {
  return name.toUpperCase()
}

greet(42)  // error: Argument of type 'number' is not assignable to parameter of type 'string'
```

**Why this matters for React component props specifically:**

In a React app, components receive props from their parent. Without TypeScript, there is no way for your editor to know what props a component expects. With TypeScript, when you type the props of a component, every caller of that component gets autocomplete, inline documentation, and an error if they pass the wrong thing.

For example, if a `Loading` component only accepts `"small"`, `"medium"`, or `"large"` as its `size` prop, TypeScript will immediately flag a typo like `size="larg"` instead of letting it slip through to a runtime bug.

**TypeScript does not change how your code runs.** It is only a development-time tool. The compiler strips out all type information before the code reaches the browser. The output is still plain JavaScript.

### Why type enforcement is especially useful on a team

TypeScript is useful because it turns a lot of "I hope this component gets the right data" assumptions into rules the editor and compiler can check for us.

In a project like Bangazon, we pass product, order, store, payment, and user data through many layers:

1. API/helper functions fetch data.
2. Page components store that data in state.
3. Form and card components receive pieces of that data as props.
4. Event handlers send updated data back to the API.

Without types, every layer has to trust the previous layer. A bug might start in one file and only show up several clicks later in the browser. With types, the contract between those layers becomes visible:

```ts
interface Product {
  id: number
  name: string
  price: number
  imageUrl?: string
}

interface ProductCardProps {
  product: Product
}
```

Now TypeScript can catch mistakes like:

- Passing an order object to a component that expects a product.
- Forgetting that `imageUrl` might be missing.
- Treating `price` like a string when it is supposed to be a number.
- Renaming `name` to `title` in one place but forgetting to update every caller.

This is the biggest practical benefit: TypeScript gives us a shared contract. The code explains what shape the data should have, and the compiler helps enforce that agreement while we work.

TypeScript also makes refactoring safer. If we change a prop name, remove a field, or tighten a component API, TypeScript can point us to the files that still need to be updated. That is much faster than manually clicking through the app trying to find every broken path.

---

## Core Concepts You Will Use

### Type inference

You do not have to write a type annotation for every variable. TypeScript can infer many types from the value being assigned.

```ts
const count = 5        // TypeScript knows this is a number
const label = "hello"  // TypeScript knows this is a string
const active = true    // TypeScript knows this is a boolean
```

Use explicit annotations when they make a contract clearer, especially for component props, API return values, function parameters, and state that starts as an empty array or `null`.

### Type annotations

A type annotation tells TypeScript what kind of value a variable holds.

```ts
const count: number = 5
const label: string = "hello"
const active: boolean = true
```

### Interfaces

An interface describes the shape of an object. In React, you will most often use interfaces to describe a component's props.

```ts
interface ProductCardProps {
  name: string
  price: number
  description: string
  imageUrl: string
}
```

### Type aliases

A type alias gives a name to a type. You will often see `type` used for unions and other reusable shapes.

```ts
type ProductStatus = "available" | "sold" | "discontinued"
```

For basic object props, either `interface` or `type` can work. A simple team convention is:

- Use `interface` for component props and object shapes.
- Use `type` for unions like `"small" | "medium" | "large"`.

### Optional props with `?`

Adding `?` to a property name makes it optional. The component will accept calls with or without that prop.

```ts
interface LoadingProps {
  size?: string  // caller can omit this
}
```

### Union types

A union type restricts a value to a specific set of allowed options. This is useful for props like `size` or `color` where only certain strings are valid.

```ts
type LoadingSize = "small" | "medium" | "large"
```

If a caller passes `"huge"`, TypeScript flags it as an error immediately.

### Arrays and API data shapes

When typing a list, use `TypeName[]`.

```ts
interface Store {
  id: number
  name: string
  description: string
}

const stores: Store[] = []
```

This becomes very helpful for API calls because everyone can see what the frontend expects from the backend:

```ts
interface PaymentType {
  id: number
  merchantName: string
  accountNumber: string
  expirationDate: string
}

async function getPaymentTypes(): Promise<PaymentType[]> {
  const response = await fetch("/api/payment-types")
  return response.json()
}
```

`Promise<PaymentType[]>` means "this async function eventually returns an array of payment type objects."

### `ReactNode`

`ReactNode` is the TypeScript type for anything that can be rendered inside JSX: strings, numbers, elements, arrays, fragments, or null. You use it for `children` props.

```ts
import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
}
```

### Event handler types

When a component accepts a click handler, you type it as a function that receives a React mouse event.

```ts
import { MouseEvent } from "react"

interface TagProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
```

### `useState` types

React can infer state types when the initial value is obvious:

```tsx
const [searchTerm, setSearchTerm] = useState("")
const [isOpen, setIsOpen] = useState(false)
```

When the initial value is empty or nullable, give TypeScript more information:

```tsx
const [products, setProducts] = useState<Product[]>([])
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
```

`Product | null` means the value can be either a product object or `null`. This is common for modals, detail pages, and data that loads after the first render.

---

## File Extensions: `.ts` vs `.tsx`

| Extension | Use when |
| --------- | -------- |
| `.ts` | Plain TypeScript files with no JSX (utility functions, API modules, types) |
| `.tsx` | TypeScript files that contain JSX (React components) |

When converting a component file like `Loading.js`, rename it to `Loading.tsx`. Your existing `.js` files are unaffected because the `tsconfig.json` has `"allowJs": true`.

---

## Setup Method 1: Starting a New React Project with Vite

If you are starting a brand new React project and want TypeScript from the beginning, Vite makes this one command:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

Vite generates the project with TypeScript already configured. You get:

- `tsconfig.json` in the project root
- `tsconfig.app.json` and `tsconfig.node.json` for build vs. config files
- All component files already using `.tsx`
- `vite-env.d.ts` instead of `next-env.d.ts`

This is the recommended approach for new projects. It is simpler than retrofitting TypeScript later.

---

## Setup Method 2: Adding TypeScript to an Existing Next.js Project

This is what we did for this project on ticket #85. Use this method when TypeScript needs to be added to a codebase that is already written in JavaScript.

### Step 1: Install TypeScript dev dependencies

```bash
npm install --save-dev typescript@5 @types/react @types/react-dom @types/node
```

What each package does:

- `typescript@5` is the TypeScript compiler itself, pinned to the 5.x line for compatibility with the ESLint config
- `@types/react` gives TypeScript knowledge of React's API (`useState`, component return types, JSX, etc.)
- `@types/react-dom` gives TypeScript knowledge of `ReactDOM`
- `@types/node` gives TypeScript knowledge of Node.js built-ins used by Next.js internals

### Step 2: Create `tsconfig.json` in the project root

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "incremental": true,
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["next-env.d.ts", "**/*.mts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Key options to understand:

- `"allowJs": true` lets TypeScript coexist with existing `.js` files. This is important for gradual conversion because the project can keep running while only some files have been renamed to `.ts` or `.tsx`.
- `"strict": false` turns off aggressive checks so the team can convert files gradually without the compiler blocking everything else.
- `"noEmit": true` tells TypeScript not to produce output files. Next.js handles the actual compilation; TypeScript only does type checking.
- `"isolatedModules": true` is required by Next.js. It treats every file as a self-contained module.
- `"include": ["next-env.d.ts", "**/*.mts", "**/*.ts", "**/*.tsx"]` tells TypeScript which TypeScript files to check. Existing `.js` files can still run in the app, but they are not fully type-checked like converted `.ts` and `.tsx` files.

**Note on strict mode:** Starting with `"strict": false` is a good migration choice because it lowers the barrier to converting the first files. Long term, `"strict": true` gives better protection because it catches more mistakes around `null`, `undefined`, function parameters, and object shapes. A good future goal is to turn on stricter checks after the team is comfortable and more files have been converted.

### Step 3: Run the dev server

```bash
npm run dev
```

Next.js detects the `tsconfig.json` and auto-generates `next-env.d.ts` in the project root. Do not edit that file; Next.js owns it and rewrites it automatically.

### Step 4: Verify nothing broke

```bash
npm run lint
npm run build
```

Existing `.js` files should continue to work. If you see a TypeScript version warning from ESLint, it is cosmetic and does not block development.

---

## Good Habits During Conversion

### Convert one small area at a time

It is usually better to convert one component and its nearby types than to rename a large folder all at once. Smaller conversions make errors easier to understand and review.

Good first targets:

- Design components with simple props.
- Utility functions with clear inputs and outputs.
- API helper functions where the returned data shape is known.

More complex targets:

- Forms with many change handlers.
- Components with large `...rest` props.
- Pages that fetch data, manage loading state, and pass objects through several children.

### Prefer real types over `any`

`any` tells TypeScript to stop checking a value. It can be useful as a temporary escape hatch, but it removes the main benefit of using TypeScript.

```ts
// Avoid when possible
const product: any = getProduct()

// Better
const product: Product = getProduct()
```

If the shape is truly unknown, use `unknown` instead of `any`. `unknown` forces you to check the value before using it.

```ts
function formatValue(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase()
  }

  return String(value)
}
```

### Let types live near the code until they are shared

For a single component, it is fine to define props in the same file:

```tsx
interface LoadingProps {
  size?: LoadingSize
}
```

If several files need the same shape, move it to a shared type file later. For example, if product cards, product forms, and product detail pages all need the same `Product` shape, then a shared `types/product.ts` file may make sense. Do that when reuse is real instead of creating a large types folder before the app needs it.

### Remember that TypeScript checks compile-time data, not runtime data

TypeScript helps us write correct code, but it does not automatically validate data coming from the API at runtime. If the backend sends a different shape than the frontend expects, TypeScript cannot magically inspect that response in the browser.

That means TypeScript works best when the frontend and backend agree on data contracts. For especially important forms or API responses, runtime checks may still be needed.

---

## Converting a Component: Step-by-Step Examples

### Example 1: `Loading.js` (simple, one optional prop)

**Before (JavaScript):**

```js
// size: "small" | "medium" | "large" (default "large")

export const Loading = ({ size = "large" }) => {
  return (
    <div className="has-text-centered p-6">
      <button className={`button is-loading is-${size} is-ghost`} disabled>
        Loading
      </button>
    </div>
  )
}
```

**After (TypeScript):**

```tsx
type LoadingSize = "small" | "medium" | "large"

interface LoadingProps {
  size?: LoadingSize
}

export const Loading = ({ size = "large" }: LoadingProps) => {
  return (
    <div className="has-text-centered p-6">
      <button className={`button is-loading is-${size} is-ghost`} disabled>
        Loading
      </button>
    </div>
  )
}
```

**What changed and why:**

1. `type LoadingSize = "small" | "medium" | "large"` defines the exact values that are valid for `size`. TypeScript will now flag any caller that passes something outside this list.

   **Union types vs. comments:** The original JavaScript file had `// size: "small" | "medium" | "large"` as a comment above the component. A comment and a union type can communicate the same information to a human reader, but only the union type does anything meaningful to the compiler. The comment is ignored completely during compilation. The union type is enforced: if a caller passes `size="larg"` (a typo), TypeScript flags it as an error before the code ever runs. Comments are useful for explaining intent; union types are useful for enforcing it.
2. `interface LoadingProps` describes the shape of the props object. This is what TypeScript checks against every time the component is used.
3. `size?: LoadingSize` uses `?` to mark `size` as optional, matching the JavaScript behavior where it had a default value.
4. `{ size = "large" }: LoadingProps` is the props destructuring with a type annotation. The `: LoadingProps` after the destructuring is where the annotation lives in a React component.

**Rename the file** from `Loading.js` to `Loading.tsx`. No other files need to change because the export name stays the same.

---

### Example 2: `Container.js` (children prop + optional constrained prop)

**Before (JavaScript):**

```js
// size: "widescreen" | "fullhd" | "max-desktop" | "max-widescreen" | undefined (fluid)

export const Container = ({ children, size }) => {
  const sizeClass = size ? `is-${size}` : ""

  return (
    <div className={`container ${sizeClass}`.trim()}>
      {children}
    </div>
  )
}
```

**After (TypeScript):**

```tsx
import { ReactNode } from "react"

type ContainerSize = "widescreen" | "fullhd" | "max-desktop" | "max-widescreen"

interface ContainerProps {
  children: ReactNode
  size?: ContainerSize
}

export const Container = ({ children, size }: ContainerProps) => {
  const sizeClass = size ? `is-${size}` : ""

  return (
    <div className={`container ${sizeClass}`.trim()}>
      {children}
    </div>
  )
}
```

**What changed and why:**

1. `ReactNode` is imported from React. This is the correct type for `children` because children can be text, elements, arrays, or nothing at all.
2. `children: ReactNode` is required (no `?`) because a container with no children would render nothing useful. Making it required means TypeScript will warn callers who forget to pass children.
3. `size?: ContainerSize` is optional because the container defaults to a fluid (full-width) layout when no size is passed.

---

### Example 3: `Tag.js` (multiple optional props, event handler, spread)

Tag is more involved because it accepts many props including an event handler and a spread (`...rest`). Here is how to approach it:

**Before (JavaScript):**

```js
export const Tag = ({
    children,
    color,
    light = false,
    rounded = false,
    className = "",
    onClick,
    disabled = false,
    ...rest
}) => { ... }
```

**After (TypeScript):**

```tsx
import { ReactNode, MouseEvent } from "react"

type TagColor = "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"

interface TagProps {
  children: ReactNode
  color?: TagColor
  light?: boolean
  rounded?: boolean
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const Tag = ({
  children,
  color,
  light = false,
  rounded = false,
  className = "",
  onClick,
  disabled = false,
}: TagProps) => { ... }
```

**What changed and why:**

1. `TagColor` is a union type that restricts the `color` prop to valid Bulma color strings.
2. `onClick?: (event: MouseEvent<HTMLButtonElement>) => void` is how you type a click handler. It is a function that receives a `MouseEvent` (from the button element) and returns nothing (`void`).
3. For this simplified version, `...rest` is removed from the typed interface. Typing spread props correctly requires extending a base HTML attributes interface, which is a more advanced pattern. For ticket #87, focusing on typing the known props is a good starting point.

**Note on `...rest` for advanced reference:** If you later want to re-add spread props, the approach is to extend `React.HTMLAttributes<HTMLElement>` in the interface. That gives TypeScript knowledge of all standard HTML attributes so it can validate the spread:

```tsx
interface TagProps extends React.HTMLAttributes<HTMLElement> {
  color?: TagColor
  light?: boolean
  rounded?: boolean
  disabled?: boolean
}
```

---

## Updating `design/index.js` After Converting Files

When you rename `Loading.js` to `Loading.tsx`, the import in `design/index.js` does not need to change. Module resolution handles both `.js` and `.tsx` transparently:

```js
// design/index.js — no change needed
export { Loading } from "./Loading"
```

If you eventually convert `index.js` itself to TypeScript, rename it to `index.ts` (not `.tsx` since it contains no JSX) and the exports stay identical.

---

## Quick Reference

| Concept | Syntax |
| ------- | ------ |
| Type annotation | `const x: string = "hello"` |
| Interface for props | `interface MyProps { name: string }` |
| Optional prop | `label?: string` |
| Union type | `type Color = "red" \| "blue" \| "green"` |
| Children prop | `children: ReactNode` |
| Click handler prop | `onClick?: (e: MouseEvent<HTMLButtonElement>) => void` |
| Applying props type | `({ name, label }: MyProps) => ...` |
| File with JSX | use `.tsx` extension |
| File without JSX | use `.ts` extension |
