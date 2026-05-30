import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { ProductCard } from '../components/product/card'
import { StoreCard } from '../components/store/card'
import { useAppContext } from '../context/state'
import { getUserProfile } from '../data/auth'
import { getRecommendations, getRecommendedToMe } from '../data/recommendations'

export default function Profile() {
  const { profile, setProfile } = useAppContext()

  const [recommendations, setRecommendations] = useState([])
  const [recommendedToMe, setRecommendedToMe] = useState([])

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData)
      }
    })
  }, [])

  useEffect(()=> {getRecommendations().then ((data) =>setRecommendations(data))}, [])
  useEffect(()=> {getRecommendedToMe().then ((data) => setRecommendedToMe(data))}, [])

  return (
    <>
      <CardLayout title="Favorite Stores" width="is-full">
        <div className="columns is-multiline">
          {
            profile.favorites?.map(favorite => (
              <StoreCard store={favorite} key={favorite.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>
      <CardLayout title="Products you've recommended" width="is-full">
        <div className="columns is-multiline">
          {
            recommendations?.map(recommendation => (
              <ProductCard product={recommendation.product} key={recommendation.id} 
              
              width="is-one-third" />

            ))
          }
        </div>
        <></>
      </CardLayout>
      <CardLayout title="Products recommended to you" width="is-full">
        <div className="columns is-multiline">
          {
            recommendedToMe?.map(recommendation => (
              <ProductCard product={recommendation.product} key={recommendation.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>

      <CardLayout title="Products you've liked" width="is-full">
        <div className="columns is-multiline">
          {
            profile.likes?.map(product => (
              <ProductCard product={product} key={product.id} width="is-one-third" />
            ))
          }
        </div>
        <></>
      </CardLayout>
    </>
  )
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
