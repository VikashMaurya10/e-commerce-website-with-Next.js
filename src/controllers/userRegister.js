import errorHandler from "@/helpers/errorHandler";
import responseHandler from "@/helpers/responseHandler";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNo,
} from "@/helpers/validation";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import connectDB from "@/config/db";

connectDB();

const userRegister = async (req) => {
  try {
    const reqBody = await req.json();
    const { name, email, password, phone, address } = reqBody;
    // console.log(reqBody);

    if (!name.trim()) {
      return errorHandler("Name is required!");
    }
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
    if (!phone.trim()) {
      return errorHandler("Phone number is required");
    }

    if (!isValidPhoneNo(phone)) {
      return errorHandler("Please enter valid phone number");
    }

    const isExistUser = await userModel.findOne({ email: email });

    if (isExistUser) {
      return errorHandler("User is already registered please login");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const isSavedNewUser = await newUser.save();

    if (!isSavedNewUser) {
      return errorHandler("User not saved try after some time");
    }

    return responseHandler("Now user is registered", reqBody);
  } catch (error) {
    console.log(error);
    return errorHandler("Error in user registration", error);
  }
};

export default userRegister;
