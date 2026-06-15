import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Layout, Navbar } from '../../components'
import { addProduct } from '../../data/products'
import ProductForm from '../../components/product/form'
export default function NewProduct() {
  const formEl = useRef()
  const router = useRouter()

  const saveProduct = () => {
    const { name, description, price, category, location, quantity } = formEl.current
    // Get selected category IDs from the multi-select input
    const categoryIds = Array.from(category.selectedOptions)
      .map(option => parseInt(option.value, 10))
      .filter(categoryId => categoryId > 0)

    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      category_ids: categoryIds,
      location: location.value,
      quantity: parseInt(quantity.value, 10)
    }
    addProduct(product).then((res) => {
      router.replace(
        {
          pathname: '/products/[id]',
          query: { id: res.id }
        },
        `/products/${res.id}`
      )
    })
  }

  return (
    <ProductForm
      formEl={formEl}
      saveEvent={saveProduct}
      title="Add a new product"
      router={router}
    ></ProductForm>
  )
}

NewProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
