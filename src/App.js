import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import CourseListPage from "./components/CourseListPage";
import CourseEditPage from "./components/CourseEditPage";
import AuthButton from "./components/AuthButton";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData, useAuthState } from "./utilities/firebase";
import { useProfile } from './utilities/profile';
import './App.css';

const queryClient = new QueryClient();

const Main = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [data, error] = useDbData('/');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [conflictingCourses, setConflictingCourses] = useState([]);

  const [user] = useAuthState();

  const [profile, profileLoading, profileError] = useProfile();

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  const courses = Object.entries(data.courses);

  console.log(data.title)

  return (
    <div className="app-body">
      <AuthButton open={open} user={user}/>
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
                      user={user}
                      profile={profile}
                    />}
          />
          <Route path="/editCourse/:courseId" element={<CourseEditPage courses={data.courses} profile={profile}/>}/>
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
