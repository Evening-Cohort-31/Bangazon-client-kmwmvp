import { useEffect, useRef, useState } from 'react'
import { getCategories } from '../../data/products'
import { CardLayout } from '../'
import { Textarea, Select, Input } from '../form-elements'

export default function ProductForm({ formEl, saveEvent, title, router, initialCategoryIds }) {
  const [categories, setCategories] = useState([])
  const categoriesInitialized = useRef(false)

  useEffect(() => {
    getCategories('order_by=name').then(catData => setCategories(catData))
  }, [])

  useEffect(() => {
    // On the edit page, wait until the category options and the product's category IDs
    // are available before selecting the product's existing categories in the form.
    if (
      categoriesInitialized.current ||
      categories.length === 0 ||
      !Array.isArray(initialCategoryIds) ||
      !formEl.current
    ) return

    // Option values from the HTML form are strings, so convert each ID to a string.
    // A Set provides the .has() method for checking whether it contains a value in the next step.
    const selectedIds = new Set(initialCategoryIds.map(String))

    // category.options is an array-like browser collection, not a JavaScript array.
    // Array.from() converts it into an array so we can loop over it with .forEach().
    // Each option is selected when its value exists in the selectedIds Set.
    Array.from(formEl.current.category.options).forEach(option => {
      option.selected = selectedIds.has(option.value)
    })

    // Remember that initialization is complete so future renders do not overwrite
    // category changes made by the user.
    categoriesInitialized.current = true
  }, [categories, formEl, initialCategoryIds])

  return (
    <CardLayout title={title}>
      <form ref={formEl}>
        <Input
          id="name"
          label="Name"
        />
        <Textarea
          id="description"
          label="Description"
        />
        <Select
          id="category"
          options={categories}
          label="Categories"
          title="Select Categories"
          multiple
        />
        <Input
          id="price"
          label="Price"
        />
        <Input
          id="location"
          label="Location"
        />
        <Input
          id="quantity"
          label="Quantity"
          type="number"
        />
      </form>
      <>
        <a className="card-footer-item" onClick={saveEvent}>Save</a>
        <a className="card-footer-item" onClick={() => router.back()}>Cancel</a>
      </>
    </CardLayout>
  )
}
