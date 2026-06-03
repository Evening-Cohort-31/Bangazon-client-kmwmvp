export function Input({ id, type = "text", placeholder = "", refEl = undefined, value, label = undefined, onChangeEvent, addlClass = "", children }) {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="label">{label}</label>}
      <div className="control">
        <input
          id={id}
          placeholder={placeholder}
          className="input"
          type={type}
          ref={refEl}
          onChange={onChangeEvent}
          {...(value !== undefined ? { value } : {})}
        ></input>
      </div>
      {children}
    </div>
  )
}
