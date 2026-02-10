// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Cookie Configuration
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'auth_token';
export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

// Routes
export const ROUTES = {
  HOME: '/home',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  ADD_LINK: '/addLink',
  ROOT: '/',
} as const;

// UI Configuration
export const UI_CONFIG = {
  COPY_NOTIFICATION_TIMEOUT: 1500,
  DEFAULT_USERNAME: 'Hello User!',
} as const;

// App Metadata
export const APP_CONFIG = {
  NAME: 'LinkHub',
  LOGO: 'LH',
  DESCRIPTION: 'Your personal hub for curated links.',
} as const;
