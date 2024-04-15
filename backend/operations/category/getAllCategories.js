import { Category } from "../../models/categoryModel.js";

const getAllCategories = async (request, response) => {
  try {
    const categories = await Category.find({}); // pass an empty object {} in .find() to get a list of all categories from the database and assign the list to the categories variable
    return response.status(200).json({
      //return a successful response and send the an object with the count of all categories and an array of all category objects back to the client using the .json middleware
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default getAllCategories;
