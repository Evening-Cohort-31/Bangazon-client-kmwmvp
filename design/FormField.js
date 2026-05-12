// type: "text" | "email" | "password" | "number" | "date" | "tel" | "url"
// Pass inputRef from useRef() to read input value without re-renders (uncontrolled)
// Pass children to render a custom control (Select, Textarea, etc.) instead of the default input

export const FormField = ({ label, type = "text", placeholder = "", name, inputRef, defaultValue, children }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <div className="control">
        {children || (
          <input
            id={name}
            name={name}
            className="input"
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            ref={inputRef}
          />
        )}
      </div>
    </div>
  )
}
