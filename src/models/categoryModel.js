import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});
// const categoryModel = mongoose.model("categories", categorySchema);
const categoryModel =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default categoryModel;
