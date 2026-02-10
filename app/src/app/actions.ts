"use server";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import { API_URL, AUTH_COOKIE_NAME, COOKIE_CONFIG } from "@/config/constants";

type responseFormat = { success: boolean; message: string; data?: any };

// Auth Actions

export async function postSignupAction(formData: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch(`${API_URL}/signup`, {
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
  const response = await fetch(`${API_URL}/login`, {
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
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();
  return data;
}

export async function getLinksFromCategoriesAction(selectedCategoryId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  const response = await fetch(
    `${API_URL}/urls/category?category_id=${selectedCategoryId}`,
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

export async function postAddURLAction(newLink: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  const response = await fetch(`${API_URL}/urls`, {
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
