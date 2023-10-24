import errorHandler from "@/helpers/errorHandler";
import responseHandler from "@/helpers/responseHandler";

export async function GET() {
  try {
    const response = responseHandler("logout successfully");
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return errorHandler("Error on Logout route");
  }
}
