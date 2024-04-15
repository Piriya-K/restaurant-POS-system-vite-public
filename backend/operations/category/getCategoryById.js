import { Category } from "../../models/categoryModel.js";

const getCategoryById = async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({ message: `Category is not found.` });
    }

    return response.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default getCategoryById;
