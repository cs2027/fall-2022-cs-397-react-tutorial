import './Modal.css';
import Course from './Course';

const Modal = ({ open, closeModal, selectedCourses }) => (
  <div
    className={`modal ${open ? 'modal-show' : ''}`}
  >
    <div className="modal-header">
      <div
        className="button-close"
        onClick={closeModal}
      >
        X
      </div>
    </div>
    <div className="modal-body">
      {
        selectedCourses.length === 0
        ? <h2>No courses selected. To select courses, exit the modal, select a term, and click on courses to add.</h2>
        : selectedCourses.map((course, id) => (
          <Course
            key={id}
            course={course}
          />
        ))
      }
    </div>
  </div>
);

export default Modal;
