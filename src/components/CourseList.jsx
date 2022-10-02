
import Course from './Course';
import './CourseList.css';
import {
  computeNewConflictingCourses,
  computeOldConflictingCourses
} from '../utilities/courseConflict';

const CourseList = (
  {courses, selectedCourses, setSelectedCourses, conflictingCourses, setConflictingCourses}
) => {
  const toggleSelect = (course) => {
    const newCourse = !(selectedCourses.includes(course));

    setSelectedCourses(
      newCourse
      ? [...selectedCourses, course]
      : selectedCourses.filter(selectedCourse => selectedCourse !== course)
    );

    if (course.meets.trim() === "") {
      return;
    };

    if (newCourse) {
      const newConflictingCourses = computeNewConflictingCourses(
                                                                course,
                                                                courses,
                                                                selectedCourses,
                                                                conflictingCourses
                                                              );

      setConflictingCourses([...conflictingCourses, ...newConflictingCourses]);
    } else {
      const oldConflictingCourses = computeOldConflictingCourses(course, conflictingCourses);

      setConflictingCourses(conflictingCourses.filter(course => !oldConflictingCourses.includes(course)));
    };
  };

  return (
    <div className="course-list">
      {
        courses.map(([id, course]) => (
          <Course
            key={id}
            course={course}
            isSelected={selectedCourses.includes(course)}
            hasConflict={conflictingCourses.includes(course)}
            toggleSelect={toggleSelect}
          />
        ))
      }
    </div>
  );
};

export default CourseList;
