import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constants";

export const generateToken = (payLoad: any): string => {
  return jwt.sign(payLoad, SECRET_KEY as string, { expiresIn: "1m" });
};

export const verifyToken = async (token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY as string, (error: any, payload: any) => {
      if (error) reject(false);
      resolve(payload);
    });
  });
};
