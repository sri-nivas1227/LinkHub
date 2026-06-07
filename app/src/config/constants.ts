// API Configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Cookie Configuration
export const AUTH_COOKIE_NAME = "auth_token";
export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

// Routes
export const ROUTES = {
  HOME: "/home",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  VERIFY_EMAIL: "/auth/verifyEmail",
  ADD_LINK: "/addLink",
  PROFILE: "/profile",
  ROOT: "/",
  FEEDBACK: "/feedback",
} as const;

// PUBLIC_PATHS
export const PUBLIC_PATHS = [
  ROUTES.ROOT,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.VERIFY_EMAIL,
  ROUTES.FEEDBACK,
];
// UI Configuration
export const UI_CONFIG = {
  COPY_NOTIFICATION_TIMEOUT: 1500,
  DEFAULT_USERNAME: "Hello! New Here?",
} as const;

// App Metadata
export const APP_CONFIG = {
  NAME: "StashD",
  LOGO: "LH",
  DESCRIPTION: "Your personal hub for curated links.",
} as const;

// StashD API Endpoints
export const ENDPOINTS = {
  PING: "/ping",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_OTP_AUTH: "/auth/verify_otp",
  RESEND_OTP: "/auth/resend_otp",
  CATEGORIES: "/categories",
  LINKS_BY_CATEGORY: "/urls/category",
  LINK_DATA: "/urls",
  ALL_LINKS: "/urls/user",
  SEARCH_LINKS: "/urls/search",
  SHARED_CATEGORY: "/share/categories",
  ADD_LINK: "/urls",
  DELETE_LINK: "/urls",
  EDIT_LINK: "/urls",
  GET_PROFILE: "/profile",
  POST_PROFILE: "/profile",
  UPDATE_PASSWORD: "/auth/update_password",
  REPORT_ISSUE: "/admin/report_issue",
} as const;

// Footer Data

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/sri-nivas1227",
  X_TWITTER: "https://x.com/sri_nivas1227",
  LINKEDIN: "https://www.linkedin.com/in/sri-nivas1227",
  GOFUNDME: "",
};

export const FOOTER_LINKS = {
  ABOUT: "/",
  CHANGELOG: "/",
  REPORT_ISSUE: "/feedback",
  TERMS: "/",
};
