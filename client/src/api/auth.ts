import { LoginResponse, VerifyResponse, LogoutResponse } from "../types/types";

export const login = async (): Promise<LoginResponse> => {
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
};

export const verifyToken = async (token: string): Promise<VerifyResponse> => {
  const response = await fetch("/api/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("verify failed");
  }

  const data: VerifyResponse = await response.json();
  return data;
};

export const logout = async (token: string): Promise<LogoutResponse> => {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("verify failed");
  }

  const data: LogoutResponse = await response.json();
  return data;
};
