import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import mailer from "@/helpers/mailer";
import responseHandler from "@/helpers/responseHandler";
import { isValidEmail } from "@/helpers/validation";
import userModel from "@/models/userModel";

connectDB();

const forgotPassword = async (req) => {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    if (!email.trim()) {
      return errorHandler("Email is required!");
    }
    if (!isValidEmail(email)) {
      return errorHandler("Please enter valid email");
    }

    const isExistUser = await userModel.findOne({ email: email });
    if (!isExistUser) {
      return errorHandler("User not found");
    }

    const isMailSend = await mailer({
      email,
      emailType: "forgotPassword",
      userId: isExistUser?._id?.toString(),
    });

    if (!isMailSend) {
      errorHandler("Email not send try after sometime", error);
    }

    return responseHandler("Please check you mail");
  } catch (error) {
    return errorHandler("Error in forgot password", error);
  }
};

export default forgotPassword;
