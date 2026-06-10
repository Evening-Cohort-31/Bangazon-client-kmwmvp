import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import { Layout, Navbar } from '../../../components'
import { editProduct, getProductById } from '../../../data/products'
import ProductForm from '../../../components/product/form'
import { useAppContext } from '../../../context/state'

export default function EditProduct() {
  const [product, setProduct] = useState(null)
  const formEl = useRef()
  const router = useRouter()
  const { profile } = useAppContext()
  const { id } = router.query

  useEffect(() => {
    if (!router.isReady || !id || !profile) return

    let ignore = false

    setProduct(null)

    getProductById(id).then(productData => {
      if (productData.store.id === profile.store?.id && !ignore) {
        setProduct(productData)
      } else {
        router.back()
      }
    })

    // Clean up function to set the ignore flag if the component unmounts before the fetch completes
    return () => {
      ignore = true
    }
  }, [id, profile, router.isReady])

  useEffect(() => {
    if (product) {
      const { name, description, price, category, location, quantity } = formEl.current

      name.value = product.name
      description.value = product.description
      price.value = product.price
      category.value = product.category.id
      location.value = product.location
      quantity.value = product.quantity
    }
  }, [formEl, product])


  const saveProduct = () => {
    const { name, description, price, category, location, quantity } = formEl.current

    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      categoryId: category.value,
      location: location.value,
      quantity: quantity.value
    }


    if (!product) return

    editProduct(id, product).then(() => router.push(`/products/${id}`))
  }

  return (
    <ProductForm
      formEl={formEl}
      saveEvent={saveProduct}
      title="Edit product"
      router={router}
    ></ProductForm>
  )
}

EditProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
