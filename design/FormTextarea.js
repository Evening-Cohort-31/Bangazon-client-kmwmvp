// useRef pattern: const myRef = useRef(null) → pass as inputRef={myRef} → read with myRef.current.value on submit.
// This avoids re-rendering on every keystroke (unlike useState + onChange).
// Use defaultValue to pre-populate for edit forms: defaultValue={existingProduct.description}
// rows: controls textarea height (default 4)
// color: add className="is-primary" | "is-success" | "is-danger" for border color

export const FormTextarea = ({
  label,
  name,
  defaultValue,
  placeholder = "",
  required = false,
  rows = 4,
  className = "",
  inputRef,
  ...rest
}) => {
  return (
    <div className="field">
      {label && <label className="label" htmlFor={name}>{label}</label>}
      <div className="control">
        <textarea
          id={name}
          name={name}
          className={`textarea ${className}`.trim()}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          rows={rows}
          ref={inputRef}
          {...rest}
        />
      </div>
    </div>
  )
}
