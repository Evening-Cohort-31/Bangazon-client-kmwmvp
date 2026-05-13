// type/color: "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
// Custom theme: style={{ backgroundColor: 'var(--color-primary)' }} for brand colors

export const Notification = ({ type = "info", message, children, onClose }) => {
  return (
    <div className={`notification is-${type}`}>
      {onClose && <button className="delete" onClick={onClose} />}
      {children ?? message}
    </div>
  )
}
