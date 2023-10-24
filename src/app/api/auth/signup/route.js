import userRegister from "../../../../controllers/userRegister";

const POST = async (req) => {
  return userRegister(req);
};

export { POST };
