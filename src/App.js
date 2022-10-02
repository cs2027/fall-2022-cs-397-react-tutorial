import { useState } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import './App.css';

const queryClient = new QueryClient();

const Main = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [scheduleData, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error retrieving course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Retrieving course data...</h1>;

  return (
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
        title={scheduleData.title}
        open={open}
      />
      <TermPage
        courses={scheduleData.courses}
        open={open}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
