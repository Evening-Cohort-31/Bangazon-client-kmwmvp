// boxed: wraps the form in a Bulma "box" (white card with padding)
// centered: centers the form horizontally on the page
// Use FormField, FormTextarea, FormSelect, and Button as children

export const Form = ({
    children,
    onSubmit,
    className = "",
    boxed = false,
    centered = false,
    style,
    ...rest
}) => {

    // Optional wrapper classes
    const wrapperClasses = [
        boxed ? "box" : "",
        centered ? "is-flex is-justify-content-center" : "",
    ].join(" ").trim()

    // The actual form element
    const formElement = (
        <form
            onSubmit={onSubmit}
            className={className}
            style={style}
            {...rest}
        >
            {children}
        </form>
    )

    // Wrap in box if requested
    if (boxed || centered) {
        return (
            <div className={wrapperClasses}>
                {formElement}
            </div>
        )
    }

    return formElement
}

export const FormActions = ({ children, centered = false }) => (
    <div className={`buttons ${centered ? "is-centered" : ""}`}>
        {children}
    </div>
)