import {
  BaseResponse,
  DataResponse,
  ValidLoginStateResponse,
} from "../types/types";

export const login = async (): Promise<DataResponse<string>> => {
  const response = await fetch("/api/spotify/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login Spotify failed");
  }

  const data = await response.json();
  return data;
};

export const logout = async (): Promise<BaseResponse> => {
  const response = await fetch("/api/spotify/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login Spotify failed");
  }
  const data = await response.json();
  return data;
};

export const validLoginState = async (
  loginState: string
): Promise<ValidLoginStateResponse> => {
  try {
    const response = await fetch("/api/spotify/validLoginState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginState }),
    });

    if (!response.ok) {
      throw new Error(`Login state validation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error validating login state:", error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<DataResponse<string>> => {
  try {
    const response = await fetch("api/spotify/getAccessToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get AccessToken Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get Accesstoken", error);
    throw error;
  }
};
