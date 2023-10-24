import connectDB from "@/config/db";
import forgotPassword from "@/controllers/forgotPassword";

const POST = (req) => {
  return forgotPassword(req);
};

export { POST };
