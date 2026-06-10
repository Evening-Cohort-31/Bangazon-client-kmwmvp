// color helpers via className: "has-background-white-ter", "has-background-light", etc.
// hoverable: adds a subtle lift on hover (defined in design.css)
// Custom theme vars (via style or design.css): --color-primary, --color-secondary

export const Card = ({
  title,
  headerRight,
  children,
  footer,
  hoverable = false,
  className = "",
  ...props
}) => {
  const cardClass = ["card", hoverable ? "card-hoverable" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={cardClass} {...props}>
      {(title || headerRight) && (
        <header className="card-header">
          {title && (
            <p className="card-header-title">
              {title}
            </p>
          )}

          {headerRight && (
            <div className="card-header-icon">
              {headerRight}
            </div>
          )}
        </header>
      )}

      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>

      {footer && (
        <footer className="card-footer">
          {footer}
        </footer>
      )}
    </div>
  )
}
