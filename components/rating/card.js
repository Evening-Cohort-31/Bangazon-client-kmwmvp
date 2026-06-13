import { Rating } from 'react-simple-star-rating'

export function RatingCard({ rating }) {
  return (
    <div className="tile is-child">
      <article className="media box is-align-items-center">
        <figure className="media-left">
          <Rating initialValue={rating} readonly={true} />
        </figure>
      </article>
    </div>
  )
}
