import { Link } from 'react-router-dom';
import './Course.css';

const Course = ({ id, course, isSelected, hasConflict, toggleSelect, profile }) => {
  return (
    <div
      id={id}
      className={`course ${isSelected ? 'course-selected' : hasConflict ? 'course-conflict' : ''}`}
      onClick={(e) => {
          if (e.target.id !== "edit-link") {
            toggleSelect(course);
          };
        }
      }
    >
      {
        (profile?.isAdmin)
        ? <Link
            id="edit-link"
            className="edit-link"
            to={`/editCourse/${id}`}
            params={{ courseId: id, courseData: course }}
          >
            Edit
          </Link>
        : <div />
      }
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
