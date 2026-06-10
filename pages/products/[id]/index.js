import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Layout, Navbar, Loading } from '../../../components'
import { Detail } from '../../../components/product/detail'
import { Ratings } from '../../../components/rating/detail'
import { getProductById, likeProduct, unLikeProduct } from '../../../data/products'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)

  const refresh = () => {
    getProductById(id).then(productData => {
      if (productData) {
        setProduct(productData)
      }
    })
  }

  const like = () => {
    likeProduct(id).then(refresh)
  }

  const unlike = () => {
    unLikeProduct(id).then(refresh)
  }

  useEffect(() => {
    // Wait until the dynamic route has a product ID before making the request.
    if (!router.isReady || !id) return

    // Prevent an outdated request from updating the page after navigation.
    let ignore = false
    setProduct(null)

    getProductById(id).then(productData => {
      if (!ignore && productData) {
        setProduct(productData)
      }
    })

    // Invalidate this request when the component unmounts or the product ID changes.
    return () => {
      ignore = true
    }
  }, [router.isReady, id])

  return (
    <div className="columns is-centered">
      <div className="column">
        {!product ? (
          <Loading />
        ) : (
          <>
            <Detail product={product} like={like} unlike={unlike} />
            <Ratings
              refresh={refresh}
              number_purchased={product.number_purchased}
              ratings={product.ratings}
              average_rating={product.average_rating}
              likes={product.likes}
            />
          </>
        )}
      </div>
    </div>
  )
}

ProductDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
