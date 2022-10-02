import './Course.css';

const Course = ({course, isSelected, hasConflict, toggleSelect}) => {

  return (
    <div
      className={`course ${isSelected ? 'course-selected' : hasConflict ? 'course-conflict' : ''}`}
      onClick={() => toggleSelect(course)}
    >
      <div className="course-top">
        <div className="course-header">{course.term} CS {course.number}</div>
        <div>{course.title}</div>
      </div>
      <hr />
      <div>{course.meets}</div>
    </div>
  );
};

export default Course;
