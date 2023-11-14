import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import responseHandler from "@/helpers/responseHandler";
import productModel from "@/models/produceModel";
import { NextResponse } from "next/server";
import slugify from "slugify";

const createProduct = async (req) => {
  connectDB();
  try {
    const data = await req.formData();

    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const category = data.get("category");
    const quantity = data.get("quantity");
    const img = data.get("photo");

    if (!name || !name.trim()) {
      return errorHandler("Product name is requird");
    }

    if (!description || !description.trim()) {
      return errorHandler("Product description is requird");
    }

    if (!price || !price.trim()) {
      return errorHandler("Product price is requird");
    }
    if (!category || !category.trim()) {
      return errorHandler("Product category is requird");
    }
    if (!quantity || !quantity.trim()) {
      return errorHandler("Product quantity is requird");
    }

    if (!img) {
      return errorHandler("Product image is requird");
    }

    // const productData = {
    //   name,
    //   description,
    //   price,
    //   category,
    //   img,
    // };

    // console.log(productData);
    const bytData = await img.arrayBuffer();
    const buffer = Buffer.from(bytData);

    await new productModel({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      photo: {
        data: buffer,
        contentType: img.type,
      },
    }).save();

    return responseHandler("Product created successfully");
  } catch (error) {
    console.log(error);
    return errorHandler("Error in create product", error.message);
  }
};

const getAllProducts = async (req) => {
  connectDB();

  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    return responseHandler("All products", {
      totalCount: products.length,
      products,
    });
  } catch (error) {
    return errorHandler("Error in get all product", error.message);
  }
};

const getProductBySlugName = async (req, params) => {
  connectDB();
  try {
    const { slug } = await params;
    const product = await productModel
      .findOne({ slug: slug })
      .populate("category")
      .select("-photo");

    if (!product) {
      return errorHandler("Invalid product slug name");
    }
    return responseHandler("Desired Product", {
      product,
    });
  } catch (error) {
    // console.log(error);
    return errorHandler("Error in get product", error.message);
  }
};

const getProductImagesById = async (req, params) => {
  connectDB();
  try {
    const { id } = await params;

    const image = await productModel
      .findOne({
        _id: id,
      })
      .select("photo");

    if (!image) {
      return errorHandler("Invalid product id");
    }

    // return new NextResponse(image.photo.data, {
    //   headers: { "content-type": "image/png" },
    // });

    const response = new NextResponse(image?.photo?.data);
    response.headers.set("Content-Type", image?.photo?.contentType);
    return response;
  } catch (error) {
    return errorHandler("Error in get images of product", error.message);
  }
};

const deleteProductById = async (req, params) => {
  connectDB();
  try {
    const { slug } = await params;

    const isDeleted = await productModel
      .findByIdAndDelete(slug)
      .select("-photo");

    if (!isDeleted) {
      return errorHandler("Invalid product id");
    }

    return responseHandler("Product deleted successfully");
  } catch (error) {
    return errorHandler("Error in delete product", error.message);
  }
};

const updateProductById = async (req, params) => {
  connectDB();
  try {
    const { slug } = await params;
    const data = await req.formData();

    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const category = data.get("category");
    const quantity = data.get("quantity");
    const img = data.get("photo");

    if (!name || !name.trim()) {
      return errorHandler("Product name is requird");
    }
    if (!description || !description.trim()) {
      return errorHandler("Product description is requird");
    }
    if (!price || !price.trim()) {
      return errorHandler("Product price is requird");
    }
    if (!category || !category.trim()) {
      return errorHandler("Product category is requird");
    }
    if (!quantity || !quantity.trim()) {
      return errorHandler("Product quantity is requird");
    }
    if (!img) {
      return errorHandler("Product image is requird");
    }

    const bytData = await img.arrayBuffer();
    const buffer = Buffer.from(bytData);

    const isUpdated = await productModel.findByIdAndUpdate(
      slug,
      {
        name,
        slug: slugify(name),
        description,
        price,
        category,
        quantity,
        photo: {
          data: buffer,
          contentType: img.type,
        },
      },
      { new: true }
    );

    if (!isUpdated) {
      return errorHandler("Invalid product id");
    }

    return responseHandler("Product updated successfully", { slug });
  } catch (err) {
    return errorHandler("Error occur in Update Product", err.message);
  }
};

export {
  createProduct,
  getAllProducts,
  getProductBySlugName,
  getProductImagesById,
  deleteProductById,
  updateProductById,
};
