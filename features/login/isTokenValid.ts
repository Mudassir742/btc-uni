import { decodeJwt, jwtVerify } from "jose";

export const isTokenExpired: (token: string, bufferTime?: number) => Promise<boolean> = async (
  token,
  bufferTime = 3600 // default buffer time is 1 hour (3600 seconds)
) => {
  try {
    const payload = await decodeJwt(token);
    if (!payload.exp) {
      return false;
    }

    const expiresAt = new Date((payload.exp as number) * 1000);
    const now = new Date();

    // Check if the current time is within the buffer time of expiration
    return (expiresAt.getTime() - now.getTime()) <= bufferTime * 1000;
  } catch (err) {
    console.log("Token is expired or invalid: ", err);
    return true;
  }
};

export const isTokenValid: (token: string) => Promise<boolean> = async (
  token
) => {
  try {
    const payload = await decodeJwt(token);

    if (!payload.sub) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log("Invalid jwt ", err);
    return false; // Return false if the token is invalid
  }
};
