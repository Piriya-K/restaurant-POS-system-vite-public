import { Category } from "../../models/categoryModel.js";
import verifyToken from "../middleware/verifytoken.js";

const updateCategory = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      if (!request.body.categoryName) {
        return response
          .status(400)
          .send({ message: `All fields are required` });
      }

      const { id } = request.params;

      const category = await Category.findByIdAndUpdate(id, request.body);

      if (!category) {
        return response.status(404).json({ message: `Category is not found.` });
      }

      return response
        .status(200)
        .json({ message: `Category updated.`, category: category });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default updateCategory;
