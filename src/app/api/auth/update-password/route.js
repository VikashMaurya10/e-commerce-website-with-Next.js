import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import responseHandler from "@/helpers/responseHandler";
import { isValidPassword } from "@/helpers/validation";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

connectDB();

const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const { token, password } = reqBody;
    console.log(reqBody);
    if (!password.trim()) {
      return errorHandler("Password required");
    }

    if (!isValidPassword(password)) {
      return errorHandler(
        "Please enter At least one lowercase letter At least one uppercase letter At least one digit At least one special character from the set [@$!%*?&] A minimum length of 8 characters"
      );
    }

    const user = await userModel.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return errorHandler("Invalid Token");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpire = undefined;
    await user.save();

    return responseHandler("Password changed successfully");
  } catch (error) {
    return errorHandler("Error in update password", error);
  }
};

export { POST };
