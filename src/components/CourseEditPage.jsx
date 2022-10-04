import { useParams, Link } from "react-router-dom";
import InputGroup from "./InputGroup";
import "./CourseEditPage.css";

const CourseEditPage = ({courses}) => {
  const { courseId } = useParams();
  const courseData = Object.entries(courses).filter(course => course[0] === courseId)[0][1];

  return (
    <div className="edit-course-page">
      <h1 className="edit-course-header">Edit Course: {courseId}</h1>
      <form onSubmit={() => {}}>
        <InputGroup label="Course Number" defaultValue={courseData.number} />
        <InputGroup label="Course Title" defaultValue={courseData.title} />
        <InputGroup label="Meeting Times" defaultValue={courseData.meets} />
        <div className="button-group">
          <Link to="/">
            <input className="button cancel-button" defaultValue="Cancel" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CourseEditPage;
