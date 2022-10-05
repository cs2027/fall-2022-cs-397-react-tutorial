import { useState } from 'react';
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import Modal from './Modal';
import CoursePlanButton from "./CoursePlanButton";
import "./TermPage.css";

const TermPage = (
  { open, openModal, closeModal, courses, selectedCourses, setSelectedCourses, conflictingCourses, setConflictingCourses, user }
) => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const filteredCourses = courses.filter(course => course[1].term === selectedTerm);
  const terms = ["Fall", "Winter", "Spring"];

  return (
    <div>
      <Modal
        open={open}
        closeModal={closeModal}
        selectedCourses={selectedCourses}
      />
      <div className={`top-row-wrapper ${open ? 'blur' : ''}`}>
        <TermSelector
          terms={terms}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <CoursePlanButton openModal={openModal}/>
      </div>
      <div className={`${open ? 'blur' : ''}`}>
        <CourseList
          courses={filteredCourses}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          conflictingCourses={conflictingCourses}
          setConflictingCourses={setConflictingCourses}
          user={user}
        />
      </div>
    </div>
  );
};

export default TermPage;
