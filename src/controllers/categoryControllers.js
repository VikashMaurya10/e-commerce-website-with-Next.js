import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import responseHandler from "@/helpers/responseHandler";
import categoryModel from "@/models/categoryModel";
import slugify from "slugify";

const createCategory = async (req) => {
  connectDB();

  try {
    const reqbody = await req.json();
    const { name } = reqbody;

    if (!name.trim()) {
      return errorHandler("Category name is required");
    }

    const isCategoryExist = await categoryModel.findOne({ name: name });
    if (isCategoryExist) {
      return errorHandler("Category name is already exist");
    }

    const create_category = await new categoryModel({
      name: name,
      slug: slugify(name),
    }).save();

    if (!create_category) {
      return errorHandler("Cartegory not saved");
    }

    return responseHandler("category created successfully");
  } catch (err) {
    errorHandler("Error in create category", err.message);
  }
};

const updateCategoryById = async (req, params) => {
  connectDB();
  try {
    const { id } = await params;
    const { name } = await req.json();

    if (!name.trim()) {
      return errorHandler("New category name is required");
    }

    const isCategoryExist = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true }
    );

    return responseHandler("Category updated successfully", {
      isCategoryExist,
    });
  } catch (error) {
    console.log(error);
    return errorHandler("Error in update category", error.message);
  }
};

const getCategroies = async () => {
  connectDB();
  try {
    const categories = await categoryModel.find();
    return responseHandler("List of all cataegory", { categories });
  } catch (error) {
    return errorHandler("Error in get category", error.message);
  }
};

const getCategoryBySlugName = async (req, params) => {
  connectDB();
  try {
    const { slug } = await params;

    const category = await categoryModel.findOne({ slug: slug });

    if (!category) {
      return errorHandler("Catagory not found");
    }

    return responseHandler("Get one cataegory successfully", { category });
  } catch (error) {
    return errorHandler("Error in get category by Id", error.message);
  }
};

const deleteCatgoryById = async (req, params) => {
  try {
    const { slug } = await params;

    await categoryModel.findByIdAndDelete(slug);

    return responseHandler("Category has been deleted");
  } catch (error) {
    return errorHandler("Error in delete category", error.message);
  }
};

export {
  createCategory,
  updateCategoryById,
  getCategroies,
  getCategoryBySlugName,
  deleteCatgoryById,
};
