import {
  createProduct,
  getAllProducts,
} from "@/controllers/productControllers";

// create product
const POST = async (req) => {
  return createProduct(req);
};

// get all product and get product by slug name
const GET = async (req) => {
  return getAllProducts(req);
};

export { GET, POST };
