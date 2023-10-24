import userLogin from "../../../../controllers/userLogin";

const POST = async (req) => {
  return userLogin(req);
};

export { POST };
