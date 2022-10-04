import "./InputGroup.css";

const InputGroup = ({label, defaultValue}) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <input className="input-bar" defaultValue={defaultValue} placeholder={label}/>
  </div>
);

export default InputGroup;
