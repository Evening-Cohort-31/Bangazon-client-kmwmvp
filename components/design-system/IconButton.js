import { useState } from "react"
import { Modal } from "./Modal"

// color: "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
// icon: any Font Awesome solid icon name e.g. "trash" | "pencil" | "gear" | "eye" | "plus"
// Custom theme: style={{ color: 'var(--color-primary)' }} for brand-colored icons

export const IconButton = ({
    icon,
    title = "",
    onClick,
    color,
    className = "",
    confirm = false,
    confirmTitle = "Are you sure?",
    confirmMessage = "This action cannot be undone.",
    confirmText = "Confirm",
    confirmColor = "danger",
    ...rest
}) => {
    const [showConfirm, setShowConfirm] = useState(false)

    const colorClass = color ? `is-${color}` : ""

    const handleClick = () => {
        if (confirm) {
            setShowConfirm(true)
        } else {
            onClick?.()
        }
    }

    const handleConfirm = () => {
        setShowConfirm(false)
        onClick?.()
    }

    return (
        <>
            <button
                type="button"
                className={`button is-small ${colorClass} ${className}`.trim()}
                title={title}
                aria-label={title}
                onClick={handleClick}
                {...rest}
            >
                <span className="icon is-small">
                    <i className={`fas fa-${icon}`} aria-hidden="true"></i>
                </span>
            </button>

            {confirm && (
                <Modal
                    isOpen={showConfirm}
                    title={confirmTitle}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleConfirm}
                    confirmText={confirmText}
                    confirmColor={confirmColor}
                >
                    <p>{confirmMessage}</p>
                </Modal>
            )}
        </>
    )
}
