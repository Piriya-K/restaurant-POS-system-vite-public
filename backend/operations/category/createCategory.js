import { Category } from "../../models/categoryModel.js";
import verifyToken from "../middleware/verifytoken.js";

const createCategory = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      // Check if the required field "categoryName" is provided in the request body
      if (!request.body.categoryName) {
        return response
          .status(400)
          .send({ message: `All fields are required` });
      }

      // Create a new category object with the provided categoryName
      const newCategory = { categoryName: request.body.categoryName };

      // Use the category model's create method, from Mongoose, to save one new 'Category' document to the collection
      const createdCategory = await Category.create(newCategory);

      // Send a success response with the created category
      return response.status(200).json(createdCategory);
    });
  } catch (error) {
    // If an error occurs during the process, log it and send a 500 Internal Server Error response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default createCategory;
