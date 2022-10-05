import TermButton from "./TermButton";
import "./TermSelector.css";

const TermSelector = ({ terms, selectedTerm, setSelectedTerm }) => (
  <div className="term-button-select">
    {
      terms.map(term => (
        <TermButton
          key={term}
          term={term}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      ))
    }
  </div>
);

export default TermSelector;
