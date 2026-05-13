// useRef pattern: const myRef = useRef(null) → pass as inputRef={myRef} → read with myRef.current.value on submit.
// This avoids re-rendering on every change (unlike useState + onChange).
// Use defaultValue to pre-populate for edit forms: defaultValue={existingProduct.categoryId}
// color: add className="is-primary" | "is-info" | "is-success" | "is-warning" | "is-danger" for border color

export const FormSelect = ({
  label,
  name,
  defaultValue,
  inputRef,
  children,
  className = "is-fullwidth",
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="control">
        <div className={`select ${className}`.trim()}>
          <select id={name} name={name} defaultValue={defaultValue} ref={inputRef}>
            {children}
          </select>
        </div>
      </div>
    </div>
  )
}
