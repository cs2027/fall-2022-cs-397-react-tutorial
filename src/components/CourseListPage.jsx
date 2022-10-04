import Banner from "./Banner";
import TermPage from "./TermPage";

const CourseListPage = (
  { title, open, openModal, closeModal, courses, selectedCourses, setSelectedCourses, conflictingCourses, setConflictingCourses }
) => (
  <div
    className="app-body"
    onClick={(e) => {
      if (open) {
        const modal = document.getElementsByClassName("modal")[0];

        if (modal !== e.target && !modal.contains(e.target)) {
          closeModal();
        }
      }
    }}
  >
    <Banner
      title={title}
      open={open}
    />
    <TermPage
      open={open}
      openModal={openModal}
      closeModal={closeModal}
      courses={courses}
      selectedCourses={selectedCourses}
      setSelectedCourses={setSelectedCourses}
      conflictingCourses={conflictingCourses}
      setConflictingCourses={setConflictingCourses}
    />
  </div>
);

export default CourseListPage;
