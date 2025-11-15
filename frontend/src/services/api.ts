import axios from 'axios';

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== Authentication API =====
export const authAPI = {
  signup: (data: any) => api.post('/auth/signup', data),
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// ===== Chat/Assessment API =====
export const chatAPI = {
  getChatHistory: (userId: string) => api.get(`/chat/history/${userId}`),
  saveChatMessage: (data: any) => api.post('/chat/save', data),
};

// ===== Success Stories API =====
export const storiesAPI = {
  getAllStories: () => api.get('/stories'),
  getStoryById: (id: string) => api.get(`/stories/${id}`),
  getMatchedStories: (userId: string) => api.get(`/stories/matched/${userId}`),
};

// ===== Career Pathway API =====
export const pathwayAPI = {
  getPathway: (userId: string) => api.get(`/pathway/${userId}`),
  generatePathway: (data: any) => api.post('/pathway/generate', data),
  updateProgress: (userId: string, stepId: string) =>
    api.put(`/pathway/${userId}/progress/${stepId}`),
};

// ===== Mentors API =====
export const mentorsAPI = {
  getAllMentors: () => api.get('/mentors'),
  getMentorById: (id: string) => api.get(`/mentors/${id}`),
  requestMentor: (userId: string, mentorId: string) =>
    api.post('/mentors/request', { userId, mentorId }),
  getMyMentors: (userId: string) => api.get(`/mentors/my/${userId}`),
};

// ===== Courses API =====
export const coursesAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id: string) => api.get(`/courses/${id}`),
  getRecommendedCourses: (userId: string) =>
    api.get(`/courses/recommended/${userId}`),
  enrollCourse: (userId: string, courseId: string) =>
    api.post('/courses/enroll', { userId, courseId }),
  getMyCourses: (userId: string) => api.get(`/courses/my/${userId}`),
};

// ===== Progress Tracking API =====
export const progressAPI = {
  getUserProgress: (userId: string) => api.get(`/progress/${userId}`),
  updateModuleProgress: (userId: string, moduleId: string, progress: number) =>
    api.put(`/progress/${userId}/module/${moduleId}`, { progress }),
  markLessonComplete: (userId: string, lessonId: string) =>
    api.post(`/progress/${userId}/lesson/${lessonId}/complete`),
  getStatistics: (userId: string) => api.get(`/progress/${userId}/stats`),
};

// ===== Certifications API =====
export const certificationsAPI = {
  getUserCertifications: (userId: string) => api.get(`/certifications/${userId}`),
  requestCertification: (userId: string, courseId: string) =>
    api.post('/certifications/request', { userId, courseId }),
  verifyCertification: (certId: string) =>
    api.get(`/certifications/verify/${certId}`),
};

// ===== Networking/Jobs API =====
export const networkingAPI = {
  getAllJobs: () => api.get('/networking/jobs'),
  getJobById: (id: string) => api.get(`/networking/jobs/${id}`),
  applyToJob: (userId: string, jobId: string) =>
    api.post('/networking/apply', { userId, jobId }),
  getMyApplications: (userId: string) =>
    api.get(`/networking/applications/${userId}`),
  getNetworkingEvents: () => api.get('/networking/events'),
};

export default api;
