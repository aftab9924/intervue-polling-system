import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import StudentPage from './pages/student/StudentPage';
import TeacherPage from './pages/teacher/TeacherPage';
import AdminPage from './pages/admin/AdminPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<div className="p-8 text-center text-red-500 font-semibold">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
