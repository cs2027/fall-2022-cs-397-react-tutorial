const TermButton = ({ term, selectedTerm, setSelectedTerm }) => (
  <div>
    <input
      id={term}
      type="radio"
      checked={term === selectedTerm}
      onChange={() => setSelectedTerm(term)}
    />
    <label htmlFor={term}>
      { term }
    </label>
  </div>
);

export default TermButton;
