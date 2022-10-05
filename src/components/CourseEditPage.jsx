import { useParams, Link, useNavigate } from "react-router-dom";
import InputGroup from "./InputGroup";
import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';
import "./CourseEditPage.css";

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      return /^$/.test(val) || /^(\w)+\s\d{1,2}:\d{1,2}-\d{1,2}:\d{1,2}$/.test(val)
            ? ''
            : 'must be either empty string OR must contain days and start-end, e.g. MWF 12:00-13:20';
    default: return '';
  }
};

const CourseEditPage = ({courses, user}) => {
  if (!user) {
    window.location.href = "/";
  };

  const { courseId } = useParams();
  const courseData = Object.entries(courses).filter(course => course[0] === courseId)[0][1];
  const courseDataFormSubset = (({ title, meets }) => ({ title, meets }))(courseData);

  const [update, result] = useDbUpdate(`/courses/${courseId}`);
  const [state, change] = useFormData(validateUserData, courseDataFormSubset);
  const navigation = useNavigate();

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
      navigation("/");
    };
  };

  return (
    <div className="edit-course-page">
      <h1 className="edit-course-header">Edit Course: {courseData.term} CS {courseData.number}</h1>
      <form onSubmit={submit} noValidate>
        <InputGroup keyName="title" label="Course Title" defaultValue={courseData.title} state={state} change={change}/>
        <InputGroup keyName="meets" label="Meeting Times" defaultValue={courseData.meets} state={state} change={change}/>
        <div className="button-group">
          <button
            disabled={
              state.errors ||
              JSON.stringify(state.values) === JSON.stringify(courseDataFormSubset)
            }
            type="submit"
            className={
              `button submit-button
              ${state.errors || JSON.stringify(state.values) === JSON.stringify(courseDataFormSubset)
                ? "button-disabled"
                : ""}`
              }
          >
            Submit
          </button>
          <Link to="/">
            <input className="button cancel-button" defaultValue="Cancel" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CourseEditPage;
