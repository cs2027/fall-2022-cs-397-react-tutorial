import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import CourseListPage from "./components/CourseListPage";
import CourseEditPage from "./components/CourseEditPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import './App.css';

const queryClient = new QueryClient();

const Main = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [scheduleData, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [conflictingCourses, setConflictingCourses] = useState([]);

  if (error) return <h1>Error retrieving course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Retrieving course data...</h1>;

  return (
    <div className="app-body">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CourseListPage
                      title={scheduleData.title}
                      open={open}
                      openModal={openModal}
                      closeModal={closeModal}
                      courses={scheduleData.courses}
                      selectedCourses={selectedCourses}
                      setSelectedCourses={setSelectedCourses}
                      conflictingCourses={conflictingCourses}
                      setConflictingCourses={setConflictingCourses}
                    />}
          />
          <Route path="/editCourse/:courseId" element={<CourseEditPage courses={scheduleData.courses}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
