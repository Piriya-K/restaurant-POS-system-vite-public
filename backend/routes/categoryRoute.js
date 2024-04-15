import express from "express";
import createCategory from "../operations/category/createCategory.js";
import getAllCategories from "../operations/category/getAllCategories.js";
import getCategoryById from "../operations/category/getCategoryById.js";
import updateCategory from "../operations/category/updateCategory.js";
import deleteCategoryById from "../operations/category/deleteCategoryById.js";

const router = express.Router();

//Route to save a category
router.post("/", createCategory);

//Route to get all categories
router.get("/", getAllCategories);

//Route to get a single category by category id
router.get("/:id", getCategoryById);

//Route to update a category
router.put("/:id", updateCategory);

//Route to delete a category by id
router.delete("/:id", deleteCategoryById);

export default router;

// // Route to save a category
// app.post("/categories", createCategory);

// // Route to get all categories
// app.get("/categories", getAllCategories);

// //Route to get a single category by category id
// app.get("/categories/:id", getCategoryById);

// //Route to update a category
// app.put("/categories/:id", updateCategory);

// //Route to delete a category by id
// app.delete("/categories/:id", deleteCategoryById);
