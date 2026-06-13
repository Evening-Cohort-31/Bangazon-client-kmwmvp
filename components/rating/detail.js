import { useState, useEffect } from 'react'
import { rateProduct, changeProductRating, getProductRating } from '../../data/products'
import { getUserProfile } from '../../data/auth'
import { RatingsContainer } from './container'
import { Header } from './header'
import { useParams } from 'next/navigation'

export function Ratings({ average_rating, refresh, ratings = [], number_purchased, likes = [] }) {

  const product = useParams()
  const productId = product.id
  const [currentRating, setCurrentRating] = useState(null)

  useEffect(() => {
    getProductRating(productId).then(rating => {
      if (rating) {setCurrentRating(rating.rating)}
      
    })
    .catch(err => {
      if (err.status === 404) {
        setCurrentRating(null)
      }
    })
  }, [])

  const saveRating = (newRating) => {
    let existingRating = currentRating
    if (existingRating === null) {
      rateProduct(productId, newRating)
      .then(() => { setCurrentRating(newRating.rating); refresh() })
      
    } else {
      changeProductRating(productId, newRating).then(refresh)
      
    }
  }

  return (
    <div className="tile is-ancestor is-flex-wrap-wrap">
      <Header 
        averageRating={average_rating}
        ratingsLen={ratings.length}
        numberPurchased={number_purchased}
        likesLength={likes.length}
      />
      <RatingsContainer 
          rating={currentRating} 
          saveRating={saveRating} />
    </div>
  )
}
