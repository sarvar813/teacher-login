import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
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
          <Route path="teachers" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">O'qituvchilar paneliga ulanmoqda...</h2></div>} />
          <Route path="schedule" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">Dars Jadvali paneliga ulanmoqda...</h2></div>} />
          <Route path="qr-checkin" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">QR Nazorat paneliga ulanmoqda...</h2></div>} />
          <Route path="video-review" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">Video Tekshiruv paneliga ulanmoqda...</h2></div>} />
          <Route path="settings" element={<div className="flex-center" style={{height:'100%'}}><h2 className="heading-3 text-muted">Sozlamalar qismi ulanmoqda...</h2></div>} />
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
