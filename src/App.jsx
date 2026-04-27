import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeachersList from './pages/admin/TeachersList';
import Schedule from './pages/admin/Schedule';
import QRCheckinData from './pages/admin/QRCheckinData';
import VideoReviewList from './pages/admin/VideoReviewList';
import Settings from './pages/admin/Settings';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import QRTerminal from './pages/QRTerminal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/terminal" element={<QRTerminal />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="teachers" element={<TeachersList />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="qr-checkin" element={<QRCheckinData />} />
          <Route path="video-review" element={<VideoReviewList />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="schedule" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">Mening darslarim yuklanmoqda...</h2></div>} />
          <Route path="qr-scan" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">QR Skaner ulanmoqda...</h2></div>} />
          <Route path="stats" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">Shaxsiy statistika ulanmoqda...</h2></div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
