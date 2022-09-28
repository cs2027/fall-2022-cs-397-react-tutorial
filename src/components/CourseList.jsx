import Course from './Course';
import './CourseList.css';

const CourseList = ({courses}) => (
  <div className="course-list">
    { courses.map(([id, course]) => <Course key={id} course={course} />) }
  </div>
);

export default CourseList;
