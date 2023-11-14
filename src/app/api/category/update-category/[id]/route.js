import { updateCategoryById } from "@/controllers/categoryControllers";

const PUT = async (req, { params }) => {
  return updateCategoryById(req, params);
};

export { PUT };
