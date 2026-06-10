import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Layout, Loading, Navbar } from '../../../components'
import { ProductCard } from '../../../components/product/card'
import Detail from '../../../components/store/detail'
import { useAppContext } from '../../../context/state'
import { deleteProduct } from '../../../data/products'
import { favoriteStore, getStoreById, unfavoriteStore } from '../../../data/stores'

export default function StoreDetail() {
  const { profile } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [store, setStore] = useState(null)
  const isOwner = Number(id) === profile.store?.id

  useEffect(() => {
    // check if both router is ready and id is available before making request
    if (!router.isReady || !id) return

    // Track whether this effect has been cleaned up so an outdated profile request
    // cannot update state after navigation, logout, or a newer request.
    let ignore = false
    setStore(null)

    getStoreById(id).then(storeData => {
      // Only apply the response while it still belongs to the current effect
      if (!ignore && storeData) {
        setStore(storeData)
      }
    })

    // Invalidate this request when the component unmounts or the dependencies change
    return () => {
      ignore = true
    }
  }, [router.isReady, id])

  const refresh = () => getStoreById(id).then(storeData => {
    if (storeData) {
      setStore(storeData)
    }
  })

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh)
  }

  const favorite = () => {
    favoriteStore(id).then(refresh)
  }

  const unfavorite = () => {
    unfavoriteStore(id).then(refresh)
  }

  // Show loading state while waiting for store data to load
  if (!store) {
    return <Loading />
  }

  return (
    <>
      <Detail store={store} isOwner={isOwner} favorite={favorite} unfavorite={unfavorite} />
      <div className="columns is-multiline">
        {
          store.products?.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              isOwner={isOwner}
              removeProduct={removeProduct}
            />
          ))
        }
        {
          store.products?.length === 0 ?
            <p>There's no products yet</p>
            :
            <></>
        }
      </div>
    </>
  )
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
