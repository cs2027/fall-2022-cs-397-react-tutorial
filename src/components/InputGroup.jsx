import "./InputGroup.css";

const InputGroup = ({keyName, label, state, change}) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <input
      className={`input-bar ${state.errors?.[keyName] ? 'invalid-input-bar' : ''}`}
      id={keyName}
      name={keyName}
      defaultValue={state.values?.[keyName]}
      onChange={change}
      placeholder={label}
    />
    <div className="invalid-input-msg">{state.errors?.[keyName]}</div>
  </div>
);

export default InputGroup;
