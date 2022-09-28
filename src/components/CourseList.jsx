import { useState } from 'react';
import Course from './Course';
import './CourseList.css';

const CourseList = ({courses}) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleSelect = (course) => setSelectedCourses(
    selectedCourses.includes(course)
    ? selectedCourses.filter(selectedCourse => selectedCourse !== course)
    : [...selectedCourses, course]
  );

  return (
    <div className="course-list">
      {
        courses.map(([id, course]) => (
          <Course
            key={id}
            course={course}
            isSelected={selectedCourses.includes(course)}
            toggleSelect={toggleSelect}
          />
        ))
      }
    </div>
  );
};

export default CourseList;
