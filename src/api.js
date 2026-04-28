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
  changePassword: (old_password, new_password, new_password_confirm) => request('/auth/change-password/', { method: 'POST', body: JSON.stringify({old_password, new_password, new_password_confirm}) }),
  register: (data) => request('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),

  // --- ANALYTICS ---
  getAdminDashboard: () => request('/analytics/admin-dashboard/'),
  getTeacherDashboard: () => request('/analytics/teacher-dashboard/'),

  // --- ATTENDANCE ---
  getAttendanceLogs: () => request('/attendance/'),
  getAttendanceToday: () => request('/attendance/today/'),
  checkIn: (qr_code) => request('/attendance/check-in/', { method: 'POST', body: JSON.stringify({ qr_code }) }),
  markAbsent: (date) => request('/attendance/mark_absent/', { method: 'POST', body: JSON.stringify({ date }) }),
  getQRCodes: () => request('/attendance/qrcodes/'),
  generateStaticQR: () => request('/attendance/qrcodes/generate_static/', { method: 'POST', body: JSON.stringify({}) }),
  
  // --- LESSONS ---
  getLessons: () => request('/lessons/'),
  getLessonsToday: () => request('/lessons/today/'),
  getLateLessons: () => request('/lessons/late_started/'),
  getMissedLessons: () => request('/lessons/missed/'),
  startLesson: (lesson_id) => request('/lessons/start/', { method: 'POST', body: JSON.stringify({ lesson_id }) }),
  endLesson: (lesson_id, notes) => request('/lessons/end/', { method: 'POST', body: JSON.stringify({ lesson_id, notes }) }),
  generateLessonsFromSchedule: (date) => request('/lessons/generate_from_schedule/', { method: 'POST', body: JSON.stringify({ date }) }),

  // --- SCHEDULES ---
  getSchedules: () => request('/lessons/schedules/'),
  getWeeklySchedules: () => request('/lessons/schedules/weekly/'),
  createSchedule: (data) => request('/lessons/schedules/', { method: 'POST', body: JSON.stringify(data) }),
  checkScheduleConflict: (data) => request('/lessons/schedules/check_conflict/', { method: 'POST', body: JSON.stringify(data) }),

  // --- NOTIFICATIONS ---
  getNotifications: () => request('/notifications/'),
  getUnreadNotificationsCount: () => request('/notifications/unread_count/'),
  markNotificationAsRead: (id) => request('/notifications/mark_as_read/', { method: 'POST', body: JSON.stringify({ id }) }),

  // --- PHOTOS ---
  getPhotos: () => request('/photos/'),
  getPendingPhotos: () => request('/photos/pending/'),
  getMissingPhotos: () => request('/photos/missing/'),
  getPhotoStats: () => request('/photos/stats/'),
  uploadPhoto: (lesson_id, photo_url) => request('/photos/', { method: 'POST', body: JSON.stringify({ lesson: lesson_id, photo: photo_url }) }),
  reviewPhoto: (photo_id, status, review_notes) => request(`/photos/${photo_id}/review/`, { method: 'POST', body: JSON.stringify({ status, review_notes }) }),

  // --- TEACHERS ---
  getTeachers: () => request('/teachers/'),
  createTeacher: (data) => request('/teachers/', { method: 'POST', body: JSON.stringify(data) }),
  assignClassesToTeacher: (id, class_ids) => request(`/teachers/${id}/assign_classes/`, { method: 'POST', body: JSON.stringify({ class_ids }) }),
  assignSubjectsToTeacher: (id, subject_ids) => request(`/teachers/${id}/assign_subjects/`, { method: 'POST', body: JSON.stringify({ subject_ids }) }),
  getTeacherStatusInfo: (id) => request(`/teachers/${id}/status_info/`),

  // --- CLASSES ---
  getClasses: () => request('/teachers/classes/'),
  createClass: (data) => request('/teachers/classes/', { method: 'POST', body: JSON.stringify(data) }),

  // --- SUBJECTS ---
  getSubjects: () => request('/teachers/subjects/'),
  createSubject: (data) => request('/teachers/subjects/', { method: 'POST', body: JSON.stringify(data) }),
};
