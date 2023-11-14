import mongoose from "mongoose";
import categoryModel from "./categoryModel";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      require: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shopping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
