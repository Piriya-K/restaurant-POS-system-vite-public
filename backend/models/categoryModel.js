import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  }
  // { collection: "categories" }
);

export const Category = mongoose.model("Category", categorySchema);
