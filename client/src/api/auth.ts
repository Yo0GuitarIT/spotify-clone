import { LoginResponse } from "../types/types";

export const login = async (): Promise<LoginResponse> => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Login error", error);
    return {
      success: false,
      message: "Login failed",
      token: "",
    };
  }
};