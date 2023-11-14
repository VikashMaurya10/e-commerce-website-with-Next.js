const { getProductImagesById } = require("@/controllers/productControllers");

const GET = async (req, { params }) => {
  return getProductImagesById(req, params);
};
export { GET };
