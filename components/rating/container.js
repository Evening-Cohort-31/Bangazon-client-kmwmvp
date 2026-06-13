import { RatingCard } from './card'
import RatingForm from './form'

export function RatingsContainer({ rating, saveRating }) {
  return (
    <div className="tile is-parent is-12 is-vertical container">
      <RatingForm saveRating={saveRating} rating={rating} />
      
      
    </div>
  )
}
