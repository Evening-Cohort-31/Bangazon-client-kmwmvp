// color: "primary" | "link" | "info" | "success" | "warning" | "danger" | "light" | "dark"
// size: use className="is-medium" or "is-large" for larger tags
// Custom theme: style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }} for brand colors

export const Tag = ({
    children,
    color,
    light = false,
    rounded = false,
    className = "",
    onClick,
    disabled = false,
    ...rest
}) => {
    const isInteractive = typeof onClick === "function"

    const classes = [
        "tag",
        color ? `is-${color}` : "",
        light ? "is-light" : "",
        rounded ? "is-rounded" : "",
        isInteractive ? "is-clickable" : "",
        disabled ? "is-static" : "",
        className,
    ]
        .join(" ")
        .trim()

    // If interactive → render button for accessibility
    if (isInteractive) {
        return (
            <button
                type="button"
                className={classes}
                onClick={disabled ? undefined : onClick}
                disabled={disabled}
                style={{ border: "none" }}
                {...rest}
            >
                {children}
            </button>
        )
    }

    // Otherwise render normal tag
    return (
        <span className={classes} {...rest}>
            {children}
        </span>
    )
}