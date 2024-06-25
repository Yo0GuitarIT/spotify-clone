import { ApiResponse } from "../types/types";

export const login = async (): Promise<ApiResponse> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: ApiResponse = await response.json();
  return data;
};

export const verifyToken = async (token: string): Promise<ApiResponse> => {
  const response = await fetch("/api/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("verify failed");
  }

  const data: ApiResponse = await response.json();
  return data;
};

export const logout = async (token: string): Promise<ApiResponse> => {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("verify failed");
  }

  const data: ApiResponse = await response.json();
  return data;
};
