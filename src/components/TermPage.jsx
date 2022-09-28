import { useState } from 'react';
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";

const TermPage = ({courses}) => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const filteredCourses = Object.entries(courses).filter(course => selectedTerm === course[1].term);
  const terms = ["Fall", "Winter", "Spring"];

  return (
    <>
      <TermSelector
        terms={terms}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <CourseList courses={filteredCourses} />
    </>
  );
};

export default TermPage;
