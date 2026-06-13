import { Rating } from 'react-simple-star-rating'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function RatingForm({ saveRating, rating }) {
  const [newRating, setNewRating] = useState(rating)
  const [comment, setComment] = useState("")

  // Previously review comments were included in the Rating payload. Now only the rating integer is sent when a customer clicks "submit rating"
  const submitRating = () => {
    saveRating({
      rating: newRating
    })
  }

  useEffect(()=>{
    setNewRating(rating)
  },[rating])

  return (
    <div className="tile is-child ">
      <article className="media box">
        <figure className="media-left">
          <Rating initialValue={newRating} onClick={setNewRating}
          />
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Add your review" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button" onClick={submitRating}>Post Rating</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
