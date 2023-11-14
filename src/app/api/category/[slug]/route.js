import {
  deleteCatgoryById,
  getCategoryBySlugName,
} from "@/controllers/categoryControllers";

const GET = async (req, { params }) => {
  return getCategoryBySlugName(req, params);
};

const DELETE = async (req, { params }) => {
  return deleteCatgoryById(req, params);
};

export { DELETE, GET };

