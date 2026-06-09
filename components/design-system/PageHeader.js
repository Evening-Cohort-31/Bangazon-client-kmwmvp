// color: "primary" | "link" | "info" | "success" | "warning" | "dark" (default "link")
// size: "small" | "medium" | "large" | "halfheight" | "fullheight" (default "small")

export const PageHeader = ({ title, subtitle, centered, color = "link", size = "small" }) => {
  return (
    <section className={`hero is-${size} is-${color} mb-5`}>
      <div className={`hero-body${centered ? " has-text-centered" : ""}`}>
        <p className="title">{title}</p>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
