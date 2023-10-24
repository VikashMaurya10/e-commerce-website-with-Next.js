import { jwtVerify, SignJWT } from "jose";

export const verifyAuth = async (token) => {
  try {
    const isVeryfied = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return isVeryfied.payload;
  } catch (error) {}
};
