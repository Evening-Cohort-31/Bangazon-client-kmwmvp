export function Select({id, refEl, options, title, label, addlClass = "", multiple = false }) {
  return (
    <div className="field is-expanded">
      {label ? <label className="label" htmlFor={id}>{label}</label> : <></>}
      <div className={`select ${multiple ? 'is-multiple' : ''} ${addlClass} is-fullwidth`}>
        <select id={id} ref={refEl} multiple={multiple} size={multiple ? 5 : undefined}>
          <option value="0" disabled={multiple}>{title}</option>
          {
            options.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}
