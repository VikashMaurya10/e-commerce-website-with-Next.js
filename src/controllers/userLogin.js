import errorHandler from "@/helpers/errorHandler";
import responseHandler from "@/helpers/responseHandler";
import { isValidEmail, isValidPassword } from "@/helpers/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../config/db";
import userModel from "../models/userModel";

connectDB();

const userLogin = async (req) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    connectDB();

    if (!email.trim()) {
      return errorHandler("Email is required!");
    }
    if (!isValidEmail(email)) {
      return errorHandler("Please enter valid email");
    }
    if (!password.trim()) {
      return errorHandler("Password is requird");
    }
    if (!isValidPassword(password)) {
      return errorHandler(
        "Please enter At least one lowercase letter At least one uppercase letter At least one digit At least one special character from the set [@$!%*?&] A minimum length of 8 characters"
      );
    }
    const isExistUser = await userModel.findOne({ email: email });

    if (!isExistUser) {
      return errorHandler("user not found please register");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      isExistUser?.password
    );
    if (!isCorrectPassword) {
      return errorHandler("Invalid password");
    }
    const payload = {
      _id: isExistUser._id,
      role:isExistUser.role
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const user = {
      _id: isExistUser._id,
      name: isExistUser.name,
      email: isExistUser.email,
      phone: isExistUser.phone,
      address: isExistUser.address,
      role: isExistUser.role,
    };

    const response = responseHandler("login Successful", { user });

    response.cookies.set("token", token, {
      httpOnly: true, //this is make cookie only server side accessiable
      secure: true,
      expiresIn: "7d",
    });
    return response;

    // return responseHandler("login Successful", { user, token });
  } catch (error) {
    console.log(error);
    return errorHandler("Error in user login", error);
  }
};

export default userLogin;
