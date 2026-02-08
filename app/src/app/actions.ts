"use server";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
type responseFormat = { success: boolean; message: string; data?: any };

// Auth Actions

export async function postSignupAction(formData: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseData: responseFormat = await response.json();
  console.log(responseData);
  return responseData;
}

export async function postLoginAction(formData: any) {
  console.log("ihkllj")
  // 1. Call your external API
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData: responseFormat = await response.json();
  console.log(responseData, 'login info')
  if (response.ok) {
    // 2. Set the cookie on the server side
    const cookieStore = await cookies();
    cookieStore.set("auth_token", responseData.data.token, {
      httpOnly: true, // Security best practice
      secure: true,
      path: "/",
    });
    return responseData;
  }

  return responseData;
}

export async function checkTokenAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return token ? true : false;
}

export async function extractTokenAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (token) {
    const payload = jwt.decode(token);
    return payload;
  }
  return null;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return true;
  
}

// Homepage actions
export async function getCategoriesAction() {
  console.log("inside categories action");
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  console.log(token);
  const response = await fetch("http://localhost:5000/categories", {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token?.value}`,
    },
  });
  const data: responseFormat = await response.json();
  console.log("response from API", data);
  return data;
}

export async function getLinksFromCategoriesAction(selectedCategoryId: string) {
  console.log("inside categories action");
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  console.log(token);
  const response = await fetch(
    `http://localhost:5000/urls/category?category_id=${selectedCategoryId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token?.value}`,
      },
    },
  );
  const data: responseFormat = await response.json();
  console.log("response from API", data);
  return data;
}

export async function postAddURLAction(newLink: any) {
  console.log("inside categories action", newLink);
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  console.log(token);
  const response = await fetch(`http://localhost:5000/urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        Cookie: `token=${token?.value}`,
    },
    body: JSON.stringify(newLink),
  });
  const data: responseFormat = await response.json();
  console.log("response from API", data);
  return data;
}
