"use server";
import { cookies, headers } from "next/headers";


type responseFormat ={ success: boolean; message: string; data?: any }


export async function signupAction(formData: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch("http://localhost:5000/signup", {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  });
  const responseData : responseFormat = await response.json();
  console.log(responseData);
  return responseData;
}

export async function loginAction(formData: any) {
  // 1. Call your external API
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData: responseFormat =
    await response.json();

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
