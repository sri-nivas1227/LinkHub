"use server";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import {
  API_URL,
  AUTH_COOKIE_NAME,
  COOKIE_CONFIG,
  ENDPOINTS,
} from "@/config/constants";

type responseFormat = { success: boolean; message: string; data?: any };

// Auth Actions

export async function postSignupAction(formData: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch(`${API_URL}${ENDPOINTS.SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseData: responseFormat = await response.json();
  return responseData;
}

export async function postLoginAction(formData: any) {
  // 1. Call your external API
  const response = await fetch(`${API_URL}${ENDPOINTS.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData: responseFormat = await response.json();
  if (response.ok) {
    // 2. Set the cookie on the server side
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, responseData.data.token, COOKIE_CONFIG);
    return responseData;
  }

  return responseData;
}

export async function pingServerAction() {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.PING}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();
  if (!data.success) {
    cookieStore.delete(AUTH_COOKIE_NAME);
  }
  return data;
}
export async function checkTokenAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token ? true : false;
}

export async function extractTokenAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (token) {
    const payload = jwt.decode(token);
    return payload;
  }
  return null;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return true;
}

// Homepage actions
export async function getCategoriesAction() {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.CATEGORIES}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();
  return data;
}

export async function getLinksFromCategoriesAction(selectedCategoryId: string) {
  const token = await getToken();
  const response = await fetch(
    `${API_URL}${ENDPOINTS.LINKS_BY_CATEGORY}?category_id=${selectedCategoryId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token?.value}`,
      },
    },
  );
  const data: responseFormat = await response.json();
  return data;
}

export async function getAllLinksAction() {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.ALL_LINKS}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();

  return data;
}

export async function getLinkOnSearchAction(searchQuery: string) {
  const cookieStore = await cookies();
  const response = await fetch(
    `${API_URL}${ENDPOINTS.SEARCH_LINKS}?query=${searchQuery}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookieStore.get(AUTH_COOKIE_NAME)?.value}`,
      },
    },
  );
  const data: responseFormat = await response.json();
  return data;
}

export async function getLinkDataAction(linkId: string) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.LINK_DATA}/${linkId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();
  return data;
}

export async function postAddURLAction(newLink: any) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.ADD_LINK}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
    body: JSON.stringify(newLink),
  });
  const data: responseFormat = await response.json();
  return data;
}

export async function putEditURLAction(updatedLink: any, linkId: string) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.EDIT_LINK}/${linkId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
    body: JSON.stringify(updatedLink),
  });
  const data: responseFormat = await response.json();
  return data;
}

export async function deleteURLAction(linkId: string){
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.DELETE_LINK}/${linkId}`, {
    method:"DELETE",
    headers:{
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    }
  });
  const data: responseFormat = await response.json();
  return data;
}

// Profile actions
export async function getProfileAction() {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_PROFILE}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();
  return data;
}

export async function postUpdateProfileAction(updatedProfile: any) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${ENDPOINTS.POST_PROFILE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
    body: JSON.stringify(updatedProfile),
  });
  const data: responseFormat = await response.json();
  return data;
}

// Helper function to get token from cookies
async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME);
}
