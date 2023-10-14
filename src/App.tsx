
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import Manager from './views/manager';
import Issues from './views/issues/issues';
import AddIssue from './views/add-issue/add-issue';
import DetailIssue from './views/detail-issue/detail-issue';
import Dashboard from './views/dashboard/dashboard';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Manager />} />
          <Route path="/manager" element={<Manager />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="issues" element={<Issues />} />
            <Route path="addIssue" element={<AddIssue />} />
            <Route path="issue/:id" element={<AddIssue/>} />
            <Route path="detail-issue/:id" element={<DetailIssue />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;
