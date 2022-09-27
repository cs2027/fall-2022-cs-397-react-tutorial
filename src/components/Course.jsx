import './Course.css';

// "F110" : {
//   "term": "Fall",
//   "number": "110",
//   "meets" : "MWF 10:00-10:50",
//   "title" : "Intro Programming for non-majors"
// },
const Course = ({course}) => (
  <div className="course">
    <div className="course-top">
      <div class="course-header">{course.term} CS {course.number}</div>
      <div>{course.title}</div>
    </div>
    <hr />
    <div>{course.meets}</div>
  </div>
);

export default Course;
