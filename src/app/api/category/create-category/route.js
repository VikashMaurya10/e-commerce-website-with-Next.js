import { createCategory } from "@/controllers/categoryControllers";

const POST = (req) => {
  return createCategory(req);
};

export { POST };
