import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import './App.css';

const queryClient = new QueryClient();

const Main = () => {
  const [scheduleData, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error retrieving course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Retrieving course data...</h1>;

  return (
    <div className="app-body">
      <Banner title={scheduleData.title} />
      <TermPage courses={scheduleData.courses} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
