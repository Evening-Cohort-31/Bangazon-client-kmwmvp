// type: "text" | "email" | "password" | "number" | "date" | "tel" | "url"
// Pass inputRef from useRef() to read input value without re-renders (uncontrolled)
// Pass children to render a custom control (Select, Textarea, etc.) instead of the default input
// Pass error (string) to show a red helper message and highlight the input border

export const FormField = ({ label, type = "text", placeholder = "", name, inputRef, defaultValue, children, error, onChange, inputMode }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <div className="control">
        {children || (
          <input
            id={name}
            name={name}
            className={`input${error ? ' is-danger' : ''}`}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            ref={inputRef}
            onChange={onChange}
            inputMode={inputMode}
          />
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  )
}
