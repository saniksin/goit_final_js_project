/**
 * Exercises API client
 */

import axios from 'axios';
import { notify } from '../ui/notifications.js';

const BASE_URL = 'https://your-energy.b.goit.study/api';

const api = axios.create({
  baseURL: BASE_URL,
});

// Error messages mapping
const ERROR_MESSAGES = {
  400: 'Bad request. Please check your input.',
  401: 'Unauthorized. Please log in.',
  404: 'Resource not found.',
  409: 'This email has already been used.',
  500: 'Server error. Please try again later.',
  default: 'Something went wrong. Please try again.',
};

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      const message = !navigator.onLine
        ? 'No internet connection. Please check your network.'
        : 'Unable to connect to server. Please try again later.';
      notify.error(message);
      return Promise.reject(error);
    }

    const status = error.response.status;
    const serverMessage = error.response.data?.message;
    const message = serverMessage || ERROR_MESSAGES[status] || ERROR_MESSAGES.default;

    notify.error(message);
    return Promise.reject(error);
  }
);

/**
 * Get daily motivation quote
 */
export async function getQuote() {
  const { data } = await api.get('/quote');
  return data;
}

/**
 * Get filters (categories)
 * @param {Object} params
 * @param {string} params.filter - Filter type (Muscles, Body parts, Equipment)
 * @param {number} params.page
 * @param {number} params.limit
 */
export async function getFilters({ filter, page = 1, limit = 12 }) {
  const { data } = await api.get('/filters', {
    params: { filter, page, limit },
  });
  return data;
}

/**
 * Get exercises list
 * @param {Object} params
 * @param {string} params.bodypart
 * @param {string} params.muscles
 * @param {string} params.equipment
 * @param {string} params.keyword
 * @param {number} params.page
 * @param {number} params.limit
 */
export async function getExercises({
  bodypart,
  muscles,
  equipment,
  keyword,
  page = 1,
  limit = 10,
}) {
  const params = { page, limit };
  if (bodypart) params.bodypart = bodypart;
  if (muscles) params.muscles = muscles;
  if (equipment) params.equipment = equipment;
  if (keyword) params.keyword = keyword;

  const { data } = await api.get('/exercises', { params });
  return data;
}

/**
 * Get exercise by ID
 * @param {string} id
 */
export async function getExerciseById(id) {
  const { data } = await api.get(`/exercises/${id}`);
  return data;
}

/**
 * Update exercise rating
 * @param {string} id
 * @param {number} rating
 * @param {string} email
 * @param {string} review
 */
export async function updateRating(id, rating, email, review = '') {
  const body = { rate: rating, email };
  if (review) {
    body.review = review;
  }
  const { data } = await api.patch(`/exercises/${id}/rating`, body);
  return data;
}

/**
 * Subscribe to newsletter
 * @param {string} email
 */
export async function subscribe(email) {
  const { data } = await api.post('/subscription', { email });
  return data;
}
