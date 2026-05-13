// size: "small" | "medium" | "large" (default "large")

export const Loading = ({ size = "large" }) => {
  return (
    <div className="has-text-centered p-6">
      <button className={`button is-loading is-${size} is-ghost`} disabled>
        Loading
      </button>
    </div>
  )
}
