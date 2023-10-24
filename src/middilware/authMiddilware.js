import userModel from "@/models/userModel";
import jwt from "jsonwebtoken";

const isAuthorized = async (req) => {
  try {
    const headersInstance = await req.headers;
    const token = await headersInstance.get("token");

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

const isAdmin = async (req) => {
  try {
    const headersInstance = await req.headers;
    const token = await headersInstance.get("token");

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decode._id);
    if (user.role !== 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export { isAuthorized, isAdmin };
