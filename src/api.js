const BASE_URL = 'https://teacher-web-beckend.onrender.com/api/v1';

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token is invalid or expired
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw { status: response.status, data };
  }

  return data;
};

export const api = {
  // --- AUTH ---
  login: (username, password) => request('/auth/login/', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getProfile: () => request('/auth/profile/'),

  // --- ADMIN ANALYTICS ---
  getAdminDashboard: () => request('/analytics/admin-dashboard/'),
  getTeacherDashboard: () => request('/analytics/teacher-dashboard/'),

  // --- TEACHERS & CLASSES ---
  getTeachers: () => request('/teachers/'),
  getClasses: () => request('/teachers/classes/'),
  
  // --- ATTENDANCE & QR ---
  getAttendanceLogs: () => request('/attendance/'),
  checkIn: (qr_code) => request('/attendance/check-in/', { method: 'POST', body: JSON.stringify({ qr_code }) }),
  
  // --- LESSONS & SCHEDULE ---
  getSchedules: () => request('/lessons/schedules/weekly/'),
  startLesson: (lesson_id) => request('/lessons/start/', { method: 'POST', body: JSON.stringify({ lesson_id }) }),
  endLesson: (lesson_id, notes) => request('/lessons/end/', { method: 'POST', body: JSON.stringify({ lesson_id, notes }) }),
  
  // --- PHOTOS / VIDEO PROOF ---
  getPendingPhotos: () => request('/photos/pending/'),
  uploadPhoto: (lesson_id, photo_url) => request('/photos/', { method: 'POST', body: JSON.stringify({ lesson: lesson_id, photo: photo_url }) }),
  reviewPhoto: (photo_id, status) => request(`/photos/${photo_id}/review/`, { method: 'POST', body: JSON.stringify({ status }) }) // status: 'accepted' | 'rejected'
};
