import { useState, useRef } from "react"
import {
  Button, Modal, Card, Tag, Notification, PageHeader, Loading,
  IconButton, Form, FormField, FormSelect, FormTextarea, FormActions,
  Title, Subtitle, Text, MutedText, SmallText, Container,
} from "../../design"

// ─────────────────────────────────────────────────────────────────────────────
// BulmaSampler — Bangazon Design System Reference
//
// Use this file to see every design component in action before using it
// in a page or feature. Each section shows:
//   1. What the component looks like rendered
//   2. A JSX comment above it showing exactly how to use it
//
// To add this page to the app temporarily:
//   1. Create pages/sampler.js
//   2. Import and render <BulmaSampler /> there
//   3. Visit http://localhost:3000/sampler
// ─────────────────────────────────────────────────────────────────────────────

export function BulmaSampler() {
  const [activeTab, setActiveTab] = useState("colors")
  const [showModal, setShowModal] = useState(false)

  // useRef pattern — declare one ref per field, pass to inputRef prop
  // Read the value with ref.current.value (e.g. on form submit)
  const nameRef = useRef(null)
  const categoryRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleExampleSubmit = (e) => {
    e.preventDefault()
    alert(`Name: ${nameRef.current.value} | Category: ${categoryRef.current.value}`)
  }

  const tabs = ["colors", "components", "forms"]

  return (
    <div className="section" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container>

        {/* ── Page title ──────────────────────────────────────────────────── */}
        {/*
          Usage:
            <PageHeader title="Page Title" subtitle="Optional subtitle" color="primary" size="small" centered />
            color: "primary" | "link" | "info" | "success" | "warning" | "dark"
            size:  "small" | "medium" | "large" | "halfheight" | "fullheight"
        */}
        <PageHeader
          title="Bangazon Design System"
          subtitle="Component reference — import from ../../design"
          color="dark"
          size="small"
          centered
        />

        {/* ── Tab navigation ──────────────────────────────────────────────── */}
        <div className="buttons is-centered mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab}
              color={activeTab === tab ? "info" : "light"}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>


        {/* ══════════════════════════════════════════════════════════════════
            COLORS TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "colors" && (
          <section className="mb-6">

            {/* ── Bangazon theme colors ─────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Bangazon Theme Colors</Title>
              <Text className="mb-4">
                Defined in <code>design/design.css</code> as CSS custom properties on <code>:root</code>.
                Swap hex values there when final brand colors are chosen.
                Use them with <code>{"style={{ color: 'var(--color-primary)' }}"}</code> or inside <code>design.css</code> rules.
              </Text>
              <div className="columns is-multiline">
                {[
                  { label: "Primary",         cssVar: "--color-primary",        hex: "#3d5a80", dark: false },
                  { label: "Primary Light",   cssVar: "--color-primary-light",  hex: "#98c1d9", dark: false },
                  { label: "Primary Dark",    cssVar: "--color-primary-dark",   hex: "#293241", dark: false },
                  { label: "Secondary",       cssVar: "--color-secondary",      hex: "#e07a5f", dark: false },
                  { label: "Secondary Light", cssVar: "--color-secondary-light",hex: "#f2b5a0", dark: true  },
                  { label: "Secondary Dark",  cssVar: "--color-secondary-dark", hex: "#b85c42", dark: false },
                ].map(({ label, cssVar, hex, dark }) => (
                  <div key={cssVar} className="column is-one-third">
                    <div
                      className={`has-text-centered p-4 ${dark ? "has-text-dark" : "has-text-white"}`}
                      style={{ backgroundColor: `var(${cssVar})`, borderRadius: "8px" }}
                    >
                      <strong>{label}</strong><br />
                      <code style={{ fontSize: "0.75rem", opacity: 0.85 }}>{cssVar}</code><br />
                      <small>{hex}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Bulma default colors ──────────────────────────────────── */}
            <div className="box">
              <Title size={3}>Bulma Color Classes</Title>
              <Text className="mb-4">
                Pass these strings as the <code>color</code> prop on Button, Tag, Notification, PageHeader, etc.
                They map to Bulma's built-in <code>is-*</code> modifier classes.
              </Text>
              <div className="columns is-multiline">
                {["primary", "link", "info", "success", "warning", "danger"].map((color) => (
                  <div key={color} className="column is-2">
                    {/*
                      Usage: <Notification type="success">Message</Notification>
                      type: "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
                    */}
                    <Notification type={color}>
                      <strong>{color}</strong>
                    </Notification>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}


        {/* ══════════════════════════════════════════════════════════════════
            COMPONENTS TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "components" && (
          <section>

            {/* ── Typography ────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Typography</Title>
              {/*
                Usage:
                  <Title size={1}>Main heading</Title>       — sizes 1–6, 1 is largest
                  <Subtitle size={4}>Secondary</Subtitle>    — sizes 1–6
                  <Text>Regular body paragraph</Text>
                  <MutedText>Date, metadata, secondary info</MutedText>
                  <SmallText>Captions, fine print</SmallText>
                  Add className="has-text-centered" for alignment
                  Add style={{ color: 'var(--color-primary)' }} for custom color
              */}
              <Title size={1}>Title size={1}</Title>
              <Title size={2}>Title size={2}</Title>
              <Title size={3}>Title size={3}</Title>
              <Subtitle size={4}>Subtitle size={4}</Subtitle>
              <Subtitle size={5}>Subtitle size={5}</Subtitle>
              <Text>Text — regular body paragraph content.</Text>
              <MutedText>MutedText — dates, metadata, secondary info.</MutedText>
              <SmallText>SmallText — captions, fine print.</SmallText>
            </div>

            {/* ── Button ────────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Button</Title>
              {/*
                Usage:
                  <Button color="primary" onClick={handler}>Label</Button>
                  <Button color="danger" variant="outlined" size="small" rounded>Label</Button>
                  <Button as="a" href="/some-page" color="info">Link button</Button>

                Confirm dialog (no extra state needed):
                  <Button
                    color="danger"
                    confirm
                    confirmTitle="Delete item?"
                    confirmMessage="This cannot be undone."
                    confirmText="Yes, Delete"
                    onClick={handler}
                  >
                    Delete
                  </Button>

                color:   "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
                variant: "outlined" | "light" | "inverted"
                size:    "small" | "normal" | "medium" | "large"
              */}

              <Subtitle size={5}>Colors</Subtitle>
              <div className="buttons">
                {["primary", "link", "info", "success", "warning", "danger"].map((c) => (
                  <Button key={c} color={c}>{c}</Button>
                ))}
              </div>

              <Subtitle size={5}>Variants (color="primary")</Subtitle>
              <div className="buttons">
                <Button color="primary" variant="outlined">outlined</Button>
                <Button color="primary" variant="light">light</Button>
                <Button color="primary" variant="inverted">inverted</Button>
                <Button color="primary" rounded>rounded</Button>
                <Button color="primary" loading>loading</Button>
                <Button color="primary" disabled>disabled</Button>
                <Button color="primary" fullwidth>fullwidth</Button>
              </div>

              <Subtitle size={5}>Sizes</Subtitle>
              <div className="buttons">
                <Button color="primary" size="small">small</Button>
                <Button color="primary">normal</Button>
                <Button color="primary" size="medium">medium</Button>
                <Button color="primary" size="large">large</Button>
              </div>

              <Subtitle size={5}>Confirm dialog — built into Button via confirm prop</Subtitle>
              <div className="buttons">
                <Button
                  color="danger"
                  confirm
                  confirmTitle="Delete this item?"
                  confirmMessage="This action cannot be undone."
                  confirmText="Yes, Delete"
                  onClick={() => alert("Item deleted!")}
                >
                  Delete with confirm
                </Button>
              </div>
            </div>

            {/* ── IconButton ────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>IconButton</Title>
              {/*
                Usage:
                  <IconButton icon="pencil" color="info" title="Edit" onClick={handler} />
                  <IconButton icon="trash" color="danger" title="Delete" onClick={handler} />

                With built-in confirm dialog (recommended for destructive actions):
                  <IconButton
                    icon="trash"
                    color="danger"
                    title="Delete"
                    confirm
                    confirmTitle="Delete item?"
                    confirmMessage="This action cannot be undone."
                    confirmText="Yes, Delete"
                    onClick={handler}
                  />

                icon:  any Font Awesome solid icon name without "fa-"
                       e.g. "pencil" | "trash" | "eye" | "star" | "plus" | "gear" | "heart"
                color: "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
                title: shown as tooltip and used for screen reader label (required for accessibility)
              */}

              <Subtitle size={5}>Standard</Subtitle>
              <div className="buttons">
                <IconButton icon="pencil" color="info"    title="Edit"     onClick={() => {}} />
                <IconButton icon="trash"  color="danger"  title="Delete"   onClick={() => {}} />
                <IconButton icon="eye"    color="primary" title="View"     onClick={() => {}} />
                <IconButton icon="star"   color="warning" title="Favorite" onClick={() => {}} />
                <IconButton icon="plus"   color="success" title="Add"      onClick={() => {}} />
                <IconButton icon="heart"  color="danger"  title="Like"     onClick={() => {}} />
                <IconButton icon="gear"                   title="Settings" onClick={() => {}} />
              </div>

              <Subtitle size={5}>With confirm dialog — recommended for delete actions</Subtitle>
              <div className="buttons">
                <IconButton
                  icon="trash"
                  color="danger"
                  title="Delete item"
                  confirm
                  confirmTitle="Delete this item?"
                  confirmMessage="This action cannot be undone."
                  confirmText="Yes, Delete"
                  onClick={() => alert("Deleted!")}
                />
              </div>
            </div>

            {/* ── Tag ───────────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Tag</Title>
              {/*
                Usage:
                  <Tag color="success">In Stock</Tag>
                  <Tag color="warning" light rounded>Pending</Tag>
                  <Tag color="danger" onClick={handler}>Clickable tag</Tag>
                  <Tag color="info" onClick={handler} disabled>Disabled</Tag>

                color:   "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
                light:   boolean — lighter background tint
                rounded: boolean — pill shape
                onClick: passing onClick renders a <button> for accessibility
                size:    use className="is-medium" or "is-large"
              */}

              <Subtitle size={5}>Colors</Subtitle>
              <div className="tags">
                {["primary", "link", "info", "success", "warning", "danger"].map((c) => (
                  <Tag key={c} color={c}>{c}</Tag>
                ))}
              </div>

              <Subtitle size={5}>Modifiers</Subtitle>
              <div className="tags">
                <Tag color="success" light rounded>light + rounded</Tag>
                <Tag color="info" rounded>rounded</Tag>
                <Tag color="warning" light>light</Tag>
              </div>

              <Subtitle size={5}>Sizes via className</Subtitle>
              <div className="tags">
                <Tag color="primary" className="is-small">small</Tag>
                <Tag color="primary">normal</Tag>
                <Tag color="primary" className="is-medium">medium</Tag>
                <Tag color="primary" className="is-large">large</Tag>
              </div>

              <Subtitle size={5}>Clickable — renders as {"<button>"} for accessibility</Subtitle>
              <div className="tags">
                <Tag color="info"   onClick={() => alert("Tag clicked!")}>Click me</Tag>
                <Tag color="danger" onClick={() => {}} disabled>Disabled</Tag>
              </div>
            </div>

            {/* ── Card ──────────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Card</Title>
              {/*
                Usage:
                  <Card title="Title" hoverable>Body content</Card>

                  <Card
                    title="Title"
                    hoverable
                    headerRight={<Tag color="success" light rounded>Active</Tag>}
                    footer={<><IconButton icon="pencil" color="info" title="Edit" onClick={handler} /></>}
                  >
                    Body content
                  </Card>

                hoverable:   boolean — adds lift-on-hover effect from design.css
                headerRight: ReactNode — right side of card header (tags, icon buttons)
                footer:      ReactNode — card footer slot (use card-footer-item class on children)
              */}
              <div className="columns">
                <div className="column">
                  <Card title="Basic Card">
                    Basic card with a title and body content.
                  </Card>
                </div>
                <div className="column">
                  <Card
                    title="Hoverable Card"
                    hoverable
                    headerRight={<Tag color="success" light rounded>Active</Tag>}
                  >
                    Pass <code>hoverable</code> for the lift effect.
                    Use <code>headerRight</code> for tags or icon buttons in the header.
                  </Card>
                </div>
                <div className="column">
                  <Card
                    title="Card with Footer"
                    hoverable
                    footer={
                      <>
                        <IconButton icon="pencil" color="info"   title="Edit"   onClick={() => {}} />
                        <IconButton icon="trash"  color="danger" title="Delete" onClick={() => {}} />
                      </>
                    }
                  >
                    Pass any JSX to the <code>footer</code> slot.
                  </Card>
                </div>
              </div>
            </div>

            {/* ── Notification ──────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Notification</Title>
              {/*
                Usage:
                  <Notification type="success" onClose={handler}>
                    <strong>Success!</strong> Item saved.
                  </Notification>

                  <Notification type="danger" message="Something went wrong." onClose={handler} />

                type:     "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
                onClose:  renders the X dismiss button when provided
                children: use for formatted JSX content
                message:  use for plain string content (children takes priority if both passed)
              */}
              <Notification type="info" onClose={() => {}}>
                <strong>Info:</strong> Use children for formatted content inside a notification.
              </Notification>
              <Notification type="success" onClose={() => {}}>
                <strong>Success!</strong> Item saved successfully.
              </Notification>
              <Notification type="warning" onClose={() => {}}>
                <strong>Warning:</strong> Review before submitting.
              </Notification>
              <Notification type="danger" message="Error: Something went wrong." onClose={() => {}} />
            </div>

            {/* ── Modal ─────────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Modal</Title>
              {/*
                Standard modal — controlled by useState:
                  const [show, setShow] = useState(false)

                  <Button onClick={() => setShow(true)}>Open Modal</Button>

                  <Modal
                    isOpen={show}
                    title="Modal Title"
                    onClose={() => setShow(false)}
                    onConfirm={handler}
                    confirmText="Save"
                    confirmColor="success"
                    cancelText="Cancel"
                  >
                    <p>Modal body content goes here as children.</p>
                  </Modal>

                Custom footer (replaces the default confirm/cancel buttons):
                  <Modal isOpen={show} title="Title" onClose={handler} footer={<Button>Custom</Button>}>
                    ...
                  </Modal>

                No footer (info-only modal):
                  <Modal isOpen={show} title="Title" onClose={handler}>
                    <p>Content only, no footer rendered.</p>
                  </Modal>

                Built-in confirm via Button (no extra state needed):
                  <Button color="danger" confirm confirmMessage="Are you sure?" onClick={handler}>
                    Delete
                  </Button>
              */}
              <div className="buttons">
                <Button color="primary" onClick={() => setShowModal(true)}>
                  Open Modal
                </Button>
                <Button
                  color="danger"
                  confirm
                  confirmTitle="Confirm Delete"
                  confirmMessage="This will permanently delete the item. Continue?"
                  confirmText="Yes, Delete"
                  onClick={() => alert("Deleted!")}
                >
                  Delete with Built-in Confirm
                </Button>
              </div>

              <Modal
                isOpen={showModal}
                title="Example Modal"
                onClose={() => setShowModal(false)}
                onConfirm={() => setShowModal(false)}
                confirmText="Save"
                confirmColor="success"
                cancelText="Cancel"
              >
                <Text>This modal is driven by <code>isOpen</code> state.</Text>
                <Text>Pass <code>onConfirm</code> and <code>confirmText</code> for a confirm/cancel footer.</Text>
                <Text>Pass a <code>footer</code> prop for a fully custom footer instead.</Text>
                <MutedText>No footer section renders at all if neither onConfirm nor footer is passed.</MutedText>
              </Modal>
            </div>

            {/* ── Loading ───────────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Loading</Title>
              {/*
                Usage:
                  <Loading />              — large spinner (default)
                  <Loading size="small" /> — small spinner

                Render conditionally while data is fetching:
                  {isLoading ? <Loading /> : <ProductList products={products} />}

                size: "small" | "medium" | "large"
              */}
              <div className="columns">
                {["small", "medium", "large"].map((size) => (
                  <div key={size} className="column has-text-centered">
                    <MutedText>size="{size}"</MutedText>
                    <Loading size={size} />
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}


        {/* ══════════════════════════════════════════════════════════════════
            FORMS TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "forms" && (
          <section>

            {/* ── New item form ─────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Form — New Item</Title>
              <Text className="mb-4">
                All form components use the <strong>uncontrolled</strong> pattern via <code>useRef</code>.
                Declare a ref with <code>useRef(null)</code>, pass it as <code>inputRef</code>,
                then read <code>ref.current.value</code> when the form is submitted.
                This avoids re-renders on every keystroke.
              </Text>
              {/*
                Full usage pattern:

                  import { useRef } from "react"
                  import { Form, FormField, FormSelect, FormTextarea, FormActions, Button } from "../design"

                  const nameRef        = useRef(null)
                  const categoryRef    = useRef(null)
                  const descriptionRef = useRef(null)

                  const handleSubmit = (e) => {
                    e.preventDefault()
                    const payload = {
                      name:        nameRef.current.value,
                      category_id: categoryRef.current.value,
                      description: descriptionRef.current.value,
                    }
                    // send payload to API
                  }

                  <Form onSubmit={handleSubmit} boxed>
                    <FormField   label="Name"        name="name"        inputRef={nameRef}        placeholder="Product name" />
                    <FormSelect  label="Category"    name="category_id" inputRef={categoryRef}>
                      <option value="1">Clothing</option>
                    </FormSelect>
                    <FormTextarea label="Description" name="description" inputRef={descriptionRef} rows={4} />
                    <FormActions>
                      <Button type="submit" color="primary">Save</Button>
                      <Button color="light">Cancel</Button>
                    </FormActions>
                  </Form>
              */}
              <Form onSubmit={handleExampleSubmit} boxed>
                <FormField
                  label="Product Name"
                  name="name"
                  inputRef={nameRef}
                  placeholder="Enter product name"
                />
                <FormField
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                />
                <FormSelect
                  label="Category"
                  name="category_id"
                  inputRef={categoryRef}
                >
                  <option value="">Choose a category...</option>
                  <option value="1">Electronics</option>
                  <option value="2">Clothing</option>
                  <option value="3">Books</option>
                  <option value="4">Home &amp; Garden</option>
                </FormSelect>
                <FormTextarea
                  label="Description"
                  name="description"
                  inputRef={descriptionRef}
                  placeholder="Describe the product..."
                  rows={4}
                />
                <FormActions>
                  <Button type="submit" color="primary">Save Product</Button>
                  <Button color="light">Cancel</Button>
                </FormActions>
              </Form>
            </div>

            {/* ── Edit item form ────────────────────────────────────────── */}
            <div className="box mb-5">
              <Title size={3}>Form — Edit Item (defaultValue)</Title>
              <Text className="mb-4">
                For edit pages, pass <code>defaultValue</code> to pre-populate fields with existing data.
                React sets the initial value once and then steps back — no state management needed.
              </Text>
              {/*
                Usage on an edit page:

                  // product comes from your API fetch in useEffect
                  <FormField
                    label="Name"
                    name="name"
                    inputRef={nameRef}
                    defaultValue={product.name}
                  />
                  <FormSelect
                    label="Category"
                    name="category_id"
                    inputRef={categoryRef}
                    defaultValue={product.category_id}
                  >
                    ...options
                  </FormSelect>
                  <FormTextarea
                    label="Description"
                    name="description"
                    inputRef={descriptionRef}
                    defaultValue={product.description}
                    rows={4}
                  />
              */}
              <Form boxed>
                <FormField
                  label="Product Name"
                  name="name"
                  defaultValue="Mountain Bike 2024"
                  placeholder="Enter product name"
                />
                <FormSelect
                  label="Category"
                  name="category_id"
                  defaultValue="3"
                >
                  <option value="1">Electronics</option>
                  <option value="2">Clothing</option>
                  <option value="3">Sports</option>
                  <option value="4">Home &amp; Garden</option>
                </FormSelect>
                <FormTextarea
                  label="Description"
                  name="description"
                  defaultValue="A high-quality mountain bike perfect for trail riding."
                  rows={3}
                />
                <FormActions>
                  <Button type="submit" color="info">Update Product</Button>
                  <Button color="light">Cancel</Button>
                </FormActions>
              </Form>
            </div>

          </section>
        )}

      </Container>
    </div>
  )
}
