import Link from "next/link"
import { useState } from "react"
import { Modal } from "./Modal"

const buildButtonClassName = ({
    color,
    variant,
    size,
    fullwidth,
    rounded,
    loading,
    disabled,
    className,
}) => {
    const classes = ["button"]

    if (color) classes.push(`is-${color}`)

    if (variant === "outlined") classes.push("is-outlined")
    if (variant === "light") classes.push("is-light")
    if (variant === "inverted") classes.push("is-inverted")

    if (size && size !== "normal") classes.push(`is-${size}`)

    if (fullwidth) classes.push("is-fullwidth")
    if (rounded) classes.push("is-rounded")
    if (loading) classes.push("is-loading")
    if (disabled) classes.push("is-static")

    if (className) classes.push(className)

    return classes.join(" ").trim()
}

export const Button = ({
    children,
    color,
    variant,
    size = "normal",
    fullwidth = false,
    rounded = false,
    loading = false,
    disabled = false,
    as: Component = "button",
    to,
    className = "",
    type = "button",
    confirm = false,
    confirmTitle = "Are you sure?",
    confirmMessage = "This action cannot be undone.",
    confirmText = "Confirm",
    confirmColor = "danger",
    onClick,
    ...rest
}) => {
    const [showConfirm, setShowConfirm] = useState(false)

    const computedClassName = buildButtonClassName({
        color, variant, size, fullwidth, rounded, loading, disabled, className,
    })

    const handleClick = (e) => {
        if (confirm) {
            setShowConfirm(true)
        } else {
            onClick?.(e)
        }
    }

    const handleConfirm = () => {
        setShowConfirm(false)
        onClick?.()
    }

    const ResolvedComponent = to ? Link : Component

    const buttonEl = ResolvedComponent === "button" ? (
        <button
            type={type}
            className={computedClassName}
            disabled={disabled || loading}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </button>
    ) : (
        <ResolvedComponent
            className={computedClassName}
            onClick={handleClick}
            {...(to ? { href: to } : {})}
            {...rest}
        >
            {children}
        </ResolvedComponent>
    )

    if (!confirm) return buttonEl

    return (
        <>
            {buttonEl}
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
        </>
    )
}
