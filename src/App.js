import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import CourseListPage from "./components/CourseListPage";
import CourseEditPage from "./components/CourseEditPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from "./utilities/firebase";
import './App.css';

const queryClient = new QueryClient();

const Main = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [data, error] = useDbData('/');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [conflictingCourses, setConflictingCourses] = useState([]);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const courses = Object.entries(data.courses);

  return (
    <div className="app-body">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CourseListPage
                      title={data.title}
                      open={open}
                      openModal={openModal}
                      closeModal={closeModal}
                      courses={courses}
                      selectedCourses={selectedCourses}
                      setSelectedCourses={setSelectedCourses}
                      conflictingCourses={conflictingCourses}
                      setConflictingCourses={setConflictingCourses}
                    />}
          />
          <Route path="/editCourse/:courseId" element={<CourseEditPage courses={data.courses}/>}/>
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
