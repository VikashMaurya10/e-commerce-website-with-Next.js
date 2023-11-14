import {
  deleteProductById,
  getProductBySlugName,
  updateProductById,
} from "@/controllers/productControllers";

const GET = async (req, { params }) => {
  return getProductBySlugName(req, params);
};

const DELETE = async (req, { params }) => {
  return deleteProductById(req, params);
};

const PUT = async (req, { params }) => {
  return updateProductById(req, params);
};

export { GET, DELETE, PUT };
